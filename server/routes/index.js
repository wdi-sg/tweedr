const { Users, Tweeds } = require("../controllers");
const {  checkToken } = require("../authentications");

//use checkToken to auth users at secure endpoints

module.exports = app => {
  app.post("/users/new", Users.createNew);
  app.post("/login", Users.login);

  app.get("/", Tweeds.listAll);
  app.get("/users/:id/tweeds",checkToken,Tweeds.listAllFromOneUser) 


  app.post("/tweeds/new", checkToken,Tweeds.createNew)
  
};
