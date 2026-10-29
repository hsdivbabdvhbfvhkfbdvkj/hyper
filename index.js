const html = String.raw`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>IPA | KeyAuth</title>
<meta name="theme-color" content="#ff32d2">
<meta name="description" content="Panel IPA para Free Fire">
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

button, input, textarea { font: inherit; }
button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--pink2);
  outline-offset: 3px;
}

body {
  margin: 0;
  min-height: 100vh;
  padding: 22px 15px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  background:
    radial-gradient(ellipse at 15% 0%, #64205955 0%, transparent 38%),
    radial-gradient(ellipse at 100% 45%, #27204e55 0%, transparent 35%),
    linear-gradient(145deg, #09070e, var(--bg) 62%, #0e0815);
}

.app {
  width: 100%;
  max-width: 470px;
  margin: auto;
}

.sidebar-item:hover { border-color: var(--pink2); }

.app.dashboard-active { max-width: 1160px; }
.app.dashboard-active .brand { display: none; }
.app.dashboard-active .topbar {
  margin-bottom: 18px;
  padding: 14px 18px;
  border: 1px solid #39203f;
  border-radius: 15px;
  background: linear-gradient(110deg, #17101e, #0c0911);
  box-shadow: 0 12px 30px #0004;
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
  background: linear-gradient(145deg, #17101eeb, #09070ef5 70%);
  border: 1px solid #63365f;
  border-radius: 22px;
  padding: 21px 17px;
  box-shadow: 0 20px 60px #0007, 0 0 25px #ff32d213, inset 0 1px #ffffff0b;
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

.activate:hover { filter: brightness(1.08); box-shadow: 0 0 28px #ff32d266; }
.activate:active { transform: scale(.98); }
.activate:disabled { cursor: wait; opacity: .7; }

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
  background: linear-gradient(180deg, #17101e, #0b0910);
  box-shadow: 0 18px 50px #0004;
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin: 28px 0 22px;
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
  align-content: center;
  min-height: 230px;
  gap: 12px;
  padding: 25px 16px;
  border: 1px solid #39203f;
  border-radius: 18px;
  background: #09070e;
  text-align: center;
}

.auxiliary-card {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 12px;
  min-height: 230px;
  padding: 25px 16px;
  border: 1px solid #39203f;
  border-radius: 18px;
  background: linear-gradient(145deg, #100c17, #09070e);
  text-align: center;
}

.auxiliary-card h2 {
  margin: 0;
  color: #fff;
  font-size: 16px;
}

.auxiliary-card p {
  max-width: 290px;
  font-size: 12px;
}

.auxiliary-toggle { margin-top: 4px; }

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

.auxiliary-toggle {
  width: min(100%, 360px);
  padding: 13px 18px;
  border: 1px solid #624b20;
  border-radius: 12px;
  color: #f3d996;
  background: #191307;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: .5px;
  cursor: pointer;
}

.auxiliary-toggle[aria-pressed="true"] {
  border-color: #087c5a;
  color: #00f0a0;
  background: #071811;
}

.auxiliary-note {
  max-width: 360px;
  color: #9c90ad;
  font-size: 11px;
  line-height: 1.5;
}

.custom-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.custom-content-card {
  padding: 19px;
  border: 1px solid #39203f;
  border-radius: 15px;
  background: linear-gradient(145deg, #160c1b, #09070e);
}

.custom-content-card h2 {
  margin: 0 0 8px;
  font-size: 15px;
}

.custom-content-card p {
  white-space: pre-wrap;
}

.admin-content-builder {
  margin-top: 26px;
  padding-top: 21px;
  border-top: 1px solid #39203f;
}

.admin-content-builder > p { margin: 8px 0 16px; }

.custom-card-editor {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto auto;
  gap: 10px;
  align-items: start;
  margin-top: 12px;
}

.custom-card-editor input,
.custom-card-editor textarea,
.custom-card-create input,
.custom-card-create textarea {
  width: 100%;
  min-width: 0;
  padding: 11px;
  border: 1px solid #39203f;
  border-radius: 9px;
  color: #fff;
  background: #09070e;
  font: inherit;
}

.custom-card-editor textarea {
  min-height: 44px;
  resize: vertical;
}

.custom-card-editor button,
.custom-card-create button {
  padding: 11px 13px;
  border: 1px solid #54224f;
  border-radius: 9px;
  color: #fff;
  background: #241126;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
}

.custom-card-editor .custom-card-delete {
  border-color: #71323b;
  color: #ffb6bd;
  background: #241014;
}

.custom-card-create {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto;
  gap: 10px;
  align-items: start;
}

.custom-card-empty {
  margin-top: 12px;
  color: #9c90ad;
  font-size: 12px;
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
  .control-stage { grid-template-columns: 1fr; }
  .game-launch-card, .auxiliary-card { min-height: 190px; }
  .app.dashboard-active .topbar { padding: 11px 12px; }
  .admin-grid { grid-template-columns: 1fr; }
  .custom-card-editor, .custom-card-create { grid-template-columns: 1fr; }
}

.app.dashboard-active { max-width: 1280px; }

.app.dashboard-active .topbar,
.panel-sidebar,
.control-card,
.admin-card {
  border-color: #ffffff19;
  background-color: #100d18eF;
  backdrop-filter: blur(18px);
}

.app.dashboard-active .topbar {
  min-height: 66px;
  border-radius: 17px;
  background-image: linear-gradient(110deg, #1d1428dd, #100d18dd);
}

.dashboard {
  grid-template-columns: 236px minmax(0, 1fr);
  gap: 24px;
}

.panel-sidebar {
  position: sticky;
  top: 20px;
  height: min(740px, calc(100vh - 40px));
  min-height: 570px;
  padding: 25px 17px;
  border-radius: 20px;
  box-shadow: 0 24px 70px #0006, inset 0 1px #ffffff0c;
}

.sidebar-brand {
  padding-bottom: 30px;
  font-size: 17px;
}

.sidebar-mark {
  width: 40px;
  height: 40px;
  border-radius: 13px;
  background: linear-gradient(145deg, #3b1640, #1b1126);
}

.sidebar-menu { margin-top: 6px; }

.sidebar-item {
  min-height: 46px;
  border-color: transparent;
  background: transparent;
  color: #bdb3cb;
  transition: background .18s ease, border-color .18s ease, color .18s ease;
}

.sidebar-item.active {
  border-color: #d65ac344;
  background: linear-gradient(100deg, #e440c41b, #9d5af010);
  color: #fff;
  box-shadow: inset 3px 0 var(--pink);
}

.panel-top {
  min-height: 86px;
  margin-bottom: 20px;
}

.panel-top h1 {
  font-size: clamp(28px, 4vw, 38px);
  letter-spacing: -1.2px;
}

.panel-live {
  padding: 11px 15px;
  border-color: #35c99c42;
  background: #0a1915;
  font-size: 10px;
}

.control-card,
.admin-card {
  border-radius: 24px;
  box-shadow: 0 26px 70px #0005, inset 0 1px #ffffff0b;
}

.control-card {
  background:
    radial-gradient(ellipse at 80% 0%, #75326920, transparent 40%),
    linear-gradient(145deg, #15111dee, #0d0b12f2 72%);
}

.control-heading .eyebrow,
.admin-content-builder .eyebrow {
  color: #dc88dd;
}

.control-description {
  color: #c1b9cc;
  line-height: 1.7;
}

.module-tag {
  padding: 10px 12px;
  border-color: #ffffff1b;
  border-radius: 999px;
  background: #ffffff08;
}

.control-stage {
  gap: 18px;
  padding: 17px;
  border-color: #ffffff13;
  border-radius: 21px;
  background:
    linear-gradient(#ffffff06 1px, transparent 1px),
    linear-gradient(90deg, #ffffff06 1px, transparent 1px),
    #0b0911;
  background-size: 32px 32px;
}

.game-launch-card,
.auxiliary-card {
  min-height: 270px;
  padding: 30px 22px;
  border-color: #ffffff17;
  border-radius: 18px;
  background: linear-gradient(150deg, #17121f, #0d0b12 78%);
}

.auxiliary-card {
  border-color: #8d74412e;
  background: linear-gradient(150deg, #17140f, #0d0b12 78%);
}

.game-launch-mark {
  width: 72px;
  height: 72px;
  border-color: #ed6fdc66;
  border-radius: 22px;
  background: linear-gradient(145deg, #421b49, #1a1125);
  box-shadow: 0 12px 32px #e440c421, inset 0 1px #ffffff20;
}

.game-launch-title,
.auxiliary-card h2 {
  font-size: 18px;
  letter-spacing: -.3px;
}

.game-launch-status {
  max-width: 330px;
  min-height: 36px;
  color: #b8afc3;
}

.game-launch-button {
  min-height: 56px;
  border: 0;
  border-radius: 14px;
  color: #1c0c1d;
  background: linear-gradient(105deg, #ea46d0, #f498e8 53%, #c77aff);
  box-shadow: 0 12px 30px #dc48c52b, inset 0 1px #ffffff99;
  font-size: 13px;
  letter-spacing: 1.5px;
}

.auxiliary-toggle {
  min-height: 48px;
  border-color: #a68a4b67;
  border-radius: 13px;
  background: #201a0e;
  letter-spacing: 1px;
}

.auxiliary-toggle[aria-pressed="true"] {
  border-color: #31c99766;
  background: #0d2019;
}

.notice {
  border-color: #a68a4b43;
  border-radius: 13px;
  background: #18150f;
  color: #dfd0a6;
}

.custom-content-card {
  border-color: #ffffff17;
  border-radius: 17px;
  background: linear-gradient(145deg, #17121f, #0d0b12);
  box-shadow: inset 0 1px #ffffff08;
}

.admin-card {
  background: linear-gradient(145deg, #15111dee, #0d0b12f2 72%);
}

.admin-card > .eyebrow { color: #dc88dd; }
.admin-section-title { color: #d79ddd; }

.admin-field input,
.admin-field textarea,
.custom-card-editor input,
.custom-card-editor textarea,
.custom-card-create input,
.custom-card-create textarea {
  border-color: #ffffff1e;
  border-radius: 11px;
  background: #0a0810;
  color: #f7f2fa;
}

.admin-field input:hover,
.admin-field textarea:hover,
.custom-card-editor input:hover,
.custom-card-editor textarea:hover,
.custom-card-create input:hover,
.custom-card-create textarea:hover {
  border-color: #db75cf66;
}

.admin-login-button,
.admin-cancel,
.custom-card-editor button,
.custom-card-create button {
  min-height: 42px;
  border-color: #ffffff20;
  border-radius: 11px;
  background: #211729;
  transition: border-color .18s ease, background .18s ease, transform .18s ease;
}

.admin-login-button:hover,
.admin-cancel:hover,
.custom-card-editor button:hover,
.custom-card-create button:hover {
  transform: translateY(-1px);
  border-color: #d65ac388;
  background: #30203b;
}

footer {
  color: #92879f;
  letter-spacing: 1.3px;
}

@media (max-width: 600px) {
  .dashboard { grid-template-columns: 1fr; gap: 14px; }
  .panel-sidebar { position: static; height: auto; min-height: auto; }
  .app.dashboard-active .topbar { min-height: 54px; }
  .control-stage { padding: 11px; }
  .game-launch-card, .auxiliary-card { min-height: 220px; padding: 23px 15px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
}

body {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  letter-spacing: .01em;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.app:not(.dashboard-active) { max-width: 510px; }

.topbar {
  gap: 12px;
}

.topbar .badge {
  border-color: #ffffff19;
  border-radius: 999px;
  background: #100d18b8;
  color: #c9b9d1;
  font-size: 10px;
  letter-spacing: .8px;
}

.brand {
  padding: 24px 0 30px;
}

.crown {
  display: inline-grid;
  width: 68px;
  height: 68px;
  place-items: center;
  border: 1px solid #e866d955;
  border-radius: 23px;
  background: linear-gradient(145deg, #28142f, #100c17);
  font-size: 32px;
  filter: drop-shadow(0 10px 24px #d541c532);
}

.logo {
  margin-top: 15px;
  color: #f7e9fa;
  font-style: normal;
  letter-spacing: .12em;
  text-shadow: 0 0 30px #e440c44d;
}

.subtitle {
  color: #d3a9d8;
  font-size: 9px;
  letter-spacing: 3px;
}

#login-view {
  padding: clamp(24px, 6vw, 34px);
  border-color: #ffffff1a;
  border-radius: 24px;
  background:
    radial-gradient(ellipse at 100% 0%, #7a3a7222, transparent 38%),
    linear-gradient(145deg, #17121fed, #0d0b12f5 72%);
}

.welcome {
  gap: 15px;
  margin-bottom: 28px;
}

.welcome h2 {
  color: #f9f2fb;
  font-size: 22px;
  letter-spacing: -.5px;
}

.welcome p { color: #b7adbf; }

.online {
  padding: 7px 9px;
  border: 1px solid #35c99c36;
  border-radius: 999px;
  background: #0b1915;
  font-size: 8px;
  letter-spacing: .6px;
}

#login-view > label {
  margin-bottom: 9px;
  color: #d5cadb;
  font-size: 10px;
  letter-spacing: 1.2px;
}

.input-wrap {
  min-height: 54px;
  border-color: #ffffff22;
  border-radius: 13px;
  background: #09070e;
  box-shadow: inset 0 1px #ffffff08;
}

.input-wrap:focus-within {
  border-color: #db75cf;
  box-shadow: 0 0 0 3px #db75cf1c;
}

.edition-picker {
  padding: 17px;
  border-color: #ffffff18;
  border-radius: 15px;
  background: #0c0a11;
}

.edition-picker legend {
  color: #d5cadb;
  letter-spacing: 1.1px;
}

.edition-option {
  min-height: 58px;
  border-color: #ffffff17;
  border-radius: 12px;
  background: #100d17;
}

.edition-option:has(input:checked) {
  border-color: #db75cf99;
  background: linear-gradient(145deg, #321936, #1a1122);
  box-shadow: inset 0 1px #ffffff15, 0 8px 20px #0003;
}

.edition-help {
  margin-top: 13px;
  color: #a99fb0;
  line-height: 1.6;
}

#activate {
  min-height: 54px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(105deg, #e84bcf, #f3a0e8 55%, #c77aff);
  box-shadow: 0 14px 32px #d844c52e, inset 0 1px #ffffff99;
  font-size: 12px;
  letter-spacing: 1.4px;
}

.features {
  gap: 0;
  overflow: hidden;
  border-color: #ffffff18;
  border-radius: 15px;
  background: #0b0911;
}

.feature {
  padding: 9px 5px;
  border-color: #ffffff12;
}

.feature strong { color: #eee5f1; }
.feature span { color: #9e94a8; }

.status {
  border-color: #ffffff18;
  border-radius: 14px;
  background: #0c0a12;
}

.status-title {
  color: #a99fb0;
  letter-spacing: 1.2px;
}

.promo {
  border-color: #ffffff17;
  border-radius: 15px;
  background:
    radial-gradient(ellipse at 100% 0%, #7a3a7222, transparent 45%),
    linear-gradient(120deg, #17101e, #0c0a12);
}

.admin-card h2 {
  color: #f8f2fa;
  font-size: 23px;
  letter-spacing: -.5px;
}

.admin-card > p,
.admin-content-builder > p {
  color: #b6adbf;
  line-height: 1.65;
}

.admin-grid { gap: 17px; }

.admin-field {
  color: #c9bfce;
  font-size: 10px;
  letter-spacing: .55px;
}

.admin-field input,
.admin-field textarea {
  min-height: 44px;
  margin-top: 9px;
}

.admin-field input[type="color"] { min-height: 44px; }

.admin-section-title {
  margin-top: 18px;
  padding-bottom: 11px;
}

#custom-card-create { white-space: nowrap; }

@media (max-width: 600px) {
  body { padding: 14px 12px 24px; }
  .brand { padding: 17px 0 22px; }
  #login-view { padding: 22px 17px; }
  .welcome { align-items: flex-start; }
  .online { margin-top: 4px; }
  .features { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .feature:nth-child(2) { border-right: 0; }
  .feature:nth-child(-n + 2) { border-bottom: 1px solid #ffffff12; }
  .topbar .badge { padding: 8px 10px; font-size: 8px; }
  .admin-actions { align-items: stretch; }
  .admin-actions .admin-save,
  .admin-actions .admin-cancel { flex: 1 1 100%; }
}

@media (min-width: 900px) {
  body {
    display: grid;
    align-items: center;
    padding: 36px;
  }

  .app:not(.dashboard-active) {
    display: grid;
    max-width: 1120px;
    grid-template-columns: minmax(0, 1fr) minmax(390px, .82fr);
    align-items: center;
    column-gap: clamp(48px, 8vw, 112px);
  }

  .app:not(.dashboard-active) .topbar {
    grid-column: 1 / -1;
    margin-bottom: 46px;
  }

  .app:not(.dashboard-active) .brand {
    grid-column: 1;
    grid-row: 2;
    padding: 15px 0;
    text-align: left;
  }

  .app:not(.dashboard-active) .crown {
    margin-bottom: 12px;
  }

  .app:not(.dashboard-active) .logo {
    margin-top: 0;
    font-size: clamp(76px, 10vw, 120px);
    letter-spacing: .08em;
  }

  .app:not(.dashboard-active) .subtitle {
    max-width: 420px;
    margin-top: 19px;
    font-size: 11px;
    letter-spacing: 2.4px;
    line-height: 1.8;
  }

  .app:not(.dashboard-active) .powered {
    max-width: 360px;
    margin-top: 14px;
    font-size: 10px;
    letter-spacing: 1.8px;
    line-height: 1.8;
  }

  .app:not(.dashboard-active) .brand::after {
    display: block;
    max-width: 390px;
    margin-top: 40px;
    padding: 17px 19px;
    border: 1px solid #ffffff17;
    border-radius: 16px;
    color: #c9bfce;
    background: linear-gradient(110deg, #17121fc9, #100d18a8);
    content: "FREE FIRE NORMAL    /    FREE FIRE MAX";
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    box-shadow: inset 0 1px #ffffff08;
  }

  .app:not(.dashboard-active) #login-view {
    grid-column: 2;
    grid-row: 2;
    padding: 34px;
  }

  .app:not(.dashboard-active) #login-view .features {
    margin-top: 23px;
  }

  .app:not(.dashboard-active) #login-view > footer {
    margin-top: 21px;
  }

  .app:not(.dashboard-active) #admin-launch-login {
    width: 100%;
    margin-top: 14px;
    color: #aaa0bd;
    background: transparent;
  }
}

@media (max-width: 899px) {
  .app:not(.dashboard-active) {
    display: flex;
    flex-direction: column;
  }

  .app:not(.dashboard-active) .brand { order: 1; }
  .app:not(.dashboard-active) .topbar { order: 0; }
  .app:not(.dashboard-active) #login-view { order: 2; }

  .app:not(.dashboard-active) .brand::after { display: none; }
}

@media (min-width: 900px) and (max-height: 760px) {
  body { align-items: start; }
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
    <div class="logo" data-setting="brand">IPA</div>
    <div class="subtitle" data-setting="subtitle">PANEL DE APOYO PARA FREE FIRE · iOS / ANDROID</div>
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
      <div class="badge" data-setting="brand">IPA</div>
    </section>

    <section class="promo">
      <strong data-setting="promoTitle">IPA</strong>
      <p data-setting="promoLine1">Más que un simple acceso...</p>
      <p data-setting="promoLine2" style="color:#ff80e8;margin-top:6px">
        Tu licencia, tu control.
      </p>
    </section>

    <footer data-setting="loginFooter">© 2026 IPA | LICENCIAS KEYAUTH</footer>
    <button id="admin-launch-login" class="admin-login-button" type="button">Administración privada</button>
  </main>

  <main id="dashboard" class="dashboard" hidden>
    <aside class="panel-sidebar">
      <div class="sidebar-brand"><span class="sidebar-mark">♛</span> <span id="sidebar-brand-name">IPA</span></div>
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
          <div class="eyebrow" data-setting="panelEyebrow">FREE FIRE / iOS · ANDROID</div>
          <h1 id="control-title" data-setting="title">Abrir Free Fire</h1>
          <div class="selected-edition">Versión seleccionada: <strong id="selected-edition-label">Free Fire Normal</strong></div>
        </div>
        <div id="panel-live-status" class="panel-live" data-setting="panelLive">● PANEL DISPONIBLE</div>
      </header>

      <section id="control-view" class="panel-view">
      <section id="control-card" class="control-card card">
        <div class="control-heading">
          <div>
            <div class="eyebrow" data-setting="moduleEyebrow">ACCESO AL JUEGO</div>
            <p class="control-description" data-setting="description">Elige Free Fire Normal o MAX. En iPhone o iPad, el botón abre la ficha de esa versión en App Store; en Android intenta iniciar el juego si está instalado.</p>
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
          <div class="auxiliary-card">
            <div class="game-launch-mark" aria-hidden="true">◎</div>
            <h2>Indicador del panel</h2>
            <p>Solo cambia el estado visual de esta página. No funciona dentro de Free Fire.</p>
            <button id="auxiliary-toggle" class="auxiliary-toggle" type="button" aria-pressed="false">ACTIVAR INDICADOR VISUAL</button>
            <div id="auxiliary-status" class="auxiliary-note" role="status" aria-live="polite">Indicador visual desactivado; no proporciona auxilio funcional en el juego.</div>
          </div>
        </div>
        <div class="notice" data-setting="notice">En iOS se abre la ficha oficial de App Store; la disponibilidad depende de la región. En Android, la apertura depende del navegador y de que el juego esté instalado.</div>
      </section>
      <div id="custom-content-list" class="custom-content-grid" aria-live="polite"></div>
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
          <section class="admin-content-builder">
            <div class="eyebrow">CONTENIDO DEL PANEL</div>
            <h2>Crear y editar tarjetas</h2>
            <p>Crea bloques informativos nuevos o modifica y elimina los existentes. Se muestran en el panel para todos los visitantes.</p>
            <div id="custom-card-admin-list"></div>
            <div class="admin-section-title">NUEVA TARJETA</div>
            <div class="custom-card-create">
              <input id="new-card-title" type="text" maxlength="80" placeholder="Título de la tarjeta" aria-label="Título de la nueva tarjeta">
              <textarea id="new-card-content" maxlength="300" placeholder="Texto de la tarjeta" aria-label="Texto de la nueva tarjeta"></textarea>
              <button id="custom-card-create" type="button">CREAR TARJETA</button>
            </div>
            <div id="custom-card-feedback" class="admin-feedback" role="status" aria-live="polite"></div>
          </section>
          <div class="admin-warning">El acceso se protege con una contraseña configurada en el servidor. Por seguridad, aquí puedes editar textos, colores y tarjetas informativas; no se permite ejecutar código personalizado.</div>
        </div>
      </section>
      <footer><span id="dashboard-footer-brand">IPA</span> · <span data-setting="dashboardFooter">PANEL DE APOYO PARA FREE FIRE</span></footer>
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
const auxiliaryToggle = document.getElementById('auxiliary-toggle');
const auxiliaryStatus = document.getElementById('auxiliary-status');
const panelLiveStatus = document.getElementById('panel-live-status');
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
const customCardAdminList = document.getElementById('custom-card-admin-list');
const customContentList = document.getElementById('custom-content-list');
const customCardFeedback = document.getElementById('custom-card-feedback');
let settings = {};
let defaultSettings = {};
let adminAuthenticated = false;
let licenseAuthenticated = false;
let selectedEdition = 'normal';
let auxiliaryEnabled = false;

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
  renderCustomContent();
  renderCustomCardAdminList();
  updateSelectedEdition();
}

function getCustomCards() {
  const cards = JSON.parse(settings.customCards || '[]');
  if (!Array.isArray(cards)) throw new Error('Las tarjetas guardadas no tienen un formato válido.');
  return cards;
}

function renderCustomContent() {
  customContentList.replaceChildren();
  for (const card of getCustomCards()) {
    const article = document.createElement('article');
    article.className = 'custom-content-card';
    const title = document.createElement('h2');
    title.textContent = card.title;
    const content = document.createElement('p');
    content.textContent = card.content;
    article.append(title, content);
    customContentList.append(article);
  }
}

function renderCustomCardAdminList() {
  customCardAdminList.replaceChildren();
  const cards = getCustomCards();
  if (!cards.length) {
    const empty = document.createElement('p');
    empty.className = 'custom-card-empty';
    empty.textContent = 'Todavía no hay tarjetas creadas.';
    customCardAdminList.append(empty);
    return;
  }

  cards.forEach((card, index) => {
    const row = document.createElement('div');
    row.className = 'custom-card-editor';
    const title = document.createElement('input');
    title.type = 'text';
    title.maxLength = 80;
    title.value = card.title;
    title.setAttribute('aria-label', 'Título de la tarjeta ' + (index + 1));
    const content = document.createElement('textarea');
    content.maxLength = 300;
    content.value = card.content;
    content.setAttribute('aria-label', 'Texto de la tarjeta ' + (index + 1));
    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.textContent = 'GUARDAR';
    saveButton.addEventListener('click', async () => {
      const updated = getCustomCards();
      updated[index] = { title: title.value.trim(), content: content.value.trim() };
      await saveCustomCards(updated);
    });
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'custom-card-delete';
    deleteButton.textContent = 'ELIMINAR';
    deleteButton.addEventListener('click', async () => {
      const updated = getCustomCards();
      updated.splice(index, 1);
      await saveCustomCards(updated);
    });
    row.append(title, content, saveButton, deleteButton);
    customCardAdminList.append(row);
  });
}

async function saveCustomCards(cards) {
  customCardFeedback.textContent = 'Guardando tarjetas...';
  customCardFeedback.classList.remove('error');
  const saved = await saveSettings({
    ...settings,
    customCards: JSON.stringify(cards)
  });
  if (saved) {
    customCardFeedback.textContent = 'Tarjetas guardadas y publicadas en el panel.';
  } else {
    customCardFeedback.textContent = adminFeedback.textContent;
    customCardFeedback.classList.add('error');
  }
}

function updateSelectedEdition() {
  const gameName = selectedEdition === 'max' ? 'Free Fire MAX' : 'Free Fire Normal';
  selectedEditionLabel.textContent = gameName;
  gameLaunchTitle.textContent = gameName;
  gameLaunchStatus.textContent = licenseAuthenticated
    ? 'Licencia verificada. Pulsa para abrir la ficha de ' + gameName + ' o iniciar el juego.'
    : 'Selecciona la edición y activa una licencia para abrirla.';
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
    message.textContent = '✓ Licencia verificada por KeyAuth. El panel está funcionando.';
    statusText.textContent = '● Licencia verificada';
    licenseAuthenticated = true;
    panelLiveStatus.textContent = '● IPA DISPONIBLE';
    updateSelectedEdition();
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

auxiliaryToggle.addEventListener('click', () => {
  auxiliaryEnabled = !auxiliaryEnabled;
  auxiliaryToggle.setAttribute('aria-pressed', String(auxiliaryEnabled));
  auxiliaryToggle.textContent = auxiliaryEnabled
    ? 'DESACTIVAR INDICADOR VISUAL'
    : 'ACTIVAR INDICADOR VISUAL';
  auxiliaryStatus.textContent = auxiliaryEnabled
    ? 'Indicador visual activado en el panel; no proporciona auxilio funcional en el juego.'
    : 'Indicador visual desactivado; no proporciona auxilio funcional en el juego.';
});

gameLaunchButton.addEventListener('click', () => {
  if (!licenseAuthenticated) {
    gameLaunchStatus.textContent = 'Primero activa una licencia válida de KeyAuth.';
    return;
  }
  const game = selectedEdition === 'max'
    ? {
      packageName: 'com.dts.freefiremax',
      storeId: 'com.dts.freefiremax',
      appStoreId: '1480516829',
      name: 'Free Fire MAX'
    }
    : {
      packageName: 'com.dts.freefireth',
      storeId: 'com.dts.freefireth',
      appStoreId: '1300146617',
      name: 'Free Fire'
    };

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS) {
    gameLaunchStatus.textContent = 'Abriendo la ficha de ' + game.name + ' en App Store...';
    window.location.href = 'https://apps.apple.com/app/id' + game.appStoreId;
    return;
  }
  if (!/Android/i.test(navigator.userAgent)) {
    gameLaunchStatus.textContent = 'Para abrir Free Fire, usa un iPhone o iPad para App Store, o un dispositivo Android.';
    return;
  }

  const storeUrl = 'https://play.google.com/store/apps/details?id=' + game.storeId;
  const intentUrl = 'intent://#Intent;package=' + game.packageName +
    ';action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=' +
    encodeURIComponent(storeUrl) + ';end';

  gameLaunchStatus.textContent = 'Intentando abrir ' + game.name + '. Si no está instalado, se abrirá su ficha de Google Play.';
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
    nextSettings[name] = name === 'customCards'
      ? settings.customCards
      : String(formData.get(name) ?? '').trim();
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
    return true;
  } catch (error) {
    adminFeedback.textContent = error.message || 'No se pudieron guardar los cambios.';
    adminFeedback.classList.add('error');
    return false;
  }
}

document.getElementById('custom-card-create').addEventListener('click', async () => {
  const titleField = document.getElementById('new-card-title');
  const contentField = document.getElementById('new-card-content');
  const title = titleField.value.trim();
  const content = contentField.value.trim();
  const cards = getCustomCards();
  if (!title || !content) {
    customCardFeedback.textContent = 'Completa el título y el texto antes de crear la tarjeta.';
    customCardFeedback.classList.add('error');
    return;
  }
  if (cards.length >= 8) {
    customCardFeedback.textContent = 'El panel permite hasta 8 tarjetas personalizadas.';
    customCardFeedback.classList.add('error');
    return;
  }
  await saveCustomCards([...cards, { title, content }]);
  if (!customCardFeedback.classList.contains('error')) {
    titleField.value = '';
    contentField.value = '';
  }
});

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