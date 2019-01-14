/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getAllTweets = (callback) => {
    let query = 'SELECT * FROM tweets';

    dbPoolInstance.query(query,  (error, result) => {
        callback(error, result);
    });
  };

  let getLogin = (callback) => {

    dbPoolInstance.query((error, result) => {
        callback(error, result);
    });
  };

  let getSignIn = (tweets, callback) => {

    let text = "SELECT * FROM users WHERE username=$1";
    const values = [tweets.username];

    dbPoolInstance.query(text, values, (error, result) => {
        callback(error, result);
    });
  };

  let getSignOut = (callback) => {
    dbPoolInstance.query((error, result) => {
        callback(error, result);
    })
  }

  let getUsers = (users, callback) => {
    let text = 'INSERT INTO users (name, username, password) VALUES ($1, $2, $3)';
        const values = [users.name, users.reguser, users.regpass];

    dbPoolInstance.query(text, values, (error, result) => {
        callback(error, result);
    })
  }

  let getNew = (callback) => {
    dbPoolInstance.query((error, result) => {
        callback(error, result);
    })
  }

  let getNewTweets = (tweets, callback) => {

    let text = 'INSERT INTO tweets (name, username, content) VALUES ($1, $2, $3)';
      const values = [tweets.name, tweets.username, tweets.newtweet];

    dbPoolInstance.query(text, values, (error, result) => {
        callback(error, result);
    })
  }

  let getUsername = (tweets, callback) => {

    let text = "SELECT users.username, followers.following_id from users INNER JOIN followers ON users.id = followers.user_id";

    dbPoolInstance.query(text, (error, result) => {
        callback(error, result);
    })
  }

  return {
    getAllTweets,
    getLogin,
    getSignIn,
    getSignOut,
    getUsers,
    getNew,
    getNewTweets,
    getUsername
    //get,
  };
};
