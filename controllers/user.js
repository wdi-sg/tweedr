module.exports = db => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
    response.render('user/NewUser');
  };

  const loginForm = (request, response) => {
    response.render('user/Login');
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
        response.cookie('loggedIn', db.user.encrypt(request.body.name));
      } else {
        console.log('User could not be created');
      }

      // redirect to home page after creation
      response.redirect('/');
    });
  };

  const login = (request, response) => {
    db.user.login(request.body, (error, queryResult) => {
      if (error) {
        console.error('error getting user:', error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        const dbUsername = queryResult.rows[0].username;
        const dbHashedPassword = queryResult.rows[0].password;
        const enteredPassword = db.user.encrypt(request.body.password);

        if (dbHashedPassword === enteredPassword) {
          let sessionCookie = db.user.encrypt(dbUsername);
          response.cookie('logged_in', sessionCookie);
          response.send(`${dbUsername} logged in.`);
        }
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
    login
  };
};
