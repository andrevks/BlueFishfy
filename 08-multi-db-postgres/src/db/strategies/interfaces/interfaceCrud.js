
class NotImplementedException extends Error {
    constructor(){
        super("Exception Not Implemented");
    }
}

class ICrud {

    create(item){
        throw new NotImplementedException()

    }
    read(query){
        throw new NotImplementedException()

    }
    update(id, item){
        throw new NotImplementedException()

    }
    delete(id){
        throw new NotImplementedException()
    }
    isConnected(){
        throw new NotImplementedException()
    }
}


//para reutilizar 
module.exports = ICrud