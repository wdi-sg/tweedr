module.exports = (app, db) => {

  const users = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.post('/users/int', users.create);
  app.get('/home/:name', users.userHome);
  app.get('/users/login', users.loginForm);
  app.post('/users/account', users.existing);
  app.post('/users/post', users.newPost);
  app.delete('/logout/:name', users.cookieClear);
  app.get('/logout/:name', users.logOut);


};
