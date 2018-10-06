/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (pool) => {
  const create = (tweet, callback) => {
    const queryString = 'INSERT INTO tweets (tweet, author) VALUES ($1, $2) RETURNING *';
    const values = [tweet.tweet, tweet.author];

    pool.query(queryString, values, (error, queryResult) => {
      if (error) {
        console.log('error creating tweet:', error);
        callback(error, null);
      } else {
        callback(null, queryResult.rows[0]);
      }
    });
  };

  const index = (user, callback) => {
    const queryString = `SELECT tweets.id, tweets.tweet, tweets.author, tweets.time_created FROM tweets LEFT JOIN followers ON tweets.author = followers.user_name WHERE follower_name = '${user}' OR author = '${user}' ORDER BY time_created DESC`;
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

  const get = (user, callback) => {
    const queryString = `SELECT * FROM tweets WHERE author = '${user}'`;
    pool.query(queryString, (error, queryResult) => {
      if (error) {
        console.log('error getting user tweets:', error);
        callback(error, null);
      } else if (queryResult.rows.length === 0) {
        callback(null, null);
      } else {
        callback(null, queryResult.rows);
      }
    });
  };

  const getFromId = (id, callback) => {
    const queryString = `SELECT * FROM tweets WHERE id = ${id}`;
    pool.query(queryString, (error, queryResult) => {
      if (error) {
        console.log('error getting a tweet:', error);
        callback(error, null);
      } else {
        callback(null, queryResult.rows[0]);
      }
    });
  };

  const update = (id, tweet, callback) => {
    const queryString = `UPDATE tweets SET tweet = ($1) WHERE id = ${id} RETURNING *`;
    const values = [tweet];
    pool.query(queryString, values, (error, queryResult) => {
      if (error) {
        console.log('error updating tweet:', error);
        callback(error, null);
      } else {
        callback(null, queryResult.rows[0]);
      }
    });
  };

  return {
    create,
    index,
    get,
    getFromId,
    update
  };
};
