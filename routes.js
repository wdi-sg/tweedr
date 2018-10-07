module.exports = (app, db) => {

  const users = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users

  //New user create
  app.get('/users/new', users.newForm);
  app.post('/users', users.create);

  //User log in
  app.get('/users/login', users.userLogInForm);
  app.post('/users/login', users.userLogIn);
};
