'use strict'

const http = require('http')
const expect = require('chai').expect
const server = require('../src/server.js')
const recipeController = require('../src/recipesController')
const fixture = require('./fixtures')

function getPostOption() {
    return {
        host: server.host,
        port: server.port,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

function checkRecipe(expected, actual) {
    expect(actual.title).to.deep.equal(expected.title)
    expect(actual.description).to.deep.equal(expected.description)
    expect(actual.language).to.deep.equal(expected.language)
    expect(actual.ingredients).to.deep.equal(expected.ingredients)
    expect(actual.steps).to.deep.equal(expected.steps)
    expect(actual.createdAt).to.exist
    expect(actual.updatedAt).to.exist
    expect(actual.id).to.exist
}

describe('GET /recipes', function () {
    before(() => server.start())
    after(() => server.stop())

    it('should return status code 200', function (done) {
        const url = server.url + "/recipes"
        http.get(url, (res) => {
            expect(res.statusCode).to.be.equal(200)
            done()
        })
    })

    it('should return empty list where there is no recipe', function (done) {
        const url = server.url + "/recipes"
        http.get(url, (res) => {
            let body = []

            res.on('error', function (err) {
                console.error(err);
            }).on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function () {
                body = Buffer.concat(body).toString();
                body = JSON.parse(body)
                expect(body).to.be.instanceof(Array);
                expect(body).to.be.empty
                done()
            });


        })
    })

    it('should return an array of recipes', function (done) {
        const testRecipe = fixture[0]
        recipeController.create(testRecipe)

        const url = server.url + "/recipes"
        http.get(url, (res) => {
            let body = []

            res.on('error', function (err) {
                console.error(err);
            }).on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function () {
                body = Buffer.concat(body).toString()
                body = JSON.parse(body)
                expect(body).to.be.instanceof(Array)
                checkRecipe(testRecipe, body[0])

                done()
            });
        })
    })

})

describe('GET /recipes/:id', function () {
    before(() => server.start())
    after(() => server.stop())

    it('should return status code 200', function (done) {
        let recipePromise = recipeController.create({title: 'myRecipe'})
        let postOption = getPostOption()

        recipePromise.then((recipe)=> {
            postOption.path = '/recipes/' + recipe.id
            postOption.method = 'GET'
            delete postOption.headers

            const request = http.request(postOption, (res) => {
                expect(res.statusCode).to.be.equal(200)
                done()
            })

            request.end()
        })
    })

    it('should return the right recipe', function (done) {
        let recipePromise = recipeController.create({title: 'myRecipe'})

        recipePromise.then((recipe)=> {
            let postOption = getPostOption()
            postOption.path = '/recipes/' + recipe.id
            postOption.method = 'GET'
            delete postOption.headers

            const request = http.request(postOption, (res) => {
                let body = []

                res.on('error', function (err) {
                    console.error(err);
                }).on('data', function (chunk) {
                    body.push(chunk);
                }).on('end', function () {
                    body = Buffer.concat(body).toString()
                    body = JSON.parse(body)
                    checkRecipe(recipe, body)
                    done()
                });
            })

            request.end()
        })
    })
})

describe('POST /recipes', function () {
    before(() => server.start())
    after(() => server.stop())

    it('should return status code 200', function (done) {
        const recipe = fixture[0]
        const data = JSON.stringify(recipe)
        let postOption = getPostOption()
        postOption.path = '/recipes'
        postOption.headers['Content-Length'] = Buffer.byteLength(data)

        const request = http.request(postOption, (res) => {
            expect(res.statusCode).to.be.equal(200)
            done()
        })

        request.write(data)
        request.end()
    })

    it('should return the created recipe', function (done) {
        const recipe = fixture[0]
        const data = JSON.stringify(recipe)
        let postOption = getPostOption()
        postOption.path = '/recipes'
        postOption.headers['Content-Length'] = Buffer.byteLength(data)

        const request = http.request(postOption, (res) => {
            let body = []

            res.on('error', function (err) {
                console.error(err);
            }).on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function () {
                body = Buffer.concat(body).toString()
                body = JSON.parse(body)
                checkRecipe(recipe, body)
                done()
            });
        })

        request.write(data)
        request.end()
    })

})

describe('DELETE /recipes/:id', function () {
    before(() => server.start())
    after(() => server.stop())

    it('should return status code 200', function (done) {
        let recipePromise = recipeController.create({title: 'myRecipe'})

        recipePromise.then((recipe)=> {
            let postOption = getPostOption()
            postOption.path = '/recipes/' + recipe.id
            postOption.method = 'DELETE'
            delete postOption.headers

            const request = http.request(postOption, (res) => {
                expect(res.statusCode).to.be.equal(200)
                done()
            })

            request.end()
        })
    })

    it('should return the deleted recipe id', function (done) {
        let recipePromise = recipeController.create({title: 'myRecipe'})

        recipePromise.then((recipe)=> {
            let postOption = getPostOption()
            postOption.path = '/recipes/' + recipe.id
            postOption.method = 'DELETE'
            delete postOption.headers

            const request = http.request(postOption, (res) => {
                let body = []

                res.on('error', function (err) {
                    console.error(err);
                }).on('data', function (chunk) {
                    body.push(chunk);
                }).on('end', function () {
                    body = Buffer.concat(body).toString()
                    body = JSON.parse(body)
                    expect(body).to.be.equal(recipe.id)
                    done()
                });
            })

            request.end()
        })
    })

})

