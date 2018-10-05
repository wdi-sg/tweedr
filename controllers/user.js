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
        console.error('error getting user:', error);
        response.sendStatus(500);
      } else {
        const hashedUserId = sha256(queryResult.id + 'userId' + SALT);
        response.cookie('userId', queryResult.id);
        response.cookie('loggedIn', hashedUserId);
      }

      response.redirect('/');
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
