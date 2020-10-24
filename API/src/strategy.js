//class NotImplementedException extends Error {
    //constructor(){
        //super("Not Implemented Exception");
    //}
//}

//class ICrud {
    //create(item){
        //throw new NotImplementedException()

    //}
    //read(query){
        //throw new NotImplementedException()

    //}
    //update(id, item){
        //throw new NotImplementedException()

    //}
    //delete(id){
        //throw new NotImplementedException()
    //}
//}

//class MongoDB extends ICrud{
    //constructor(){
        //super()
    //}

    //create(item){
        //console.log("Item saved in MONGODB")
    //}
//}

//class Postgres extends ICrud{
    //constructor(){
        //super()
    //}

    //create(item){
        //console.log("Item save in POSTGRES")
    //}
//}

//class ContextStrategy  {
    //constructor(strategy){
        //this.__database = strategy
    //}

    //create(item){
       //return this.__database.create(item)
    //}
    //read(item){
        //return this.__database.read(item)
    //}
    //update(id, item){
        //return this.__database.update(id, item)
    //}
    //delete(id){
        //return this.__database.delete(id)
    //}
//}

const contextMongo = new ContextStrategy( new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy( new Postgres())
contextPostgres.create()