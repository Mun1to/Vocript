# Sesión 01 — Entorno + Fases 1-4

**Fecha:** 2026-06-01
**Modelo usado:** Sonnet 4.6 (mayor parte) → Opus 4.8 (estructura final)

---

## Objetivo

Arrancar el desarrollo de MuVox: clonar Handy, montar el entorno de compilación en
Windows y aplicar las 4 personalizaciones principales (nombre, color, audio, idioma).

---

## Qué se hizo

### Fase 0 — Entorno ✅

- Clonado el repo de Handy en `C:\proyectos\MuVox\handy-src`.
- Instalado **Bun** v1.3.14 y dependencias (`bun install`, 262 paquetes).
- Descubierta y montada la cadena completa de prerequisitos para compilar
  whisper.cpp en Windows: **VS Build Tools 2022 → LLVM → Vulkan SDK → CMake → Ninja**.
- Detalle completo y troubleshooting en [../docs/ENTORNO.md](../docs/ENTORNO.md).
- `cargo check` finaliza sin errores. `bun tauri dev` arranca la app correctamente.

### Fase 1 — Identidad (renombrar a MuVox) ✅

Cambiados todos los "Handy"/"handy" visibles a "MuVox"/"muvox":
- `package.json` (name), `index.html` (title), `tauri.conf.json` (productName,
  identifier `com.muvox.app`), `Cargo.toml` (name, lib name `muvox_app_lib`).
- Código Rust: `main.rs`, `cli.rs`, `lib.rs`, `tray.rs`, `actions.rs`,
  `portable.rs`, `managers/history.rs`.
- Instalador: `nsis/installer.nsi` ("MuVox Portable Mode").
- Logo: `src/components/icons/HandyTextLogo.tsx` reescrito como SVG de texto "MuVox"
  (antes eran paths SVG que dibujaban "handy").
- Eliminado el `signCommand` de Azure del autor original (bloqueaba el build).

### Fase 2 — Visual (rosa → azul) ✅

- `src/App.css`: variables CSS de rosa a azul, en temas claro y oscuro
  (`--color-background-ui` #da5893 → **#2563eb**; logo-primary y logo-stroke
  a tonos azules `#93c5fd` / `#60a5fa` / `#1e3a5f` / `#bfdbfe`).
- `src/overlay/RecordingOverlay.css`: barras de audio (#ffe5ee → #dbeafe) y
  hover del botón cancelar (#faa2ca33 → #93c5fd33).

### Fase 3 — Audio VAD ✅

`src-tauri/src/managers/audio.rs`, función `create_audio_recorder()`:
- threshold Silero `0.3 → 0.2` (detecta voz más suave / consonantes iniciales).
- onset_frames `2 → 1` (activa en 30 ms en vez de 60 ms).
- prefill_frames `15 → 20` (pre-buffer de 600 ms en vez de 450 ms).

El pre-buffer circular ya existía en `SmoothedVad` (vad/smoothed.rs); el problema
era que el VAD activaba tarde. Estos ajustes lo hacen más reactivo al inicio.

### Fase 4 — Español por defecto ✅

`src-tauri/src/settings.rs`: idioma por defecto `"auto" → "es"` (líneas ~460 y ~782).

### Estructura del proyecto (al final, con Opus)

Montada la documentación por sesiones: `README.md`, `docs/ENTORNO.md`,
`docs/ACTUALIZACIONES.md`, `sesiones/`. Eliminado el antiguo `CONTINUAR_SESION.md`.

---

## Decisiones importantes

- **`CARGO_TARGET_DIR=C:\ct`**: solución al límite MAX_PATH de Windows que rompía
  la compilación de whisper.cpp. Variable de entorno permanente.
- **`CMAKE_GENERATOR=Ninja`**: evita un bug de MSBuild compilando shaders de Vulkan
  en paralelo.
- **Auto-updater desactivado** (`endpoints: []`): MuVox no se actualiza solo;
  las mejoras de Handy se cogerán a mano. Ver [../docs/ACTUALIZACIONES.md](../docs/ACTUALIZACIONES.md).
- **Verificación visual**: la app arranca mostrando "MuVox" en la barra de título,
  UI en español y colores azules. El logo de texto se cambió a "MuVox".

---

## Problemas encontrados y resueltos

Cadena de errores de compilación, todos resueltos (detalle en docs/ENTORNO.md):
libclang faltante → Vulkan SDK faltante → CMake faltante → rutas largas (MAX_PATH)
→ bug de MSBuild en paralelo. Cada uno requirió instalar/configurar una pieza del
toolchain. Ninguno fue causado por cambios de MuVox; son prerequisitos de Handy.

---

## Estado al cerrar

- Fases 0-4 **completadas**. El código compila y la app corre en modo dev.
- Pendiente menor: reemplazar los **iconos PNG de bandeja** del sistema
  (`src-tauri/resources/handy.png`, `recording.png`, `transcribing.png`,
  `tray_*.png`) por versiones azules de MuVox — requiere editor gráfico.

## Próximo paso

1. `bun tauri build` → generar instalador MSI (en `C:\ct\release\bundle\msi\`).
2. Instalar MuVox y anclarlo a la barra de tareas.
3. Descargar el modelo Whisper Turbo desde la UI de la app (~800 MB).
4. Probar dictado real y validar las mejoras de VAD en español.
