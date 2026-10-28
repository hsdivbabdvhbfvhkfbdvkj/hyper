const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const crypto = require('node:crypto');
const { ClientApi } = require('@keyauthjs/client');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) process.loadEnvFile(envPath);

const PORT = Number(process.env.PORT || 3000);
const MAX_BODY_BYTES = 16_384;
const MAX_ACTIVATIONS_PER_MINUTE = 10;
const activationAttempts = new Map();
const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const ADMIN_LOGIN_LIMIT = 5;
const ADMIN_LOGIN_WINDOW_MS = 15 * 60 * 1000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const ADMIN_SESSIONS = new Map();
const ADMIN_LOGIN_ATTEMPTS = new Map();
const SETTINGS_DEFAULTS = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'site-settings-defaults.json'),
  'utf8'
));
const SETTINGS_PATH = path.join(__dirname, 'site-settings.json');
const KEYAUTH_APP_NAME = process.env.KEYAUTH_APP_NAME;
const KEYAUTH_OWNER_ID = process.env.KEYAUTH_OWNER_ID;
const KEYAUTH_APP_VERSION = process.env.KEYAUTH_APP_VERSION;

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(data));
}

function sendHtml(response) {
  const source = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  const openingMarker = 'const html = String.raw`';
  const contentStart = source.indexOf(openingMarker);
  const contentEnd = source.lastIndexOf('`;');

  if (contentStart === -1 || contentEnd <= contentStart) {
    throw new Error('No se pudo extraer el documento HTML desde index.js');
  }

  const html = source.slice(contentStart + openingMarker.length, contentEnd);
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
  });
  response.end(html);
}

function getSettings() {
  if (!fs.existsSync(SETTINGS_PATH)) return SETTINGS_DEFAULTS;
  const parsed = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
  return validateSettings(parsed);
}

function validateSettings(settings) {
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) {
    throw new Error('El archivo de personalización no contiene un objeto válido.');
  }

  const validated = {};
  for (const key of Object.keys(SETTINGS_DEFAULTS)) {
    const value = settings[key];
    if (typeof value !== 'string' || value.length > 300) {
      throw new Error(`El valor de personalización "${key}" no es válido.`);
    }
    if (key === 'accent' || key === 'accentSoft' || key === 'background') {
      if (!/^#[0-9a-f]{6}$/i.test(value)) {
        throw new Error(`El color "${key}" no es válido.`);
      }
    }
    validated[key] = value;
  }
  return validated;
}

function isAdminSession(request) {
  const cookie = request.headers.cookie || '';
  const match = cookie.match(/(?:^|;\s*)admin_session=([A-Za-z0-9_-]+)/);
  if (!match) return false;
  const expiry = ADMIN_SESSIONS.get(match[1]);
  if (!expiry || expiry <= Date.now()) {
    ADMIN_SESSIONS.delete(match[1]);
    return false;
  }
  return true;
}

function adminSessionCookie(request, token, maxAge) {
  const secure = request.socket.encrypted || request.headers['x-forwarded-proto'] === 'https'
    ? '; Secure'
    : '';
  return `admin_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`;
}

function adminLoginIsLimited(address) {
  const now = Date.now();
  const current = ADMIN_LOGIN_ATTEMPTS.get(address);
  if (!current || now - current.startedAt >= ADMIN_LOGIN_WINDOW_MS) {
    ADMIN_LOGIN_ATTEMPTS.set(address, { startedAt: now, count: 1 });
    return false;
  }
  current.count += 1;
  return current.count > ADMIN_LOGIN_LIMIT;
}

function securePasswordEquals(candidate) {
  const expectedHash = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  const candidateHash = crypto.createHash('sha256').update(candidate).digest();
  return crypto.timingSafeEqual(expectedHash, candidateHash);
}

function checkSameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  try {
    const parsedOrigin = new URL(origin);
    const requestProtocol = request.headers['x-forwarded-proto'] ||
      (request.socket.encrypted ? 'https' : 'http');
    return parsedOrigin.host === request.headers.host &&
      parsedOrigin.protocol === `${requestProtocol}:`;
  } catch {
    return false;
  }
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    let tooLarge = false;

    request.on('data', chunk => {
      if (tooLarge) return;
      body += chunk;
      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        tooLarge = true;
        reject(Object.assign(new Error('Request body too large'), { statusCode: 413 }));
      }
    });

    request.on('end', () => {
      if (tooLarge) return;
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(Object.assign(new Error('Invalid JSON body'), { statusCode: 400 }));
      }
    });

    request.on('error', reject);
  });
}

