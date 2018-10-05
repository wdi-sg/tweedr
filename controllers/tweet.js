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
    const tweet = { ...request.body, userId: request.cookies.userId };
    db.tweet.create(tweet, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.redirect('/');
      }
    });
  };

  const index = (request, response) => {
    db.tweet.index((error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else if (queryResult === null) {
        response.send('No tweet');
      } else {
        response.render('tweet/Index', { tweets: queryResult });
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
