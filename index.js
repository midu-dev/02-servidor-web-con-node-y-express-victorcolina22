const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

// Ejercicio 1: crear servidor HTTP con Node
function startServer () {
  const processingRequests = (req, res) => {
    const { method, url } = req

    switch (method) {
      case 'GET': {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')

        switch (url) {
          case '/': {
            res.end('<h1>¡Hola mundo!</h1>')
            break
          }
          case '/logo.webp': {
            const img = fs.readFileSync('./assets/logo.webp')
            res.setHeader('Content-Type', 'image/webp')
            res.end(img)
            break
          }
          case '/404': {
            notFoud(res)
            break
          }

          default:
            notFoud(res)
        }

        break
      }
      case 'POST': {
        switch (url) {
          case '/contacto': {
            let body = ''

            req.on('data', chunk => {
              body += chunk.toString()
            })

            req.on('end', () => {
              const data = JSON.parse(body)
              res.setHeader('Content-Type', 'application/json; charset=utf-8')
              res.statusCode = 201
              res.end(JSON.stringify(data))
            })

            break
          }

          default:
            methodNotAllowed(res)
        }

        break
      }

      default:
        methodNotAllowed(res)
    }
  }

  function notFoud (response) {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.statusCode = 404
    response.end('<h1>404</h1>')
  }

  function methodNotAllowed (response) {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.statusCode = 405
    response.end('<h1>405 Method Not Allowed</h1>')
  }

  const server = http.createServer(processingRequests)

  server.listen(desiredPort, () => {
    console.log(`Server running on port ${desiredPort}`)
  })

  return server
}

module.exports = {
  startServer
}
