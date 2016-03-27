'use strict'

const recipeStore = require('./recipesStore')
const url = require('url')

const routes = {
    "get /recipes": recipeStore.list,
    "get /recipes/{id}": recipeStore.get,
    "post /recipes": recipeStore.create,
    "udpate /recipes/{id}": recipeStore.update,
    "delete /recipes/{id}": recipeStore.remove
}

function newRoute(request, body) {
    const method = request.method;
    const path = request.url

    let result = new Promise((resolve, reject) => {

        const parts = path.split('/')
        const resource = parts[1]
        let requestedRoute
        let param

        if (parts.length == 3) {
            param = parts[2]
            requestedRoute = method.toLowerCase() + ' /' + resource + '/{id}'
        } else {
            requestedRoute = method.toLowerCase() + ' ' + path
        }
        const action = routes[requestedRoute]
        if (!!action) {
            if (body.length > 0 || !param) {
                resolve(action(body))
            } else {
                resolve(action(param))
            }
        } else {
            reject()
        }
    })

    return result
}

function route(requestedRoute, body) {
    const result = new Promise((resolve, reject) => {
        const action = routes[requestedRoute]
        if (!!action) {
            resolve(action(body))
        } else {
            reject()
        }
    })

    return result
}
module.exports = {
    route: newRoute
}