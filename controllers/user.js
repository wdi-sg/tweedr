var sha256 = require('js-sha256');

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

   const login = (request, response) => {
    response.render('user/login');
};

  const newForm = (request, response) => {
    response.render('user/NewUser');
  };

  const create = (request, response) => {
      // use user model method `create` to create new user entry in db
      db.user.create(request.body, (error, queryResult) => {
        // queryResult of creation is not useful to us, so we ignore it
        // (console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)

        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully');

          // drop cookies to indicate user's logged in status and username
          // response.cookie('loggedIn', true);
          // response.cookie('username', request.body.name);
        } else {
          console.log('User could not be created');
        }

        // redirect to home page after creation
        response.send('You are logged in');
      });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    login,
    newForm,
    create
  };
};
