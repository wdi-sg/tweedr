
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
      //REQUEST.BODY RETURNS AN OBJECT
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
          response.cookie('loggedIn', true);
          response.cookie('username', request.body.name);
        } else {
          console.log('User could not be created');
        }

        // redirect to home page after creation
        response.redirect('/');
      });
  };


  const loginForm = (request, response) => {
    response.render('user/login');
  };


  const login = (request,response) => {
    db.user.login(request.body, (error, queryResult) => {
        // console.log(queryResult.rows);
        if (error) {
          console.error('error logging in:', error);
          response.sendStatus(500);
        } else if (queryResult.rowCount >= 1) {
            const dbId = queryResult.rows[0].id;
            const dbUsername = queryResult.rows[0].name;
            const dbHashedPassword = queryResult.rows[0].password;
            const enteredPassword = db.user.encrypt(request.body.password);

            if (dbHashedPassword === enteredPassword) {
                response.cookie('loggedIn', true);
                response.cookie('username', dbId );
                response.send(`${dbUsername} is logged in`);
            } else {
                console.log('Login details are incorrect');
            }
      } else
      // console.log("Incorrect details, login again!")
      response.redirect('/users/login')
    })
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
    login,
  };
};