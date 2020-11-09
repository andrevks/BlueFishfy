/* 
  File to initiate authenticated database and user
*/
db.createUser({
  user: "admin",
  pwd: "senhaadmin",
  roles: [
    {role: "readWrite", db:"heros"}
  ]
})

db = new Mongo().getDb("heros");

