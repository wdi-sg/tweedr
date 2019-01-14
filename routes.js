module.exports = (app, db) => {

    const tweedr = require('./controllers/tweedr')(db);

  /*
   *  =========================================
   *  Routes for one controller
   *  =========================================
   */


    app.get('/public', tweedr.publicHome);
    app.get('/users/new', tweedr.registerForm);
    app.post('/users/new', tweedr.register);
    app.get('/users/login', tweedr.loginForm);
    app.post('/users/login', tweedr.loginCheck);
    app.get('/user', tweedr.userHome);
    app.post('/user/tweet/new', tweedr.postTweet);






};