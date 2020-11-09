//validate the variables and objets
const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')
const { create } = require('domain')

const context = new Context( new Postgres())
const MOCK_HEROI_Cadastrar = {
  nome:'Black Eagle',
  poder: 'flexas'
}

const MOCK_HEROI_Atualizar = {
  nome:'Hulk',
  poder: 'Super Strong'
}
describe(' Postgres Strategy', function(){
  //When working with database it can take a huge 
  //amout of time to load, so the db can "take the
  //time it needs" to validate the options
  this.timeout(Infinity)
  this.beforeAll( async function(){
    await context.connect()
    await context.delete()
    await context.create(MOCK_HEROI_Atualizar)
  })
  it("PostgresSQL Connection", async function(){
    const result = await context.isConnected()
    //The result should be true
    assert.equal(result, true) 
  })
  it("Register", async function(){
    const result = await context.create(MOCK_HEROI_Cadastrar)
    //deepEqual = Exactly equal
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_Cadastrar)
  })
  it("List", async function(){
    const [ result ] = await context.read({ nome: MOCK_HEROI_Cadastrar.nome})
    //const zeroPosition = result[6]
    //delete zeroPosition.id
    //const [ posicao1, posicao2 ] = ['esse é o 1', 'esse é o 2']
    delete result.id 
    assert.deepEqual(result, MOCK_HEROI_Cadastrar)
  })
  it('Update', async function(){
    const [ itemAtualizar ] = await context.read({nome: MOCK_HEROI_Atualizar.nome})
    const novoItem = {
      ...MOCK_HEROI_Atualizar,
      nome: "Homelander"
    }
    const [ result ]  = await context.update(itemAtualizar.id, novoItem)
    const [ itemAtualizado ]  = await context.read({id: itemAtualizar.id})
    assert.deepEqual(result, 1) 
    assert.deepEqual(itemAtualizado.nome, novoItem.nome)
  })
  it("Delete by id", async function(){
    const [ item ] = await context.read({})
    const result = await context.delete(item.id)
    assert.deepEqual(result, 1)
  })
})

