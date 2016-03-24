'use strict'

const http = require('http')
const expect = require('chai').expect
const server = require('../src/server.js')

describe('Get /recipe', function() {
    before(() => server.start())
    after(() => server.stop())

    it('should return status code 200', function (done) {
        const url = server.url + "/recipe"
        http.get(url, (res) => {
            expect(res.statusCode).to.equal(200)
            done()
        })
    })
    
})

