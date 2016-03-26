'use strict'

const recipeStore = require('./recipesStore')
const routes = {
    "get /recipes": recipeStore.list
}

function route(request, response) {
    let result = new Promise((resolve, reject) => {
        const requestedRoute = request.method.toLowerCase() + ' ' + request.url
        const action = routes[requestedRoute]

        if (!!action) {
            resolve(action())
        } else {
            reject()
        }
    })

    return result
}
module.exports = {
    route: route
}