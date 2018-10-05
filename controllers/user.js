const sha256 = require('js-sha256');
const SALT = 'fQdkaUjfieowavwEivorutyFvdaljfLoewKdkfj';

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
    db.user.create(request.body, (error, queryResult) => {
      if (error) {
        console.error('error creating user:', error);
        response.sendStatus(500);
      } else {
        const hashedUsername = sha256(queryResult.name + 'loggedIn' + SALT);
        response.cookie('userId', queryResult.id);
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
    newForm,
    create
  };
};
