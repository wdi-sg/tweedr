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
    const username = request.cookies.username;
    db.tweet.index(username, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        const hashedUsername = sha256(username + 'loggedIn' + SALT);
        let data = { tweets: queryResult };

        if (hashedUsername === request.cookies.loggedIn) {
          data.username = username;
        }

        response.render('tweet/Index', data);
      }
    });
  };

  const edit = (request, response) => {
    db.tweet.getFromId(request.params.id, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        const username = request.cookies.username;
        const hashedUsername = sha256(queryResult.author + 'loggedIn' + SALT);

        // Make sure only the aurthor can edit the tweet
        if (hashedUsername === request.cookies.loggedIn) {
          const data = { username, tweet: queryResult };
          response.render('tweet/Edit', data);
        } else {
          response.redirect('/');
        }
      }
    });
  };

  const update = (request, response) => {
    db.tweet.update(request.params.id, request.body.tweet, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.redirect(`/users/${queryResult.author}`);
      }
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    index,
    edit,
    update
  };
};
