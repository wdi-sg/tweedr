const sha256 = require('js-sha256');
const SALT = 'This is a string';

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
        console.log("Request.body:", request.body);
        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully');
          let currentSessionCookie = sha256(queryResult.rows[0].user_id + 'logged_id' + SALT);
          //response.cookie('logged_in', currentSessionCookie);

          // drop cookies to indicate user's logged in status and username
          response.cookie('logged_in', currentSessionCookie);
          response.cookie('user_id', queryResult.rows[0].user_id);
        } else {
          console.log('User could not be created');
        }
        // redirect to home page
          response.redirect('/');
      });
  };

  // Create Form, user login
  const userLogInForm = (request, response) => {
  response.render('user/login');
  };

  const userLogIn = (request, response) => {
  db.user.userLogIn(request.body, (error, queryResult) => {
    if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }
    let hashedPassword = sha256(request.body.password);
    if (hashedPassword === queryResult.rows[0].password) {
      console.log('User logged in successfully');
      let currentSessionCookie = sha256(queryResult.rows[0].user_id + 'logged_id' + SALT);
      response.cookie('logged_in', currentSessionCookie);
      response.cookie('user_id', queryResult.rows[0].user_id);
    } else {
          console.log('User could not be logged in')
        }
    })
}

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    userLogInForm,
    userLogIn
  };
};
