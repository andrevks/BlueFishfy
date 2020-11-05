//validate the variables and objets
const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')
const { create } = require('domain')

const context = new Context( new Postgres())
const MOCK_HEROI_Cadastrar = {
  nome:'Black Eagle',
  poder: 'Arrow'
}

describe(' Postgres Strategy', function(){
  //When working with database it can take a huge 
  //amout of time to load, so the db can "take the
  //time it needs" to validate the options
  this.timeout(Infinity)
  this.beforeAll( async function(){
    await context.connect()
  })
  it("PostgresSQL Connection", async function(){
    const result = await context.isConnected()
    //The result should be true
    assert.equal(result, true)
  })
  it.only("Register", async function(){
    const result = await context.create(MOCK_HEROI_Cadastrar)
    //deepEqual = Exactly equal
    console.log(result)
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_Cadastrar)
  })
})

