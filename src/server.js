'use strict'

const http = require('http')
const routes = require('./routes.js')
const port = 8080

let instance

const server = http.createServer((request, response) => {
    const headers = request.headers;
    const method = request.method;
    const url = request.url;
    let body = [];

    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        if (body.length > 0) {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body)
        }
        const requestedRoute = method.toLowerCase() + ' ' + url
        routes.route(request, body)
            .then((data) => ok(response, data))
            .catch((data) => fail(response))    
    });

    
})

function ok(response, data) {
    response.writeHead(200, {'Content-Type': 'application/json'})
    let json = JSON.stringify(data)
    response.end(json)
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
    host: 'localhost',
    port: port,
    start: start,
    stop: stop
}