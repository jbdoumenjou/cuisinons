'use strict'

const http = require('http')
const routes = require('./routes.js')
const port = 8080

let instance

const server = http.createServer((req, res) => {
    const requestedRoute = req.method.toLowerCase() + ' ' + req.url
    const action = routes[requestedRoute]

    if (!!action) {
        ok(res, action)
    } else {
        fail(res)
    }
})

function ok(response, action) {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    const message = action()
    response.end(message)
}

function fail(response) {
    response.statusCode = 404
    response.end("Not found")
}

function start() {
    instance = server.listen(port)
}

function stop() {
    instance.close()
}

module.exports = {
    url: 'http://localhost:' + port,
    port: port,
    start: start,
    stop: stop
}