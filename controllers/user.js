const sha256 = require('js-sha256');
const SALT = 'fQdkaUjfieowavwEivorutyFvdaljfLoewKdkfj';

module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const loginForm = (request, response) => {
    response.render('Login');
  };

  const login = (request, response) => {
    db.user.get(request.body.name, (error, queryResult) => {
      if (error) {
        response.render('Login', { error: 'Invalid username' });
      } else {
        const hashedPassword = sha256(request.body.password);
        if (hashedPassword !== queryResult.password) {
          response.render('Login', { error: 'Invalid password' });
        } else {
          const hashedUsername = sha256(queryResult.name + 'loggedIn' + SALT);
          response.cookie('username', queryResult.name);
          response.cookie('loggedIn', hashedUsername);
          response.redirect('/tweets');
        }
      }
    });
  };

  const logout = (request, response) => {
    response.clearCookie('username');
    response.clearCookie('loggedIn');
    response.redirect('/');
  };

  const newForm = (request, response) => {
    response.render('user/NewUser');
  };

  const create = (request, response) => {
    db.user.create(request.body, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        const hashedUsername = sha256(queryResult.name + 'loggedIn' + SALT);
        response.cookie('username', queryResult.name);
        response.cookie('loggedIn', hashedUsername);
      }

      response.redirect('/tweets');
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    loginForm,
    login,
    logout,
    newForm,
    create
  };
};
