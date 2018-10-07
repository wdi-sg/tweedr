module.exports = (pool) => {

	const index = (callback) => {

		const queryString = 
		"SELECT tweeds.id, tweeds.content, TO_CHAR(tweeds.created_at, 'HH12:MI am, DD/MM/YY') created_at, users.name AS username, users.id AS userid FROM tweeds INNER JOIN users ON (users.id = tweeds.user_id) ORDER BY id DESC;";

		pool.query(queryString, (error, queryResult) => {
			callback(error, queryResult);
		})
	}

	const indexFollowers = (query, callback) => {

		const queryString = `SELECT tweeds.id, tweeds.content, TO_CHAR(tweeds.created_at, 'HH12:MI am, DD/MM/YY') created_at, users.name AS username, users.id AS userid FROM tweeds INNER JOIN users ON (users.id = tweeds.user_id) INNER JOIN follows ON (users.id = follows.follower_id) WHERE follows.user_id = ${query.userid} ORDER BY id DESC;`;

		pool.query(queryString, (error, queryResult) => {
			callback(error, queryResult);
		})
	}

	const indexFollowing = (query, callback) => {

		const queryString = `SELECT tweeds.id, tweeds.content, TO_CHAR(tweeds.created_at, 'HH12:MI am, DD/MM/YY') created_at, users.name AS username, users.id AS userid FROM tweeds INNER JOIN users ON (users.id = tweeds.user_id) INNER JOIN follows ON (users.id = follows.user_id) WHERE follows.follower_id = ${query.userid} ORDER BY id DESC;`;

		pool.query(queryString, (error, queryResult) => {
			callback(error, queryResult);
		})
	}
    
  const create = (newTweed, callback) => {

    const queryString = 'INSERT INTO tweeds (content, user_id) VALUES ($1, $2) RETURNING id';

    const values = [newTweed.content, newTweed.userid];

    pool.query(queryString, values, (error, queryResult) => {
      callback(error, queryResult);
    })
  }

  // const get = (user, callback) => {

  //   const queryString = `SELECT * FROM users WHERE name = '${user.name}'`;

  //   pool.query(queryString, (error, queryResult) => {
  //     callback(error, queryResult);
  //   })
  // }

  return {
		index,
		indexFollowers,
		indexFollowing,
		create
  }
}
