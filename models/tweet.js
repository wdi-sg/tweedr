/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (pool) => {
  const create = (tweet, callback) => {
    const queryString = 'INSERT INTO tweets (tweet, user_id) VALUES ($1, $2) RETURNING *';
    const values = [tweet.tweet, tweet.userId];

    pool.query(queryString, values, (error, queryResult) => {
      if (error) {
        console.log('error creating tweet:', error);
        callback(error, null);
      } else {
        callback(null, queryResult.rows[0]);
      }
    });
  };

  const index = (callback) => {
    const queryString = 'SELECT * FROM tweets';
    pool.query(queryString, (error, queryResult) => {
      if (error) {
        console.log('error showing tweet:', error);
        callback(error, null);
      } else if (queryResult.rows.length === 0) {
        callback(null, null);
      } else {
        callback(null, queryResult.rows);
      }
    });
  };

  return {
    create,
    index
  };
};
