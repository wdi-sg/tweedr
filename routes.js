module.exports = (app, db) => {

  const users = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/login', users.login);
  app.post('/login', users.loginPost);

  app.get('/users/new', users.newForm);
  app.post('/users', users.create);
  
  app.get('/', (request, response) => {
    response.send('Welcome To Tweedr.');
  });
};
