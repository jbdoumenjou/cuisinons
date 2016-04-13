'use strict'
const url = require('url')
const routes = require('../src/routes')

describe('test routing of /recipes/rs8zajrlik9)', function () {
    let request = {
        //url: '/recipes/rs8zajrlik9',
        url: '/recipes',
        method: 'POST'
    }
    routes.getCrudAction(request, {title:'test'})
})

/*describe('url.parse(http://localhost:8080/recipe)', function () {

 const request = {
 url: 'http://localhost:8080/recipe/1',
 path: 'recipes/42',
 method: 'GET'
 }

 it('should work', function(){
 let result = url.parse('http://localhost:8080/recipe/1')
 console.log(result)
 })

 })*/