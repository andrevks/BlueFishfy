//npm i hapi

const Hapi = require('hapi')
const app = new Hapi.Server({
  port:5000
})


async function main(){
  const context = new Context(new Postgres())
  context.connect()

  app.route([{
    path: '/herois',
    method: 'GET',
    handler: (request, headers)  =>{
      return context.read()
    }

  }])
}
main()