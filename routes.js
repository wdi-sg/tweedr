module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const home = require('./controllers/home')(db);
  const tweet = require('./controllers/tweet')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  app.get('/register', users.newForm);
  app.post('/register', users.create);
  app.post('/follow/:id', users.follow);
  app.delete('/unfollow/:id', users.unfollow);
  app.get('/search', users.search);
  app.get('/users/:id', users.profilePage);
  app.get('/users/:id/edit', users.editProfileForm);
  app.put('/users/:id', users.editProfile);
  app.delete('/users/:id', users.deleteProfile);
  app.put('/users/:id/upload', users.uploadImage);

    /*
   *  =========================================
   *  Tweet
   *  =========================================
   */
   app.get('/tweet/new/image', tweet.uploadImageForm)
   app.post('/tweet/image', tweet.tweetImage)
   app.get('/tweet/new', tweet.newTweetForm);
   app.post('/tweet', tweet.createTweet);
   app.get('/tweet/:id/edit', tweet.editTweetForm);
   app.put('/tweet/:id', tweet.editTweet);
   app.delete('/tweet/:id', tweet.deleteTweet);
   app.get('/tweet/:id', tweet.showTweet);

    /*
   *  =========================================
   *  Home
   *  =========================================
   */
   app.get('/login', home.loginForm);
   app.post('/login', home.checkUser);
   app.post('/', home.logOut)
   app.get('/', home.homepage);
};
