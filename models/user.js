var sha256 = require('js-sha256');

 //NO RENDERING, JUST DRAFTING OF FUNCTIONS

 /**
  * ===========================================
  * Export model functions as a module
  * ===========================================
  */
 module.exports = (dbPoolInstance) => {
     const create = (user, callback) => {
       // run user input password through bcrypt to obtain hashed password

       var hashedValue = sha256(user.password);

       // set up query
     const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
       const values = [user.name,hashedValue];

       // execute query
       dbPoolInstance.query(queryString, values, (error, queryResult) => {
 @@ -30,3 +28,28 @@ module.exports = (dbPoolInstance) => {
       create
     };
 };

 module.exports = (dbPoolInstance) => {
     const newForm = (user, callback) => {

       // set up query
       const queryString = 'INSERT INTO user (name, password) VALUES ($1, $2)';
       const values = [user.name,hashedValue];

       // execute query
       dbPoolInstance.query(queryString, values, (error, queryResult) => {
         // invoke callback function with results after query has executed
         callback(error, queryResult);
       });
     };

     return {
       newForm
     };
 };


