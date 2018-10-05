module.exports = (app, db) => {

  const user = require('./controllers/user')(db);

  // app.get('/users/', user.index);
  app.get('/users/new', user.newForm);
  app.post('/users', user.create);


  const tweed = require('./controllers/tweed')(db);

  app.get('/tweeds/', tweed.index);
  // app.get('/tweed/new', tweed_newForm);
  // app.post('/tweed', tweed.create);
  // app.get('/tweed/:id', tweed.show);
  // app.get('/tweed/:id/edit', tweed.editForm);
  // app.put('tweed/:id/', tweed.update);
  // app.delete('/tweed/:id', tweed.delete);

};
