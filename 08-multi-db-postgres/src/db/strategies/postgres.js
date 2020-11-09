const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')


class Postgres extends ICrud{
    constructor(){
        super()
        this._driver = null
        this._herois = null

    }
    async isConnected(){
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log("FAIL! ",error)
            return false;
        }
        
    }
    async create(item){
       const {
           dataValues
       } = await this._herois.create(item)
       return dataValues
    }
    read(item = {}){
        return this._herois.findAll({
            raw: true,
            //attributes: ['nome']
            where: item
        })
    }
    async update(id, item){
       return await this._herois.update(item, { where: {id:id} })

    }
    async delete(id){
        const query = id? { id }: {}
        return await this._herois.destroy({where: query})
    }
    async defineModel(){
        this._herois = this._driver.define('herois', {
            
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement:true,
            },
            nome: {
                type: Sequelize.STRING,
                required: true,
            },
            poder: {
                type: Sequelize.STRING,
                required:true,
            },
        },
        {
            //Setting up the configuration for the existing DB
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false,
        })
        await this._herois.sync()
    }
    async connect(){

        this._driver = new Sequelize(
            'Heros',
            'andre',
            'admin',
            {
                host: 'localhost', // It's inside docker and 
                port: '5440',
                dialect: 'postgres',                  //the docker is always exposed to the localhost in my computer
                quoteIdentifiers: false,
                operatorAliases: false,
            }
        )
        //Connect has to wait the defineModel
        //be executed
        await this.defineModel()
    }
}

module.exports = Postgres