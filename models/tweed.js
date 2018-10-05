module.exports = (pool) => {

	const index = (callback) => {

		const queryString = 
		"SELECT tweeds.id, tweeds.content, TO_CHAR(tweeds.created_at, 'HH12:MI am, DD/MM/YY') created_at, users.name AS username, users.id AS userid FROM tweeds INNER JOIN users ON (users.id = tweeds.user_id) ORDER BY id DESC;";

		pool.query(queryString, (error, queryResult) => {
			callback(error, queryResult);
		})
	}
    
  // const create = (user, callback) => {

  //   const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id';

  //   const values = [user.name, sha256(user.password)];

  //   pool.query(queryString, values, (error, queryResult) => {
  //     callback(error, queryResult);
  //   })
  // }

  // const get = (user, callback) => {

  //   const queryString = `SELECT * FROM users WHERE name = '${user.name}'`;

  //   pool.query(queryString, (error, queryResult) => {
  //     callback(error, queryResult);
  //   })
  // }

  return {
    index
  }
}
