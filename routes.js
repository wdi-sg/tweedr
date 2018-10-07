module.exports = (app, db) => {

  const user = require('./controllers/user')(db);
  const tweed = require('./controllers/tweed')(db);
  const follow = require('./controllers/follow')(db);

  app.get('/users/', user.index);
  app.get('/users/new', user.newForm);
  app.post('/users', user.create);
  
  
  app.post('/users/logout', user.logout);
  app.post('/users/login', user.loginPost);
  app.get('/users/login', user.loginForm);
  
  app.get('/users/:id', user.profile);

  app.get('/tweeds/', tweed.index);
  // app.get('/tweed/new', tweed_newForm); // form is in index
  app.post('/tweed', tweed.create);
  // app.get('/tweed/:id', tweed.show);
  // app.get('/tweed/:id/edit', tweed.editForm);
  // app.put('tweed/:id/', tweed.update);
  // app.delete('/tweed/:id', tweed.delete);


  app.post('/follow', follow.create);
  app.delete('/follow', follow.unfollow);

};
