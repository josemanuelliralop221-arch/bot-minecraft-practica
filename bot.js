// Bot de Minecraft para servidores no premium (online-mode=false)
// Librería: Mineflayer  ->  https://github.com/PrismarineJS/mineflayer

const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals: { GoalFollow } } = require('mineflayer-pathfinder')

// ---------- Configuración (se puede cambiar con variables de entorno) ----------
const config = {
  host: process.env.MC_HOST || 'localhost',
  port: parseInt(process.env.MC_PORT || '25565', 10),
  username: process.env.MC_USER || 'BotPractica',
  // false = detecta automáticamente la versión del servidor
  version: process.env.MC_VERSION || false,
  // Contraseña para servidores con AuthMe (/register y /login)
  password: process.env.MC_PASS || 'cambia_esto123'
}

function crearBot () {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    auth: 'offline', // modo no premium: no usa cuenta de Microsoft
    version: config.version
  })

  bot.loadPlugin(pathfinder)
  let autenticado = false

  // ---------- Al entrar al mundo ----------
  bot.once('spawn', () => {
    console.log(`✅ Conectado como ${bot.username} | versión ${bot.version}`)
    bot.pathfinder.setMovements(new Movements(bot))
  })

  // ---------- Log de todo el chat + login automático (AuthMe) ----------
  bot.on('messagestr', (mensaje) => {
    console.log('[chat]', mensaje)
    if (autenticado) return
    const m = mensaje.toLowerCase()
    if (m.includes('/register')) {
      bot.chat(`/register ${config.password} ${config.password}`)
      autenticado = true
    } else if (m.includes('/login')) {
      bot.chat(`/login ${config.password}`)
      autenticado = true
    }
  })

  // ---------- Comandos por chat ----------
  bot.on('chat', (usuario, mensaje) => {
    if (usuario === bot.username) return

    switch (mensaje.trim().toLowerCase()) {
      case '!hola':
        bot.chat(`¡Hola ${usuario}! Soy un bot de práctica 🤖`)
        break

      case '!ven': {
        const jugador = bot.players[usuario]?.entity
        if (!jugador) return bot.chat('No te veo, acércate un poco.')
        bot.pathfinder.setGoal(new GoalFollow(jugador, 2), true)
        bot.chat('Te sigo.')
        break
      }

      case '!para':
        bot.pathfinder.setGoal(null)
        bot.chat('Me detengo.')
        break

      case '!pos': {
        const p = bot.entity.position
        bot.chat(`Estoy en X:${p.x.toFixed(0)} Y:${p.y.toFixed(0)} Z:${p.z.toFixed(0)}`)
        break
      }

      case '!salta':
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 500)
        break

      case '!vida':
        bot.chat(`Vida: ${bot.health.toFixed(0)}/20 | Comida: ${bot.food}/20`)
        break
    }
  })

  // ---------- Errores y reconexión ----------
  bot.on('kicked', (razon) => console.log('❌ Expulsado:', razon))
  bot.on('error', (err) => console.log('⚠️ Error:', err.message))
  bot.on('end', (razon) => {
    console.log(`🔌 Desconectado (${razon}). Reintentando en 5 s...`)
    setTimeout(crearBot, 5000)
  })
}

crearBot()
