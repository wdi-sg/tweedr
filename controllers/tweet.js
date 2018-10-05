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
        console.log('error creating tweet:', error);
        response.sendStatus(500);
      } else {
        response.redirect('/');
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
    create
  };
};
