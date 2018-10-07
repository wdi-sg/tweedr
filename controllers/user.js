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
        console.log(queryResult)
        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully');

          // drop cookies to indicate user's logged in status and username
          response.cookie('loggedIn', true);
          response.cookie('username', sha256(request.body.name));
        } else {
          console.log('User could not be created');
        }

        // redirect to home page after creation
        response.redirect('/');
      });

    const createPost = (request, response) => {
        response.render('twits/twits');
    }
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create
  };
};
