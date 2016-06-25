'use strict'

const http = require('http')
const routes = require('./routes.js')
const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'

let instance

const server = http.createServer((request, response) => {
    // const headers = request.headers;
    // const method = request.method;
    // const url = request.url;
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
        routes.route(request, body)
            .then((data) => ok(response, data))
            .catch((data) => fail(response))    
    });
})

const ok = (response, data) => {
    response.writeHead(200, {'Content-Type': 'application/json'})
    let json = JSON.stringify(data)
    response.end(json)
}

const fail = (response) => {
    response.statusCode = 404
    response.end(http.STATUS_CODES[404])
}

const start = () => {
    instance = server.listen(port)
    console.log(`start listening on port ${port}`)
}

const stop = () => instance.close()

module.exports = {
    url: `http://${host}:${port}`,
    host: host,
    port: port,
    start: start,
    stop: stop
}