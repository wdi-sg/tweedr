module.exports = (pool) => {
    
  const create = (query, callback) => {

    const queryString = 'INSERT INTO follows (user_id, follower_id) VALUES ($1, $2) RETURNING id';

    const values = [query.userid, query.followerid];

    pool.query(queryString, values, (error, queryResult) => {
      callback(error, queryResult);
    })
	}
	
	const get = (query, callback) => {

    const queryString = `SELECT * FROM follows WHERE user_id = ${query.userid} AND follower_id = ${query.followerid};`;

    pool.query(queryString, (error, queryResult) => {
      callback(error, queryResult);
    })
	}
	
	const getFollowers = (query, callback) => {

		const queryString = `SELECT users.id, users.name FROM users INNER JOIN follows ON (users.id = follows.follower_id) WHERE follows.user_id = ${query.id};`;

		pool.query(queryString, (error, queryResult) => {
			callback(error, queryResult);
		})
	}

	const getFollowing = (query, callback) => {

		const queryString = `SELECT users.id, users.name FROM users INNER JOIN follows ON (users.id = follows.user_id) WHERE follows.follower_id = ${query.id};`;

		pool.query(queryString, (error, queryResult) => {
			callback(error, queryResult);
		})
	}

	const unfollow = (query, callback) => {

		const queryString = `DELETE FROM follows WHERE user_id = ${query.userid} AND follower_id = ${query.followerid};`;

		pool.query(queryString, (error, queryResult) => {
			callback(error, queryResult);
		})
	}



  return {
		create,
		get,
		getFollowers,
		getFollowing,
		unfollow

  }
}
