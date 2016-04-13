'use strict'
// Dummy implementation of a storage
const uuidGenerator = require('../lib/uuid.js')

// TODO use database instead of a memory object
let recipeById = new Map();

function list() {
    let result = new Promise((resolve, reject) => {
        let recipes = Array.from(recipeById, elt => elt[1])

        resolve(recipes)
    })

    return result
}

// get the first unused uid
function getUuid() {
    let uid;
    
    do {
        uid = uuidGenerator.create()
    } while (recipeById.has(uid))

    return uid
}

function create(recipe) {
    let result = new Promise((resolve, reject) => {
        recipe.id = getUuid()
        recipe.createdAt = new Date()
        recipe.updatedAt = new Date()
        recipeById.set(recipe.id, recipe)
        resolve(recipe)
    })

    return result
}

function update(id, recipe) {
    let result = new Promise((resolve, reject) => {
        let old = recipeById.get(id || recipe.id)
        recipe.id = old.id
        recipe.createdAt = old.createdAt
        recipe.updatedAt = new Date()

        recipeById.set(recipe.id, recipe)
        resolve(recipe)
    })

    return result
}

function get(recipeId) {
    let result = new Promise((resolve, reject) => {
        if (recipeById.has(recipeId)) {
            resolve(recipeById.get(recipeId))
        } else {
            reject('Does not exist')
        }

    })

    return result
}

function remove(recipeId) {
    let result = new Promise((resolve, reject) => {
        recipeById.delete(recipeId)
        resolve(recipeId)
    })

    return result
}

module.exports = {
    list: list,
    create: create,
    get: get,
    update: update,
    remove: remove
}