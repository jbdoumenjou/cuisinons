'use strict'

const recipeStore = require('./recipesStore')
const routes = {
    "get /recipes": recipeStore.list,
    "post /recipes": recipeStore.create
}

function route(requestedRoute, body) {
    let result = new Promise((resolve, reject) => {
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
    route: route
}