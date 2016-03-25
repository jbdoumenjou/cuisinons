'use strict'

const routes = {
  "get /recipe" : () => "get recipe"
}

function route(request, response) {
  let result = new Promise( (resolve, reject) => {
    const requestedRoute = request.method.toLowerCase() + ' ' + request.url
    const action = routes[requestedRoute]

    if (!!action) {
      resolve('test')
    } else {
      reject()
    }
  })
  
  return result
}
module.exports  = {
  route: route
}