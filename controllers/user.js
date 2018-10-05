const sha256 = require('js-sha256');
const SALT = "tweedr";

module.exports = (db) => {

  const newForm = (request, response) => {
    response.render('user/new', {cookies: request.cookies});
  }

  const create = (request, response) => {

    db.user.checkDuplicate(request.body, (error, queryResult) => {

      if (error) {
        console.error('error getting user:', error);
        response.sendStatus(500);
      }
      
      if (queryResult.rowCount >= 1) {
        console.log('Username already exists!');

        response.send("A user with this name already exists.");

      } else {
        
        db.user.create(request.body, (error, queryResult) => {
        
          if (error) {
            console.error('error getting user:', error);
            response.sendStatus(500);
          }
    
          if (queryResult.rowCount >= 1) {
            console.log('User created!');
    
            userid = queryResult.rows[0].id;
    
            response.cookie('loggedIn', sha256(userid + SALT));
            response.cookie('username', request.body.name);
          } else {
            console.log('User could not be created.');
          }
    
          // redirect to home page after creation
          response.redirect('/');
        })
      }
    })
  }

  return {
    newForm,
    create
  }
}
