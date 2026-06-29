# Política de seguridad

## Versiones con soporte

Solo se da soporte de seguridad a la **última versión publicada** de VoCript.
VoCript se actualiza solo, así que mantén siempre la versión más reciente.

| Versión              | Soporte |
| -------------------- | ------- |
| Última (en Releases) | ✅      |
| Versiones anteriores | ❌      |

## Modelo de seguridad

VoCript está pensado para ser **privado por diseño** y exponer la mínima
superficie posible.

**Garantizado / mitigado:**

- **100 % local.** El reconocimiento (Whisper/Parakeet) corre en tu equipo. No
  hay cuentas, nube ni telemetría: tu audio y tus transcripciones no salen del
  ordenador.
- **Actualizaciones firmadas.** El auto-updater solo acepta paquetes firmados
  con la clave del proyecto (minisign); un update manipulado se rechaza.
- **Webview restringido.** CSP estricta (`default-src 'self'`): la interfaz no
  carga ni ejecuta código remoto, y sus conexiones salientes se limitan a IPC
  local.
- **Sin inyección de comandos.** El texto transcrito nunca se interpreta como
  un comando: al pegar con un script externo o con las utilidades del sistema,
  el texto se pasa como **argumento separado**, no a través de una shell. Un
  audio o archivo malicioso no puede ejecutar comandos.
- **Acceso a disco acotado.** El protocolo `asset:` (que permitía al webview
  leer archivos del equipo) está **deshabilitado** (desde v3.4.0): la interfaz
  no necesita acceso directo al sistema de archivos.
- **Claves API protegidas.** Las claves del post-procesado opcional se
  **ocultan en los registros** (redacted) y se guardan solo en local.

**Funciones opcionales que tú controlas (desactivadas por defecto):**

- **Post-procesado con IA en la nube:** si lo activas, el texto transcrito se
  envía al proveedor LLM que configures —tus datos salen del equipo—. Off por
  defecto.
- **Script de pegado externo:** ejecuta el programa que tú indiques, con el
  texto como argumento. Usa solo scripts de confianza.

**Uso seguro recomendado:**

- Descarga VoCript solo desde
  [Releases](https://github.com/Mun1to/Vocript/releases/latest) y mantén
  activadas las actualizaciones automáticas.
- Transcribe archivos de fuentes en las que confíes (el decodificado de
  audio/vídeo, como en cualquier app, procesa datos potencialmente no
  confiables).
- Si usas el post-procesado en la nube, revisa la política de privacidad del
  proveedor LLM que elijas.

## Cómo reportar una vulnerabilidad

VoCript funciona **100 % en local**: no envía tu audio ni tus transcripciones a
ningún servidor. Aun así, si descubres un fallo de seguridad, ayúdame a
arreglarlo de forma responsable:

- **No abras una _issue_ pública** ni lo publiques en redes hasta que esté
  corregido.
- Repórtalo en privado con el **aviso de seguridad de GitHub**: en el
  repositorio, pestaña **Security → _Report a vulnerability_**
  ([enlace directo](https://github.com/Mun1to/Vocript/security/advisories/new)).
- Incluye, si puedes: pasos para reproducirlo, la **versión de VoCript**, tu
  sistema operativo y el impacto que crees que tiene.

Intentaré confirmar la recepción lo antes posible, mantenerte al tanto del
avance y publicar el arreglo en una nueva versión. Gracias por la ayuda. 🙏

## Alcance

VoCript es un fork de [Handy](https://github.com/cjpais/Handy). Si el fallo está
en el motor de transcripción original (no en los cambios propios de VoCript),
también puede reportarse en el proyecto original.
