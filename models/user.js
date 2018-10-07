var sha256 = require('js-sha256');


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password

      var hashedValue = sha256(user.password);

      // set up query
      const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
      const values = [
        user.name,
        hashedValue
      ];

      // execute query
      dbPoolInstance.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };

    const createPost = (post, callback) => {
    const queryString = 'INSERT INTO tweets (tweetText, user_id) VALUES ($1, $2)';
    const values = [request.body.twit, request.body.user_id];

    dbPoolInstance.query(queryString, (err, result) => {
    callback(error, queryResult);
})
    }

    return {
      create,
      createPost
    };
};
