const html = String.raw`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>Hyper$ex | KeyAuth</title>
<meta name="theme-color" content="#ff32d2">
<meta name="description" content="Panel web Hyper$ex">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<style>
:root {
  --pink: #ff32d2;
  --pink2: #ff80e8;
  --bg: #050308;
  --panel: rgba(16, 8, 20, .94);
  --muted: #aaa0bd;
}
* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  padding: 22px 15px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  background:
    radial-gradient(ellipse at 50% 8%, #511044 0%, transparent 38%),
    radial-gradient(ellipse at 0% 70%, #300c30 0%, transparent 35%),
    var(--bg);
}

.app {
  width: 100%;
  max-width: 470px;
  margin: auto;
}

.app.dashboard-active { max-width: 1160px; }
.app.dashboard-active .brand { display: none; }
.app.dashboard-active .topbar {
  margin-bottom: 18px;
  padding: 14px 18px;
  border: 1px solid #39203f;
  border-radius: 15px;
  background: #0c0911;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.badge {
  border: 1px solid #7e286f;
  background: #120a18;
  padding: 10px 12px;
  border-radius: 12px;
  color: var(--pink2);
  font-size: 11px;
  letter-spacing: 1px;
}

.brand {
  text-align: center;
  padding: 24px 0 32px;
}

.crown {
  color: var(--pink);
  font-size: 50px;
  filter: drop-shadow(0 0 15px var(--pink));
}

.logo {
  font-size: clamp(39px, 10vw, 62px);
  font-weight: 1000;
  font-style: italic;
  letter-spacing: -3px;
  line-height: 1.1;
  color: #ff70e3;
  text-shadow:
    0 0 5px white,
    0 0 14px #ff32d2,
    0 0 35px #f000c8;
}

.subtitle {
  margin-top: 16px;
  color: #e5a7e0;
  font-size: 10px;
  letter-spacing: 5px;
}

.powered {
  margin-top: 10px;
  color: #8e829d;
  font-size: 10px;
  letter-spacing: 3px;
}

.card {
  background: linear-gradient(145deg, #160c1b, #08060d 65%);
  border: 1px solid #8b247a;
  border-radius: 22px;
  padding: 21px 17px;
  box-shadow: 0 0 25px #ff32d21c, inset 0 0 20px #ff32d20a;
}

.welcome {
  display: flex;
  gap: 13px;
  align-items: center;
  margin-bottom: 25px;
}

.iconbox {
  width: 59px;
  height: 59px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 16px;
  border: 1px solid #a32b91;
  background: #270d2b;
  color: var(--pink);
  font-size: 27px;
  box-shadow: inset 0 0 15px #ff32d220;
}

h2 {
  margin: 0 0 7px;
  color: var(--pink2);
  font-size: 19px;
}

p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}

.online {
  margin-left: auto;
  color: #00f0a0;
  font-size: 10px;
  white-space: nowrap;
}

label {
  display: block;
  color: var(--pink2);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0 0 11px;
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--pink);
  border-radius: 14px;
  padding: 0 13px;
  background: #08060e;
  box-shadow: 0 0 13px #ff32d21c;
}

.input-wrap:focus-within {
  box-shadow: 0 0 20px #ff32d252;
}

.key-icon { color: var(--pink); font-size: 22px; }

input {
  width: 100%;
  min-width: 0;
  padding: 17px 0;
  background: transparent;
  border: 0;
  outline: 0;
  color: white;
  font-size: 13px;
}

input::placeholder { color: #66566f; }

.edition-picker {
  margin: 20px 0 0;
  padding: 14px;
  border: 1px solid #39203f;
  border-radius: 14px;
  background: #09070e;
}

.edition-picker legend {
  padding: 0 5px;
  color: var(--pink2);
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

.edition-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.edition-option {
  position: relative;
  display: flex;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 12px 8px;
  border: 1px solid #39203f;
  border-radius: 10px;
  color: #c9bdcf;
  background: #100b15;
  font-size: 12px;
  letter-spacing: .3px;
  cursor: pointer;
}

.edition-option:has(input:checked) {
  border-color: var(--pink);
  color: white;
  background: #271029;
  box-shadow: 0 0 14px #ff32d226;
}

.edition-option input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  opacity: 0;
}

.edition-option:focus-within {
  outline: 2px solid var(--pink2);
  outline-offset: 2px;
}

.edition-help,
.selected-edition {
  margin-top: 9px;
  color: #9c90ad;
  font-size: 11px;
  line-height: 1.45;
}

.selected-edition strong { color: var(--pink2); }

.eye {
  padding: 8px 0 8px 8px;
  color: var(--pink2);
  background: transparent;
  border: 0;
  font-size: 18px;
}

.activate {
  width: 100%;
  margin-top: 19px;
  padding: 17px 12px;
  border: 1px solid #ffb0ef;
  border-radius: 13px;
  color: #1b0617;
  background: linear-gradient(100deg, #ff45d8, #ff9be9, #f52acb);
  box-shadow: 0 0 23px #ff32d253;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: .2s;
}

.activate:active { transform: scale(.98); }

#message {
  display: none;
  margin-top: 15px;
  padding: 12px;
  border-radius: 10px;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  background: #160c1b;
}

.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-top: 22px;
  padding: 17px 3px;
  border: 1px solid #39203f;
  border-radius: 15px;
  background: #09070e;
}

.feature {
  text-align: center;
  padding: 4px 2px;
  border-right: 1px solid #38203d;
}

.feature:last-child { border: 0; }

.ficon {
  color: var(--pink);
  font-size: 23px;
  margin-bottom: 9px;
}

.feature strong {
  display: block;
  font-size: 10px;
  margin-bottom: 6px;
}

.feature span {
  display: block;
  color: #9c90ad;
  font-size: 9px;
  line-height: 1.4;
}

.status {
  margin-top: 17px;
  border: 1px solid #39203f;
  background: #09070e;
  padding: 16px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.status-title {
  color: #e7b2e2;
  font-size: 10px;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.status-text {
  color: #00f0a0;
  font-size: 12px;
}

.promo {
  margin-top: 17px;
  padding: 16px;
  border: 1px solid #54224f;
  border-radius: 15px;
  background: linear-gradient(120deg, #200b24, #09070e);
}

.promo strong {
  color: var(--pink2);
  font-size: 15px;
}

.promo p { margin-top: 7px; }

.dashboard[hidden],
.dashboard-panel[hidden] { display: none; }

.dashboard {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 18px;
  align-items: stretch;
}

.panel-sidebar {
  display: flex;
  min-height: 570px;
  flex-direction: column;
  padding: 22px 15px;
  border: 1px solid #39203f;
  border-radius: 18px;
  background: linear-gradient(180deg, #130d19, #09070e);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 4px 7px 24px;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 1px;
}

.sidebar-mark {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid #a32b91;
  border-radius: 11px;
  color: var(--pink);
  background: #270d2b;
  box-shadow: 0 0 15px #ff32d226;
}

.sidebar-label {
  padding: 9px 8px;
  color: #81768a;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 1.8px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 10px;
  border: 1px solid #54224f;
  border-radius: 10px;
  color: #fff;
  background: #241126;
  font-size: 12px;
  font-weight: bold;
}

.sidebar-item {
  width: 100%;
  margin-bottom: 8px;
  text-align: left;
  cursor: pointer;
}

.sidebar-item.active {
  border-color: var(--pink);
  background: #321530;
}

.sidebar-item span { color: var(--pink2); }

.sidebar-footer {
  margin-top: auto;
  padding: 14px 10px 4px;
  border-top: 1px solid #302536;
  color: #887a90;
  font-size: 10px;
  line-height: 1.6;
}

.sidebar-footer strong {
  color: #00f0a0;
  font-size: 9px;
  letter-spacing: 1px;
}

.panel-main { min-width: 0; }
.panel-view[hidden] { display: none; }

.panel-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
  padding: 8px 3px;
}

.panel-top h1 {
  margin: 7px 0 0;
  color: #fff;
  font-size: clamp(22px, 4vw, 32px);
}

.panel-live {
  flex-shrink: 0;
  padding: 10px 12px;
  border: 1px solid #176a52;
  border-radius: 999px;
  color: #00f0a0;
  background: #07140f;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 1px;
}

.eyebrow {
  color: var(--pink2);
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
}

.status-pill {
  flex-shrink: 0;
  padding: 10px 12px;
  border: 1px solid #176a52;
  border-radius: 999px;
  color: #00f0a0;
  background: #07140f;
  font-size: 10px;
  letter-spacing: 1px;
}

.control-card {
  position: relative;
  overflow: hidden;
  padding: clamp(22px, 4vw, 38px);
  text-align: center;
  background:
    radial-gradient(ellipse at 50% 0%, #57104477, transparent 55%),
    linear-gradient(145deg, #160c1b, #08060d 70%);
}

.control-card h1 {
  margin: 12px 0 8px;
  color: #fff;
  font-size: clamp(26px, 6vw, 40px);
}

.control-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  text-align: left;
}

.control-heading .eyebrow { margin-top: 3px; }
.control-heading .control-description { margin: 9px 0 0; }

.module-tag {
  flex-shrink: 0;
  padding: 8px 10px;
  border: 1px solid #54224f;
  border-radius: 9px;
  color: var(--pink2);
  background: #190e1c;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 1px;
}

.control-description {
  max-width: 470px;
  margin: 0 auto;
}

.control-stage {
  display: grid;
  min-height: 230px;
  margin: 28px 0 22px;
  place-items: center;
  border: 1px solid #39203f;
  border-radius: 18px;
  background:
    linear-gradient(#ffffff08 1px, transparent 1px),
    linear-gradient(90deg, #ffffff08 1px, transparent 1px),
    #09070e;
  background-size: 28px 28px;
}

.game-launch-card {
  display: grid;
  justify-items: center;
  gap: 12px;
  padding: 25px 16px;
  border: 1px solid #39203f;
  border-radius: 18px;
  background: #09070e;
  text-align: center;
}

.game-launch-mark {
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  border: 1px solid #a32b91;
  border-radius: 20px;
  color: var(--pink2);
  background: #270d2b;
  font-size: 28px;
  font-weight: 900;
  box-shadow: 0 0 20px #ff32d226;
}

.game-launch-title {
  color: #fff;
  font-size: 16px;
  font-weight: 900;
}

.game-launch-status {
  min-height: 18px;
  color: #aaa0bd;
  font-size: 12px;
  line-height: 1.5;
}

.game-launch-button {
  max-width: 360px;
}

.admin-card {
  padding: clamp(20px, 4vw, 32px);
  text-align: left;
}

.admin-card h2 { margin: 10px 0 7px; }

.admin-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 22px;
}

.admin-field {
  display: block;
  margin: 0;
  color: #d7c8dc;
  font-size: 10px;
  letter-spacing: 1px;
}

.admin-field input {
  display: block;
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border: 1px solid #39203f;
  border-radius: 10px;
  background: #09070e;
}

.admin-field input[type="color"] {
  height: 44px;
  padding: 5px;
}

.admin-section-title {
  grid-column: 1 / -1;
  margin: 15px 0 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #39203f;
  color: var(--pink2);
  font-size: 11px;
  letter-spacing: 1.5px;
}

.admin-field textarea {
  display: block;
  width: 100%;
  min-height: 74px;
  margin-top: 8px;
  padding: 12px;
  border: 1px solid #39203f;
  border-radius: 10px;
  background: #09070e;
  color: white;
  font: inherit;
  letter-spacing: normal;
  resize: vertical;
}

.admin-login-button,
.admin-cancel {
  padding: 11px 14px;
  border: 1px solid #54224f;
  border-radius: 10px;
  color: #fff;
  background: #241126;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
}

.admin-dialog {
  width: min(420px, calc(100% - 28px));
  padding: 25px;
  border: 1px solid #8b247a;
  border-radius: 18px;
  color: white;
  background: #100a15;
  box-shadow: 0 20px 70px #000b;
}

.admin-dialog::backdrop { background: #000b; }
.admin-dialog h2 { margin: 0 0 8px; }
.admin-dialog label { margin-top: 20px; }
.admin-dialog input {
  display: block;
  margin-top: 8px;
  padding: 12px;
  border: 1px solid #54224f;
  border-radius: 10px;
  background: #09070e;
}

.admin-dialog-actions {
  display: flex;
  gap: 10px;
  margin-top: 17px;
}

.admin-dialog-actions .activate {
  margin: 0;
  padding: 12px;
  font-size: 11px;
}

.admin-dialog-message {
  min-height: 18px;
  margin-top: 12px;
  color: #ff7979;
  font-size: 12px;
}

.admin-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.admin-save {
  width: auto;
  min-width: 150px;
  margin: 0;
  padding: 13px 18px;
  font-size: 12px;
}

.admin-feedback {
  color: #00f0a0;
  font-size: 12px;
}

.admin-feedback.error { color: #ff7979; }

.admin-warning {
  margin-top: 20px;
  padding: 13px;
  border: 1px solid #624b20;
  border-radius: 11px;
  color: #f3d996;
  background: #191307;
  font-size: 11px;
  line-height: 1.5;
}

.notice {
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #624b20;
  border-radius: 11px;
  color: #f3d996;
  background: #191307;
  font-size: 12px;
  line-height: 1.5;
}

footer {
  text-align: center;
  margin-top: 24px;
  color: #766781;
  font-size: 10px;
  letter-spacing: 1px;
}

@media (max-width: 350px) {
  body { padding: 15px 10px; }
  .card { padding: 16px 12px; }
  .logo { font-size: 38px; }
  .feature span { font-size: 8px; }
}

@media (max-width: 600px) {
  .dashboard { grid-template-columns: 1fr; gap: 12px; }
  .panel-sidebar {
    min-height: auto;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
  }
  .sidebar-brand { padding: 0; }
  .sidebar-label, .sidebar-footer { display: none; }
  .sidebar-menu { display: flex; margin-left: auto; gap: 7px; }
  .sidebar-item { width: auto; margin: 0; padding: 10px; }
  .panel-top { align-items: flex-start; flex-direction: column; }
  .control-heading { flex-direction: column; }
  .control-stage { min-height: 190px; }
  .app.dashboard-active .topbar { padding: 11px 12px; }
  .admin-grid { grid-template-columns: 1fr; }
}
</style>
</head>

<body>
<div class="app">

  <div class="topbar">
    <div class="badge">◆ KEYAUTH API 1.2</div>
    <div class="badge">♙ @Owner <span data-setting="owner">polako gatito</span></div>
  </div>

  <header class="brand">
    <div class="crown">♛</div>
    <div class="logo" data-setting="brand">Hyper$ex</div>
    <div class="subtitle" data-setting="subtitle">PANEL DE APOYO PARA FREE FIRE · ANDROID</div>
    <div class="powered" data-setting="powered">VALIDACIÓN DE LICENCIA · SERVIDOR NODE.JS</div>
  </header>

  <main id="login-view" class="card">
    <div class="welcome">
      <div class="iconbox">♛</div>
      <div>
        <h2 data-setting="loginHeading">BIENVENIDO/A</h2>
        <p data-setting="loginIntro">Introduce tu key para continuar.</p>
      </div>
      <div class="online">● KEYAUTH API</div>
    </div>

    <label for="license" data-setting="licenseLabel">KEY DE LICENCIA</label>
    <div class="input-wrap">
      <span class="key-icon">⚿</span>
      <input id="license" type="password"
        placeholder="Introduce tu licencia"
        autocomplete="off" spellcheck="false">
      <button class="eye" id="toggle" type="button"
        aria-label="Mostrar key">◉</button>
    </div>

    <fieldset class="edition-picker">
      <legend>ELIGE TU VERSIÓN DE FREE FIRE</legend>
      <div class="edition-options">
        <label class="edition-option">
          <input type="radio" name="ff-edition" value="normal" checked>
          <span>Free Fire Normal</span>
        </label>
        <label class="edition-option">
          <input type="radio" name="ff-edition" value="max">
          <span>Free Fire MAX</span>
        </label>
      </div>
      <p class="edition-help" data-setting="editionHelp">Esta elección solo personaliza el panel; no abre ni modifica el juego.</p>
    </fieldset>

    <button class="activate" id="activate" type="button">
      <span data-setting="loginButton">⚡ ACTIVAR LICENCIA →</span>
    </button>

    <div id="message" role="status"></div>

    <section class="features">
      <div class="feature">
        <div class="ficon">♧</div>
        <strong data-setting="feature1Title">SEGURO</strong>
        <span data-setting="feature1Text">Sin conexión</span>
      </div>
      <div class="feature">
        <div class="ficon">ϟ</div>
        <strong data-setting="feature2Title">RÁPIDO</strong>
        <span data-setting="feature2Text">Acceso ágil</span>
      </div>
      <div class="feature">
        <div class="ficon">♙</div>
        <strong data-setting="feature3Title">CONFIABLE</strong>
        <span data-setting="feature3Text">Tu cuenta</span>
      </div>
      <div class="feature">
        <div class="ficon">♛</div>
        <strong data-setting="feature4Title">PREMIUM</strong>
        <span data-setting="feature4Text">Acceso exclusivo</span>
      </div>
    </section>

    <section class="status">
      <div>
        <div class="status-title" data-setting="systemTitle">ESTADO DEL SISTEMA</div>
        <div class="status-text" data-setting="systemText">● Interfaz activa</div>
      </div>
      <div class="badge" data-setting="brand">Hyper$ex</div>
    </section>

    <section class="promo">
      <strong data-setting="promoTitle">Hyper$ex Premium</strong>
      <p data-setting="promoLine1">Más que un simple acceso...</p>
      <p data-setting="promoLine2" style="color:#ff80e8;margin-top:6px">
        Tu licencia, tu control.
      </p>
    </section>

    <footer data-setting="loginFooter">© 2026 HYPER$EX | LICENCIAS KEYAUTH</footer>
    <button id="admin-launch-login" class="admin-login-button" type="button">Administración privada</button>
  </main>

  <main id="dashboard" class="dashboard" hidden>
    <aside class="panel-sidebar">
      <div class="sidebar-brand"><span class="sidebar-mark">♛</span> <span id="sidebar-brand-name">HYPER$EX</span></div>
      <div class="sidebar-label" data-setting="menuTitle">MENÚ PRINCIPAL</div>
      <div class="sidebar-menu">
        <button id="control-nav" class="sidebar-item active" type="button"><span>◉</span> <span data-setting="controlNav">Abrir juego</span></button>
        <button id="admin-nav" class="sidebar-item" type="button"><span>⚙</span> <span data-setting="adminNav">Administrar</span></button>
      </div>
      <div class="sidebar-footer">
        <strong data-setting="sessionLabel">● ADMINISTRACIÓN PRIVADA</strong><br>
        <span data-setting="sessionText">Cambios guardados en el servidor</span>
      </div>
    </aside>

    <div class="panel-main">
      <header id="control-header" class="panel-top">
        <div>
          <div class="eyebrow" data-setting="panelEyebrow">FREE FIRE / ANDROID</div>
          <h1 id="control-title" data-setting="title">Abrir Free Fire</h1>
          <div class="selected-edition">Versión seleccionada: <strong id="selected-edition-label">Free Fire Normal</strong></div>
        </div>
        <div class="panel-live" data-setting="panelLive">● PANEL ACTIVO</div>
      </header>

      <section id="control-view" class="panel-view">
      <section id="control-card" class="control-card card">
        <div class="control-heading">
          <div>
            <div class="eyebrow" data-setting="moduleEyebrow">ACCESO AL JUEGO</div>
            <p class="control-description" data-setting="description">Elige una versión de Free Fire en la pantalla de acceso y pulsa el botón para abrirla si está instalada en este Android.</p>
          </div>
          <div class="module-tag" data-setting="moduleTag">ANDROID · FREE FIRE</div>
        </div>
        <div class="control-stage">
          <div class="game-launch-card">
            <div class="game-launch-mark" aria-hidden="true">FF</div>
            <div id="game-launch-title" class="game-launch-title">Free Fire Normal</div>
            <div id="game-launch-status" class="game-launch-status" role="status" aria-live="polite">Pulsa para abrir el juego seleccionado.</div>
            <button id="game-launch-button" class="activate game-launch-button" type="button">ABRIR FREE FIRE</button>
          </div>
        </div>
        <div class="notice" data-setting="notice">El botón solo intenta abrir el juego oficial instalado; no modifica Free Fire ni automatiza la mira.</div>
      </section>
      </section>

      <section id="admin-view" class="panel-view" hidden>
        <header class="panel-top">
          <div>
            <div class="eyebrow">CONFIGURACIÓN LOCAL</div>
            <h1>Panel de administración</h1>
          </div>
          <div class="panel-live">● ADMINISTRADOR AUTENTICADO</div>
        </header>
        <div class="admin-card card">
          <div class="eyebrow">PERSONALIZACIÓN DEL SITIO</div>
          <h2>Editar toda la página</h2>
          <p>Modifica los textos visibles y los colores. Los cambios se guardan en el servidor para todos los visitantes.</p>
          <form id="admin-form">
            <div id="admin-fields" class="admin-grid"></div>
            <div class="admin-actions">
              <button class="activate admin-save" type="submit">GUARDAR CAMBIOS</button>
              <button id="admin-reset" class="admin-cancel" type="button">Restaurar valores iniciales</button>
              <button id="admin-logout" class="admin-cancel" type="button">Cerrar sesión admin</button>
              <span id="admin-feedback" class="admin-feedback" role="status" aria-live="polite"></span>
            </div>
          </form>
          <div class="admin-warning">El acceso se protege con una contraseña configurada en el servidor. No cambies HTML ni scripts desde aquí; se editan de forma segura solo los textos y colores.</div>
        </div>
      </section>
      <footer><span id="dashboard-footer-brand">HYPER$EX</span> · <span data-setting="dashboardFooter">INTERFAZ DE DEMOSTRACIÓN</span></footer>
    </div>

  </main>
  <dialog id="admin-dialog" class="admin-dialog">
    <form id="admin-login-form">
      <h2>Administración privada</h2>
      <p>Ingresa tu contraseña de administrador configurada en el servidor.</p>
      <label for="admin-password">CONTRASEÑA</label>
      <input id="admin-password" type="password" autocomplete="current-password" maxlength="256" required>
      <div class="admin-dialog-actions">
        <button class="activate" type="submit">ENTRAR</button>
        <button id="admin-cancel" class="admin-cancel" type="button">Cancelar</button>
      </div>
      <div id="admin-login-message" class="admin-dialog-message" role="status" aria-live="polite"></div>
    </form>
  </dialog>
</div>

<script>
const keyInput = document.getElementById('license');
const toggle = document.getElementById('toggle');
const activate = document.getElementById('activate');
const loginButton = document.querySelector('#activate span');
const editionInputs = document.querySelectorAll('input[name="ff-edition"]');
const selectedEditionLabel = document.getElementById('selected-edition-label');
const gameLaunchButton = document.getElementById('game-launch-button');
const gameLaunchTitle = document.getElementById('game-launch-title');
const gameLaunchStatus = document.getElementById('game-launch-status');
const message = document.getElementById('message');
const statusText = document.querySelector('.status-text');
const app = document.querySelector('.app');
const loginView = document.getElementById('login-view');
const dashboard = document.getElementById('dashboard');
const controlNav = document.getElementById('control-nav');
const adminNav = document.getElementById('admin-nav');
const controlView = document.getElementById('control-view');
const adminView = document.getElementById('admin-view');
const adminForm = document.getElementById('admin-form');
const adminFeedback = document.getElementById('admin-feedback');
const adminDialog = document.getElementById('admin-dialog');
const adminLoginForm = document.getElementById('admin-login-form');
const adminLoginMessage = document.getElementById('admin-login-message');
const adminFields = document.getElementById('admin-fields');
let settings = {};
let defaultSettings = {};
let adminAuthenticated = false;
let licenseAuthenticated = false;
let selectedEdition = 'normal';

const settingGroups = [
  ['Identidad y acceso', [
    ['brand', 'Nombre del panel'], ['owner', 'Nombre de propietario'],
    ['subtitle', 'Subtítulo del encabezado'], ['powered', 'Texto bajo el subtítulo'],
    ['loginHeading', 'Título de bienvenida'], ['loginIntro', 'Texto de bienvenida'],
    ['licenseLabel', 'Etiqueta de licencia'], ['licensePlaceholder', 'Ayuda del campo de licencia'],
    ['editionHelp', 'Texto debajo de las versiones de Free Fire'],
    ['loginButton', 'Texto del botón de acceso'], ['loginFooter', 'Pie de página del acceso']
  ]],
  ['Tarjetas de información', [
    ['feature1Title', 'Tarjeta 1 · título'], ['feature1Text', 'Tarjeta 1 · texto'],
    ['feature2Title', 'Tarjeta 2 · título'], ['feature2Text', 'Tarjeta 2 · texto'],
    ['feature3Title', 'Tarjeta 3 · título'], ['feature3Text', 'Tarjeta 3 · texto'],
    ['feature4Title', 'Tarjeta 4 · título'], ['feature4Text', 'Tarjeta 4 · texto'],
    ['systemTitle', 'Estado · título'], ['systemText', 'Estado · texto'],
    ['promoTitle', 'Promoción · título'], ['promoLine1', 'Promoción · línea 1'],
    ['promoLine2', 'Promoción · línea 2']
  ]],
  ['Panel y contenido', [
    ['menuTitle', 'Título del menú'], ['controlNav', 'Botón para abrir el juego'],
    ['adminNav', 'Botón de administración'], ['sessionLabel', 'Etiqueta de sesión'],
    ['sessionText', 'Texto de sesión'], ['panelEyebrow', 'Encabezado del panel'],
    ['title', 'Título del módulo'], ['panelLive', 'Indicador del panel'],
    ['moduleEyebrow', 'Encabezado del módulo'], ['description', 'Descripción del módulo'],
    ['moduleTag', 'Etiqueta del módulo'], ['gameLaunchButton', 'Botón para abrir Free Fire'],
    ['notice', 'Aviso del módulo'], ['dashboardFooter', 'Pie de página del panel']
  ]],
  ['Colores', [
    ['accent', 'Color principal'], ['accentSoft', 'Color secundario'],
    ['background', 'Color del fondo']
  ]]
];

function applySettings() {
  document.documentElement.style.setProperty('--pink', settings.accent);
  document.documentElement.style.setProperty('--pink2', settings.accentSoft);
  document.documentElement.style.setProperty('--bg', settings.background);
  document.querySelectorAll('[data-setting]').forEach(element => {
    const value = settings[element.dataset.setting];
    if (typeof value === 'string') element.textContent = value;
  });
  document.getElementById('sidebar-brand-name').textContent = settings.brand;
  document.getElementById('dashboard-footer-brand').textContent = settings.brand.toUpperCase();
  keyInput.placeholder = settings.licensePlaceholder;
  gameLaunchButton.textContent = settings.gameLaunchButton;
  loginButton.textContent = settings.loginButton;
  activate.setAttribute('aria-label', settings.loginButton);
  updateSelectedEdition();
}

function updateSelectedEdition() {
  const gameName = selectedEdition === 'max' ? 'Free Fire MAX' : 'Free Fire Normal';
  selectedEditionLabel.textContent = gameName;
  gameLaunchTitle.textContent = gameName;
  gameLaunchStatus.textContent = 'Pulsa para abrir ' + gameName + ' si está instalada en este Android.';
}

function createAdminFields() {
  for (const [groupTitle, fields] of settingGroups) {
    const heading = document.createElement('h3');
    heading.className = 'admin-section-title';
    heading.textContent = groupTitle;
    adminFields.append(heading);
    for (const [name, labelText] of fields) {
      const label = document.createElement('label');
      label.className = 'admin-field';
      label.htmlFor = 'setting-' + name;
      label.append(document.createTextNode(labelText));
      const input = document.createElement(name === 'description' || name === 'notice'
        ? 'textarea'
        : 'input');
      input.id = 'setting-' + name;
      input.name = name;
      input.maxLength = 300;
      if (['accent', 'accentSoft', 'background'].includes(name)) {
        input.type = 'color';
      } else {
        input.type = 'text';
      }
      label.append(input);
      adminFields.append(label);
    }
  }
}

function populateAdminForm() {
  for (const name of Object.keys(defaultSettings)) {
    const field = adminForm.elements.namedItem(name);
    if (field) field.value = settings[name];
  }
}

async function loadInitialSettings() {
  const response = await fetch('/api/site-settings', { cache: 'no-store' });
  const result = await response.json();
  if (!response.ok || !result.settings || !result.defaults) {
    throw new Error(result.message || 'No se pudo cargar la configuración del sitio.');
  }
  settings = result.settings;
  defaultSettings = result.defaults;
  createAdminFields();
  applySettings();
  populateAdminForm();
}

async function checkAdminSession() {
  const response = await fetch('/api/admin/session', { cache: 'no-store' });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'No se pudo comprobar la sesión.');
  adminAuthenticated = result.authenticated === true;
  if (adminAuthenticated) {
    loginView.hidden = true;
    dashboard.hidden = false;
    app.classList.add('dashboard-active');
    controlNav.hidden = true;
    showPanel('admin');
  }
}

loadInitialSettings()
  .then(checkAdminSession)
  .catch(error => {
    message.style.display = 'block';
    message.style.color = '#ff7979';
    message.textContent = error.message;
  });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .catch(error => console.error('No se pudo registrar el service worker:', error));
}

toggle.addEventListener('click', () => {
  const hidden = keyInput.type === 'password';
  keyInput.type = hidden ? 'text' : 'password';
  toggle.textContent = hidden ? '◎' : '◉';
  toggle.setAttribute('aria-label',
    hidden ? 'Ocultar key' : 'Mostrar key');
});

activate.addEventListener('click', async () => {
  const key = keyInput.value.trim();
  message.style.display = 'block';

  if (!key) {
    message.style.color = '#ff7979';
    message.textContent = '⚠ Introduce tu licencia para continuar.';
    statusText.textContent = '● Interfaz activa';
    keyInput.focus();
    return;
  }

  activate.disabled = true;
  loginButton.textContent = 'VERIFICANDO LICENCIA...';
  message.style.color = '#ff80e8';
  message.textContent = 'Conectando con el servidor de licencias...';

  try {
    const response = await fetch('/api/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ license: key })
    });
    const result = await response.json();

    if (!response.ok || result.valid !== true) {
      message.style.color = '#ff7979';
      message.textContent = result.message || 'No se pudo validar la licencia.';
      statusText.textContent = '● Interfaz activa';
      return;
    }

    message.style.color = '#00f0a0';
    message.textContent = '✓ Licencia verificada por KeyAuth.';
    statusText.textContent = '● Licencia verificada';
    licenseAuthenticated = true;
    loginView.hidden = true;
    dashboard.hidden = false;
    controlNav.hidden = false;
    adminView.hidden = true;
    controlView.hidden = false;
    app.classList.add('dashboard-active');
  } catch (error) {
    message.style.color = '#ff7979';
    message.textContent = 'No se pudo contactar con el servidor. Comprueba que Node esté iniciado.';
    statusText.textContent = '● Servidor no disponible';
  } finally {
    activate.disabled = false;
    loginButton.textContent = settings.loginButton || 'ACTIVAR LICENCIA';
  }
});

editionInputs.forEach(input => {
  input.addEventListener('change', () => {
    if (!input.checked) return;
    selectedEdition = input.value;
    updateSelectedEdition();
  });
});

gameLaunchButton.addEventListener('click', () => {
  if (!licenseAuthenticated) {
    gameLaunchStatus.textContent = 'Primero activa una licencia válida de KeyAuth.';
    return;
  }
  if (!/Android/i.test(navigator.userAgent)) {
    gameLaunchStatus.textContent = 'Este botón solo puede abrir el juego desde Android.';
    return;
  }

  const game = selectedEdition === 'max'
    ? { packageName: 'com.dts.freefiremax', storeId: 'com.dts.freefiremax', name: 'Free Fire MAX' }
    : { packageName: 'com.dts.freefireth', storeId: 'com.dts.freefireth', name: 'Free Fire' };
  const storeUrl = 'https://play.google.com/store/apps/details?id=' + game.storeId;
  const intentUrl = 'intent://launch/#Intent;scheme=freefire;package=' + game.packageName +
    ';action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=' +
    encodeURIComponent(storeUrl) + ';end';

  gameLaunchStatus.textContent = 'Abriendo ' + game.name + '...';
  window.location.href = intentUrl;
});

keyInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') activate.click();
});

keyInput.addEventListener('input', () => {
  statusText.textContent = '● Interfaz activa';
});

function showPanel(view) {
  const showAdmin = view === 'admin';
  controlView.hidden = showAdmin;
  adminView.hidden = !showAdmin;
  document.getElementById('control-header').hidden = showAdmin;
  controlNav.classList.toggle('active', !showAdmin);
  adminNav.classList.toggle('active', showAdmin);
}

controlNav.addEventListener('click', () => showPanel('control'));
function openAdminLogin() {
  adminLoginMessage.textContent = '';
  document.getElementById('admin-password').value = '';
  adminDialog.showModal();
  document.getElementById('admin-password').focus();
}

document.getElementById('admin-launch-login').addEventListener('click', openAdminLogin);
document.getElementById('admin-cancel').addEventListener('click', () => adminDialog.close());
adminNav.addEventListener('click', () => {
  if (!adminAuthenticated) {
    openAdminLogin();
    return;
  }
  populateAdminForm();
  adminFeedback.textContent = '';
  adminFeedback.classList.remove('error');
  showPanel('admin');
});

adminLoginForm.addEventListener('submit', async event => {
  event.preventDefault();
  const submitButton = adminLoginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  adminLoginMessage.textContent = 'Comprobando contraseña...';
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: document.getElementById('admin-password').value })
    });
    const result = await response.json();
    if (!response.ok || result.valid !== true) {
      adminLoginMessage.textContent = result.message || 'No se pudo iniciar sesión.';
      return;
    }
    adminAuthenticated = true;
    adminDialog.close();
    loginView.hidden = true;
    dashboard.hidden = false;
    app.classList.add('dashboard-active');
    controlNav.hidden = !licenseAuthenticated;
    populateAdminForm();
    showPanel('admin');
  } catch (error) {
    adminLoginMessage.textContent = 'No se pudo contactar con el servidor.';
  } finally {
    submitButton.disabled = false;
  }
});

adminForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(adminForm);
  const nextSettings = {};
  for (const name of Object.keys(defaultSettings)) {
    nextSettings[name] = String(formData.get(name) ?? '').trim();
  }
  saveSettings(nextSettings);
});

async function saveSettings(nextSettings) {
  adminFeedback.textContent = 'Guardando en el servidor...';
  adminFeedback.classList.remove('error');
  try {
    const response = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: nextSettings })
    });
    const result = await response.json();
    if (!response.ok || result.saved !== true) {
      if (response.status === 401) adminAuthenticated = false;
      throw new Error(result.message || 'No se pudieron guardar los cambios.');
    }
    settings = result.settings;
    applySettings();
    populateAdminForm();
    adminFeedback.textContent = 'Cambios guardados para todos los visitantes.';
  } catch (error) {
    adminFeedback.textContent = error.message || 'No se pudieron guardar los cambios.';
    adminFeedback.classList.add('error');
  }
}

document.getElementById('admin-reset').addEventListener('click', () => {
  saveSettings(defaultSettings);
});

document.getElementById('admin-logout').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/admin/logout', { method: 'POST' });
    const result = await response.json();
    if (!response.ok || result.authenticated !== false) {
      throw new Error(result.message || 'No se pudo cerrar la sesión.');
    }
    adminAuthenticated = false;
    if (licenseAuthenticated) {
      controlNav.hidden = false;
      showPanel('control');
    } else {
      dashboard.hidden = true;
      loginView.hidden = false;
      app.classList.remove('dashboard-active');
    }
  } catch (error) {
    adminFeedback.textContent = error.message || 'No se pudo cerrar la sesión.';
    adminFeedback.classList.add('error');
  }
});
</script>
</body>
</html>
`;

if (typeof document !== "undefined") {
  document.open();
  document.write(html);
  document.close();
}