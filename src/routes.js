'use strict'

const recipesController = require('./recipesController')
const rootController = require('./rootController')

const availableResources = {
    '': rootController,
    'recipes': recipesController
}

// basic path parsing
const getResourceInfo = (path) => {
    let parts = path.split('/')
    if (parts[0].length === 0) {
        parts.shift()
    }

    let resource = parts[0]
    let id = null

    if (parts[1]) {
        id = parts[1]
    }

    return {resource: resource, id: id}
}

/*
 get /resources              => list
 get /resources/:id          => get a specific resource
 post /resources             => create a resource
 patch/put /resources/:id    => update a resource
 delete /resources/:id       => delete a resource
 */
const route = (request, body) => {
    const method = request.method.toLowerCase()
    const path = request.url

    const result = new Promise((resolve, reject) => {
        let resourceInfo = getResourceInfo(path)
        let controller = availableResources[resourceInfo.resource]
        if (controller) {
            let id = resourceInfo.id
            let controllerPromise = null

            // get /resources => list resources
            if (method === 'get' && !id) {
                controllerPromise = controller.list()
            }

            // get /resources/:id => get resources with id
            if (method === 'get' && id) {
                controllerPromise = controller.get(id)
            }

            // post /resources/ => create a resource
            if (method === 'post' && !id) {
                controllerPromise = controller.create(body)
            }

            // put /resources/:id => edit a specific resource
            if (method === 'put' && id) {
                controllerPromise = controller.update(id, body)
            }

            // delete /resources/:id => delete a specific resource
            if (method === 'delete' && id) {
                controllerPromise = controller.remove(id)
            }

            if (!controllerPromise) {
                reject()
            }
            resolve(controllerPromise)
        } else {
            reject()
        }
    })

    return result
}

module.exports = {
    route: route
}