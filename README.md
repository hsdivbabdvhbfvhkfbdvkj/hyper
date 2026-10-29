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
- El editor modifica los textos visibles y los colores de la página, permite crear y gestionar hasta ocho tarjetas informativas y seis botones personalizados, y editar el título, descripción y etiqueta de la función de IPA. Los botones personalizados solo pueden alternar esa función de la página o abrir el juego seleccionado. Los cambios se guardan en `site-settings.json` y se aplican a todos los visitantes; no permite editar ni ejecutar HTML o JavaScript desde el navegador.
- La contraseña nunca se guarda en el navegador. No la escribas en el chat ni la uses como clave de licencia.

## Preparar el sitio para Android

El sitio incluye un manifiesto, iconos y un service worker para que un empaquetador de PWA pueda convertir la URL HTTPS en una aplicación Android. Tras validar una licencia, el botón **Abrir Free Fire** intenta iniciar la versión Normal o MAX elegida en Android; si el juego no está instalado, ofrece la ficha de Google Play. No modifica el juego ni automatiza la mira.

1. Sube a GitHub los archivos actualizados `index.js`, `server.js`, `site-settings-defaults.json`, `README.md`, `manifest.webmanifest`, `service-worker.js`, `icon.svg`, `icon-192.png` e `icon-512.png`.
2. Espera a que Render termine el nuevo despliegue. Comprueba que `https://tu-sitio.onrender.com/manifest.webmanifest` y los dos iconos carguen.
3. Abre [PWABuilder](https://www.pwabuilder.com/), introduce la URL pública HTTPS y elige **Package for stores → Android** para generar el paquete.
4. Guarda la clave de firma que genere la herramienta en un lugar privado; es necesaria para futuras actualizaciones. No la publiques ni la envíes por chat.
5. Si el empaquetador requiere Digital Asset Links para abrir a pantalla completa, añade el `assetlinks.json` generado por la herramienta en `.well-known/assetlinks.json`, súbelo a GitHub y espera el siguiente despliegue. El servidor ya sirve ese archivo desde esa ruta.
6. Instala y prueba el APK en un dispositivo Android. Para publicar en Google Play, normalmente se entrega el paquete AAB y se siguen sus requisitos de firma y publicación.

La función IPA se puede activar o desactivar desde la página y no controla Free Fire. Tras validar una licencia, el botón **Abrir Free Fire** abre la ficha de App Store de la edición elegida (Normal o MAX) en iPhone/iPad. En Android intenta iniciar el paquete oficial y, si no está instalado, abrir su ficha de Google Play. La App Store puede mostrar que una edición no está disponible en la región de la cuenta.

Si al validar una licencia aparece **Force HWID**, abre la configuración de esa aplicación en KeyAuth y desactiva **Force HWID** para el flujo web. Esta integración no recopila ni falsifica el identificador de hardware de los visitantes.

## Notas

- Usa licencias creadas para esa aplicación en KeyAuth.
- El servidor mantiene las sesiones de administración en memoria; al reiniciar, tendrás que iniciar sesión otra vez.
- Para publicar la aplicación, despliega el servidor en un proveedor Node.js y usa HTTPS. No compartas `.env` ni claves de licencia públicamente.
- El cliente de KeyAuth para Node usa API 1.2: [@keyauthjs/client](https://www.npmjs.com/package/@keyauthjs/client). La documentación de referencia se enlaza desde el [ejemplo JavaScript de KeyAuth](https://github.com/mazkdevf/KeyAuth-JS-Example/tree/main/src/API1.2).
