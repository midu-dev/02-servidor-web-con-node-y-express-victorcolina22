const fs = require('node:fs')
const express = require('express')

const app = express()
const desiredPort = process.env.PORT ?? 1234

// Ejercicio 2: crear servidor HTTP con Express
function startServer () {
  app.disable('x-powered-by')
  app.use(express.json())
  app.use(express.static('assets'))

  app.get('/', (req, res) => {
    res.send('<h1>¡Hola mundo!</h1>')
  })

  app.get('/logo.webp', (req, res) => {
    const img = fs.readFileSync('./assets/logo.webp')
    res.send(img)
  })

  app.post('/contacto', (req, res) => {
    const body = req.body
    res.status(201).json(body)
  })

  app.use((req, res) => {
    if (req.method !== 'GET') {
      res.status(405).send('<h1>405 Method Not Allowed</h1>')
    } else {
      res.status(404).send('<h1>404</h1>')
    }
  })

  app.listen(desiredPort, () => {
    console.log(`Server running on port ${desiredPort}`)
  })

  return app
}

module.exports = {
  startServer
}
