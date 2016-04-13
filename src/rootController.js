'use strict'

function list() {
    let result = new Promise((resolve, reject) => {
        resolve()
    })

    return result
}

module.exports = {
    list: list
}