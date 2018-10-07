var sha256 = require("js-sha256");

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
        // (console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)

        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully');
          console.log("CONTROLLER: ", request.session)
          // drop cookies to indicate user's logged in status and username
          response.cookie('logged_in', sha256(request.sessionID));
          response.cookie('username', sha256(request.body.name));
        } else {
          console.log('User could not be created');
        }

        // redirect to home page after creation
        response.redirect('/');
      });
  };

  const loginForm = (request, response) => {
    response.render('user/LoginUser');
  };

  const loggedIn = (request, response) => {
    db.user.loggedIn(request.body, (error, queryResult) => {
      if (error) {
        console.error('error logging in user:', error);
        response.sendStatus(500);
      }
      let passwordHash = sha256(request.body.password);
      // console.log("CONTROLLER QUERY: ", queryResult.rows[0]);
      // console.log("CONTROLLER REQUEST: ", request.body)
      console.log(request.sessionID);
      if (queryResult.rows[0] !== undefined && passwordHash === queryResult.rows[0].password){
        response.cookie('logged_in', sha256(request.sessionID));
        response.cookie('username', sha256(request.body.name));
        response.cookie('user_id', queryResult.rows[0].id);
        response.redirect('/');
      } else {
          response.redirect('/users/login');
      }
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    loginForm,
    loggedIn
  };
};
