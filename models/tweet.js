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
        callback(error, null);
      } else {
        callback(null, queryResult.rows[0]);
      }
    });
  };

  return {
    create
  };
};
