const sha256 = require('js-sha256');
const SALT = 'fQdkaUjfieowavwEivorutyFvdaljfLoewKdkfj';

module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
    response.render('tweet/NewTweet');
  };

  const create = (request, response) => {
    const tweet = { ...request.body, author: request.cookies.username };
    db.tweet.create(tweet, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.redirect('back');
      }
    });
  };

  const index = (request, response) => {
    db.tweet.index((error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        const username = request.cookies.username;
        const hashedUsername = sha256(username + 'loggedIn' + SALT);
        let data = { tweets: queryResult };

        if (hashedUsername === request.cookies.loggedIn) {
          data.username = username;
        }

        response.render('tweet/Index', data);
      }
    });
  }

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    index
  };
};