async function handleAdminLogin(request, response) {
  if (ADMIN_PASSWORD.length < 12) {
    sendJson(response, 503, {
      valid: false,
      message: 'La administración está desactivada. Configura ADMIN_PASSWORD con al menos 12 caracteres en .env y reinicia el servidor.'
    });
    return;
  }
  if (!checkSameOrigin(request)) {
    sendJson(response, 403, { valid: false, message: 'Solicitud de origen no permitido.' });
    return;
  }
  if (adminLoginIsLimited(request.socket.remoteAddress || 'unknown')) {
    sendJson(response, 429, { valid: false, message: 'Demasiados intentos. Espera 15 minutos.' });
    return;
  }

  let body;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    sendJson(response, error.statusCode || 400, {
      valid: false,
      message: error.statusCode === 413
        ? 'La solicitud excede el tamaño permitido.'
        : 'La solicitud no tiene un formato válido.'
    });
    return;
  }
  if (!body || typeof body.password !== 'string' || body.password.length > 256 ||
      !securePasswordEquals(body.password)) {
    sendJson(response, 401, { valid: false, message: 'Contraseña de administración incorrecta.' });
    return;
  }

  const now = Date.now();
  for (const [token, expiry] of ADMIN_SESSIONS) {
    if (expiry <= now) ADMIN_SESSIONS.delete(token);
  }
  const token = crypto.randomBytes(32).toString('base64url');
  ADMIN_SESSIONS.set(token, now + ADMIN_SESSION_TTL_MS);
  response.setHeader('Set-Cookie', adminSessionCookie(request, token, ADMIN_SESSION_TTL_MS / 1000));
  sendJson(response, 200, { valid: true });
}

async function handleSaveSettings(request, response) {
  if (!checkSameOrigin(request)) {
    sendJson(response, 403, { saved: false, message: 'Solicitud de origen no permitido.' });
    return;
  }
  if (!isAdminSession(request)) {
    sendJson(response, 401, { saved: false, message: 'Inicia sesión como administrador para guardar cambios.' });
    return;
  }

  let body;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    sendJson(response, error.statusCode || 400, { saved: false, message: 'La solicitud no tiene un formato válido.' });
    return;
  }

  let settings;
  try {
    settings = validateSettings(body && body.settings);
  } catch (error) {
    sendJson(response, 400, { saved: false, message: error.message });
    return;
  }

  const temporaryPath = `${SETTINGS_PATH}.${crypto.randomBytes(6).toString('hex')}.tmp`;
  try {
    await fs.promises.writeFile(temporaryPath, `${JSON.stringify(settings, null, 2)}\n`, { flag: 'w' });
    await fs.promises.rename(temporaryPath, SETTINGS_PATH);
    sendJson(response, 200, { saved: true, settings });
  } catch (error) {
    console.error('Error guardando la personalización:', error.message);
    sendJson(response, 500, { saved: false, message: 'No se pudieron guardar los cambios en el servidor.' });
  }
}

function isRateLimited(address) {
  const now = Date.now();
  const previous = activationAttempts.get(address);
  const current = previous && now - previous.startedAt < 60_000
    ? previous
    : { startedAt: now, count: 0 };

  current.count += 1;
  activationAttempts.set(address, current);

  if (activationAttempts.size > 1000) {
    for (const [ip, entry] of activationAttempts) {
      if (now - entry.startedAt >= 60_000) activationAttempts.delete(ip);
    }
  }

  return current.count > MAX_ACTIVATIONS_PER_MINUTE;
}

function withTimeout(promise, timeoutMs) {
  let timeout;
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      timeout = setTimeout(() => reject(new Error('KeyAuth request timed out')), timeoutMs);
    })
  ]).finally(() => clearTimeout(timeout));
}

async function verifyLicense(license) {
  const client = new ClientApi({
    name: KEYAUTH_APP_NAME,
    ownerid: KEYAUTH_OWNER_ID,
    ver: KEYAUTH_APP_VERSION
  }, {
    logger: { active: false, level: 'error' }
  });

  return withTimeout((async () => {
    const initialized = await client.init();
    if (!initialized.success || !initialized.sessionid) {
      throw new Error('KeyAuth initialization failed');
    }

    const result = await client.license({
      license,
      sessionId: initialized.sessionid
    });
    return result.success === true;
  })(), 12_000);
}

