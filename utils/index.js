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

module.exports = {
  methodNotAllowed,
  notFoud
}
