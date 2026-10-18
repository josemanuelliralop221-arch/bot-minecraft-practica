# Bot de Minecraft (no premium) — Práctica

Bot hecho con [Mineflayer](https://github.com/PrismarineJS/mineflayer) que entra a un servidor
con `online-mode=false`, detecta la versión automáticamente, hace login en AuthMe y responde comandos.

## Requisitos
- Node.js 20 LTS o más reciente
- Un servidor de Minecraft con `online-mode=false` en `server.properties`
  (idealmente uno tuyo, o con permiso del administrador)

## Instalación
```bash
git clone https://github.com/TU_USUARIO/bot-minecraft-practica.git
cd bot-minecraft-practica
npm install
```

## Ejecutar
```bash
# Linux / Mac / Codespaces
MC_HOST=mi.servidor.com MC_PORT=25565 MC_USER=BotPractica npm start

# Windows (PowerShell)
$env:MC_HOST="mi.servidor.com"; $env:MC_USER="BotPractica"; npm start
```

| Variable     | Para qué sirve                                   | Default        |
|--------------|--------------------------------------------------|----------------|
| `MC_HOST`    | IP o dominio del servidor                        | `localhost`    |
| `MC_PORT`    | Puerto                                           | `25565`        |
| `MC_USER`    | Nombre del bot                                   | `BotPractica`  |
| `MC_VERSION` | Forzar versión (ej. `1.20.1`). Vacío = automático | automático     |
| `MC_PASS`    | Contraseña para AuthMe                           | `cambia_esto123` |

## Comandos en el chat
`!hola` · `!ven` (te sigue) · `!para` · `!pos` · `!salta` · `!vida`

## Versiones
Mineflayer soporta desde la 1.8 hasta versiones recientes (revisa su README para la lista exacta).
Si el servidor usa una versión que la librería aún no soporta, instala **ViaVersion/ViaBackwards**
en el servidor o usa **ViaProxy** como puente y fija `MC_VERSION` a una versión soportada.

## Ejecutar desde GitHub Actions
1. **Settings → Secrets and variables → Actions → New repository secret**: crea `MC_PASS` con la contraseña de AuthMe del bot.
2. Pestaña **Actions → Ejecutar bot de Minecraft → Run workflow**, escribe la IP del servidor y dale **Run**.
3. El bot corre hasta ~6 horas por ejecución. Para detenerlo: abre la ejecución y pulsa **Cancel workflow**.
