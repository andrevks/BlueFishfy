const ICrud = require('./interfaces/interfaceCrud')

class Postgres extends ICrud{
    constructor(){
        super()
    }

    create(item){
        console.log("Item save in POSTGRES")
    }
}

module.exports = Postgres