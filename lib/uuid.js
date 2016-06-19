'use strict'

// basic random id on 7 digits
const create =() => {
    return Math.random().toString(36).substring(7);
}

module.exports = {
    create: create
}