async function handleActivation(request, response) {
  if (!KEYAUTH_APP_NAME || !KEYAUTH_OWNER_ID || !KEYAUTH_APP_VERSION) {
    sendJson(response, 503, {
      valid: false,
      message: 'Falta configurar la aplicación KeyAuth en el archivo .env del servidor.'
    });
    return;
  }

  if (!request.headers['content-type']?.startsWith('application/json')) {
    sendJson(response, 415, { valid: false, message: 'Se esperaba una solicitud JSON.' });
    return;
  }

  if (isRateLimited(request.socket.remoteAddress || 'unknown')) {
    sendJson(response, 429, { valid: false, message: 'Demasiados intentos. Espera un minuto.' });
    return;
  }

  let body;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    sendJson(response, error.statusCode || 400, {
      valid: false,
      message: error.statusCode === 413
        ? 'La solicitud excede el tamaño permitido.'
        : 'La solicitud no tiene un formato válido.'
    });
    return;
  }

  if (!body || typeof body.license !== 'string' ||
      body.license.trim().length === 0 || body.license.length > 256) {
    sendJson(response, 400, { valid: false, message: 'Introduce una licencia válida.' });
    return;
  }

  try {
    const valid = await verifyLicense(body.license.trim());
    if (!valid) {
      sendJson(response, 401, { valid: false, message: 'KeyAuth rechazó la licencia.' });
      return;
    }

    sendJson(response, 200, { valid: true });
  } catch (error) {
    console.error('Error verificando con KeyAuth:', error.message);
    if (/Force HWID is enabled/i.test(error.message)) {
      sendJson(response, 503, {
        valid: false,
        message: 'KeyAuth tiene Force HWID activado. Para usar licencias web, desactiva Force HWID en la configuración de tu aplicación KeyAuth.'
      });
      return;
    }

    sendJson(response, 502, {
      valid: false,
      message: 'No se pudo verificar con KeyAuth. Revisa la configuración y vuelve a intentar.'
    });
  }
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, 'http://localhost');

  if (request.method === 'GET' && requestUrl.pathname === '/') {
    try {
      sendHtml(response);
    } catch (error) {
      console.error('Error sirviendo la página:', error.message);
      sendJson(response, 500, { message: 'No se pudo cargar la interfaz.' });
    }
    return;
  }

  const staticFiles = {
    '/manifest.webmanifest': ['manifest.webmanifest', 'application/manifest+json; charset=utf-8'],
    '/service-worker.js': ['service-worker.js', 'text/javascript; charset=utf-8'],
    '/icon.svg': ['icon.svg', 'image/svg+xml'],
    '/icon-192.png': ['icon-192.png', 'image/png'],
    '/icon-512.png': ['icon-512.png', 'image/png']
  };
  if (request.method === 'GET' && staticFiles[requestUrl.pathname]) {
    const [fileName, contentType] = staticFiles[requestUrl.pathname];
    try {
      const content = fs.readFileSync(path.join(__dirname, fileName));
      response.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': fileName === 'service-worker.js' ? 'no-cache' : 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      });
      response.end(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        sendJson(response, 404, { message: 'Recurso no encontrado.' });
      } else {
        console.error(`Error sirviendo ${fileName}:`, error.message);
        sendJson(response, 500, { message: 'No se pudo cargar el recurso.' });
      }
    }
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/.well-known/assetlinks.json') {
    const assetLinksPath = path.join(__dirname, '.well-known', 'assetlinks.json');
    try {
      const content = fs.readFileSync(assetLinksPath);
      response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      });
      response.end(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        sendJson(response, 404, { message: 'La asociación Android aún no está configurada.' });
      } else {
        console.error('Error sirviendo assetlinks.json:', error.message);
        sendJson(response, 500, { message: 'No se pudo cargar la asociación Android.' });
      }
    }
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/health') {
    sendJson(response, 200, {
      configured: Boolean(KEYAUTH_APP_NAME && KEYAUTH_OWNER_ID && KEYAUTH_APP_VERSION),
      adminConfigured: ADMIN_PASSWORD.length >= 12
    });
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/site-settings') {
    try {
      sendJson(response, 200, { settings: getSettings(), defaults: SETTINGS_DEFAULTS });
    } catch (error) {
      console.error('Error cargando la personalización:', error.message);
      sendJson(response, 500, { message: 'No se pudo cargar la personalización guardada.' });
    }
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/admin/session') {
    sendJson(response, 200, {
      authenticated: isAdminSession(request),
      configured: ADMIN_PASSWORD.length >= 12
    });
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === '/api/admin/login') {
    handleAdminLogin(request, response).catch(error => {
      console.error('Error iniciando sesión de administración:', error.message);
      if (!response.headersSent) sendJson(response, 500, { valid: false, message: 'Error interno del servidor.' });
    });
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === '/api/admin/settings') {
    handleSaveSettings(request, response).catch(error => {
      console.error('Error guardando la personalización:', error.message);
      if (!response.headersSent) sendJson(response, 500, { saved: false, message: 'Error interno del servidor.' });
    });
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === '/api/admin/logout') {
    if (!checkSameOrigin(request)) {
      sendJson(response, 403, { message: 'Solicitud de origen no permitido.' });
      return;
    }
    const cookie = request.headers.cookie || '';
    const match = cookie.match(/(?:^|;\s*)admin_session=([A-Za-z0-9_-]+)/);
    if (match) ADMIN_SESSIONS.delete(match[1]);
    response.setHeader('Set-Cookie', adminSessionCookie(request, '', 0));
    sendJson(response, 200, { authenticated: false });
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === '/api/activate') {
    handleActivation(request, response).catch(error => {
      console.error('Error procesando activación:', error.message);
      if (!response.headersSent) {
        sendJson(response, 500, { valid: false, message: 'Error interno del servidor.' });
      }
    });
    return;
  }

  sendJson(response, 404, { message: 'Ruta no encontrada.' });
});

server.listen(PORT, () => {
  console.log(`Panel iniciado en http://localhost:${PORT}`);
  if (!KEYAUTH_APP_NAME || !KEYAUTH_OWNER_ID || !KEYAUTH_APP_VERSION) {
    console.warn('Completa KEYAUTH_APP_NAME, KEYAUTH_OWNER_ID y KEYAUTH_APP_VERSION en .env.');
  }
});
