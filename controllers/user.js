var sha256 = require('js-sha256');

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
    response.render('user/NewUser');
  };

  const create = (request, response) => {
      // use user model method `create` to create new user entry in db
      db.user.create(request.body, (error, queryResult) => {
        // queryResult of creation is not useful to us, so we ignore it
        //console.log("queryResult",queryResult);
        //(console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)
        let hashCookie = sha256('true');

        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully',request.body.name);

          // drop cookies to indicate user's logged in status and username
          response.cookie('loggedIn', hashCookie);
          response.cookie('username', request.body.name);
        } else {
          console.log('User could not be created');
        }

          response.redirect('/');
      });
  };

  const logInForm = (request, response)=> {

    response.render('user/userLogin')
    //response.send('I am link to signin');
  }

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    logInForm
  };
};
