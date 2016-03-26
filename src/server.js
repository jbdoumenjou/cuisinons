'use strict'

const http = require('http')
const routes = require('./routes.js')
const port = 8080

let instance

const server = http.createServer((request, response) => {
    routes.route(request, response)
        .then((data) => ok(response, data))
        .catch((data) => fail(response))
})

function ok(response, data) {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end(data)
}

function fail(response) {
    response.statusCode = 404
    response.end(http.STATUS_CODES[404])
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