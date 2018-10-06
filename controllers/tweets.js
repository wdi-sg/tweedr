const sha256 = require('js-sha256')
module.exports = db => {

  // Salt for Hash
  const SALT = "aKiRa is a PokeMON";
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  // Controllers for Creating New Tweet
  const newTweetForm = (req, res) => {
    let checkSessionCookieHash = sha256(
      req.cookies.user_id + "logged_id" + SALT
    );
    if (req.cookies.loggedIn === checkSessionCookieHash) {
      res.render("tweets/NewTweet", {user_id: req.cookies.user_id});
    } else {
      res.send("You must be logged in to post a tweet!");
    }

  };

  const newTweetPost = (req, res) => {
    // use user model method `create` to create new user entry in db
    db.tweets.newTweet(req.body, (err, queryResult) => {
      // queryResult of creation is not useful to us, so we ignore it
      // (console log it to see for yourself)
      // (you can choose to omit it completely from the function parameters)
      if (err) {
        console.err("Errror creating tweet:", err);
        res.sendStatus(500);
      }
      if (queryResult.rowCount >= 1) {
        console.log("Tweet Posted");
      } else {
        console.log("User could not be created");
      }
      // redirect to home page after creation
      res.redirect("/");
    });
  };

  // Controller for passing the tweets props from queryResult on to index.jsx to be rendered in the form
  const showAllTweetsForm = (req, res) => {
    db.tweets.showAllTweets(req.body, (err, queryResult) => {
      if (err) {
        console.err("Error getting Tweets: ", err);
      }
      res.render("index", { tweets: queryResult, cookies: req.cookies });
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newTweetForm,
    newTweetPost,
    showAllTweetsForm
  };
};
