'use strict'

const http = require('http')
const expect = require('chai').expect
const server = require('../src/server.js')

describe('GET /recipes', function() {
    before(() => server.start())
    after(() => server.stop())

    it('should return status code 200', function (done) {
        const url = server.url + "/recipes"
        http.get(url, (res) => {
            expect(res.statusCode).to.be.equal(200)
            done()
        })
    })
    
})

