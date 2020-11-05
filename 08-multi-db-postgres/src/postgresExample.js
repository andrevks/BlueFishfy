//npm install sequelize pg-hstore pg
const Sequelize = require('sequelize')
const driver = new Sequelize(
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

driver.authenticate().then(() =>{
    console.log("Success !")    
    main()

}).catch((err) =>{
    console.log(">>>>>>",err)
})

async function main() {
    const Herois = driver.define('heros', {
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
        },
    },
    {
        //Setting up the configuration for the existing DB
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false,
    })
    await Herois.sync()

    //await Herois.create({
        //nome: 'Green Light',
        //poder: 'Ring'
    //})
    await Herois.findAll( { 
        raw: true,
        attributes: ['nome']
    
    
    })
    .then( (result) => {
        console.log("RESULT: ",result)
    }).catch((err) =>{
        console.log(err)
    })
}
