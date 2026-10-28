# Conectar KeyAuth

La página se sirve desde Node.js. La licencia se envía al endpoint local y el servidor la valida con KeyAuth API 1.2; las credenciales de la aplicación no se envían al navegador.

## Configuración

1. Instala Node.js 20.12 o posterior.
2. En el panel de KeyAuth, crea o abre tu aplicación y copia su **Application Name**, **Owner ID** y **Version**.
3. En la carpeta del proyecto, copia `.env.example` como `.env` y completa:

   ```env
   KEYAUTH_APP_NAME=nombre_de_tu_aplicacion
   KEYAUTH_OWNER_ID=tu_owner_id
   KEYAUTH_APP_VERSION=1.0
   PORT=3000
   ADMIN_PASSWORD=una_contrasena_larga_y_privada
   ```

   En PowerShell puedes crear el archivo con `Copy-Item .env.example .env` y luego editarlo en VS Code.
   Define `ADMIN_PASSWORD` con una contraseña propia de al menos 12 caracteres. No la compartas ni la pongas en archivos públicos. `.env` está excluido de Git.

4. En PowerShell, desde la carpeta del proyecto, ejecuta:

   ```powershell
   npm install
   npm start
   ```

5. Abre `http://localhost:3000` (no abras `index.js` directamente como `file://`). La clave de licencia se valida con KeyAuth al pulsar «Activar licencia».

Puedes comprobar el estado de configuración en `http://localhost:3000/api/health`. Si devuelve `"configured": false`, revisa los tres valores del `.env` y reinicia el servidor.

## Administración privada

- Configura `ADMIN_PASSWORD` en `.env` con al menos 12 caracteres y reinicia Node. Si no está configurada, las funciones de administración permanecen desactivadas.
- En la página, pulsa **Administración privada** e inicia sesión con esa contraseña. La sesión usa una cookie `HttpOnly`, `SameSite=Strict`, expira en ocho horas y se invalida al cerrar sesión o reiniciar el servidor.
- El editor modifica los textos visibles y los colores de la página. Los cambios se guardan en `site-settings.json` y se aplican a todos los visitantes; no permite editar ni ejecutar HTML o JavaScript desde el navegador.
- La contraseña nunca se guarda en el navegador. No la escribas en el chat ni la uses como clave de licencia.

Si al validar una licencia aparece **Force HWID**, abre la configuración de esa aplicación en KeyAuth y desactiva **Force HWID** para el flujo web. Esta integración no recopila ni falsifica el identificador de hardware de los visitantes.

## Notas

- Usa licencias creadas para esa aplicación en KeyAuth.
- El servidor mantiene las sesiones de administración en memoria; al reiniciar, tendrás que iniciar sesión otra vez.
- Para publicar la aplicación, despliega el servidor en un proveedor Node.js y usa HTTPS. No compartas `.env` ni claves de licencia públicamente.
- El cliente de KeyAuth para Node usa API 1.2: [@keyauthjs/client](https://www.npmjs.com/package/@keyauthjs/client). La documentación de referencia se enlaza desde el [ejemplo JavaScript de KeyAuth](https://github.com/mazkdevf/KeyAuth-JS-Example/tree/main/src/API1.2).
