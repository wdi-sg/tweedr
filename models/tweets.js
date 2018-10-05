/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = dbPoolInstance => {
  const newTweet = (tweet, callback) => {
    // set up query
    const queryString = "INSERT INTO tweets (user_id, content) VALUES ($1, $2)";
    const values = [tweet.name, tweet.tweet];

    // execute query
    dbPoolInstance.query(queryString, values, (error, queryResult) => {
      // invoke callback function with results after query has executed
      callback(error, queryResult);
    });
  };

  return {
    newTweet
  };
};
