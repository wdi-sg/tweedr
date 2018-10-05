module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
 // Controllers for Creating New Tweet
  const newTweetForm = (req, res) => {
    res.render('tweets/NewTweet');
  };

  const newTweetPost = (req, res) => {
      // use user model method `create` to create new user entry in db
      db.tweets.newTweet(req.body, (err, queryResult) => {
        // queryResult of creation is not useful to us, so we ignore it
        // (console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)

        if (err) {
          console.err('Errror getting user:', err);
          res.sendStatus(500);
        }
        if (queryResult.rowCount >= 1) {
          console.log('Tweet Posted')
        } else {
          console.log('User could not be created');
        }
        // redirect to home page after creation
        res.redirect('/');
      });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newTweetForm,
    newTweetPost
  };
};
