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
      res.render("tweets/NewTweet", {cookies: req.cookies});
    } else {
      res.send("You must be logged in to post a tweet!");
    }

  };

  const newTweetPost = (req, res) => {
    // use user model method `create` to create new user entry in db
    db.tweets.newTweet(req.body, (err, queryResult) => {
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

  const showFollowingTweetsForm = (req, res) => {
      db.tweets.showFollowingTweets(req.cookies, (err, queryResult) => {
          if(err) {
              console.err("Error Showing Following Tweets: ", err);
          }

          res.render("index", {tweets: queryResult, cookies: req.cookies})
      })
  }

  const showFollowerTweetsForm = (req, res) => {
      db.tweets.showFollowerTweets(req.cookies, (err, queryResult) => {
          if(err) {
              console.err("Error Showing Following Tweets: ", err);
          }

          res.render("index", {tweets: queryResult, cookies: req.cookies})
      })
  }

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newTweetForm,
    newTweetPost,
    showAllTweetsForm,
    showFollowingTweetsForm,
    showFollowerTweetsForm
  };
};
