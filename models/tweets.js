module.exports = (dbPoolInstance) => {

	const tweetsRoot = (callback) => {

		const queryString = "SELECT * FROM tweets";

		 dbPoolInstance.query(queryString, (error, result) => {
	        // invoke callback function with results after query has executed
	        callback(error, result);
	        console.log(result.rows);
      });
	}

	const getTweet = (id, callback) => {

		const queryString = "SELECT * FROM tweets WHERE id =$1";
		const values = [id];

		dbPoolInstance.query(queryString, values, (error, result) => {
	        callback(error, result);
	       	console.log("results gettweet model: ", result.rows);
		})
	}

	const updateTweet = (updateObj, callback) => {

		console.log("update object: ", updateObj); 
		const queryString = "UPDATE tweets SET tweet = $1 WHERE id= $2";
		const values = [updateObj.tweet, updateObj.id];

		dbPoolInstance.query(queryString, values, (error, result) => {
			callback(error, result);
	       	console.log("results updatetweet model: ", result);
		})
	}

	const deleteTweet = (id, callback) => {

		const queryString = "DELETE FROM tweets WHERE id = $1";
		const values = [id];

		dbPoolInstance.query(queryString, values, (error, result) => {
			callback(error, result);
	       	//console.log("results updatetweet model: ", result);
		})
	}

	const newTweet = (updateObj, callback) => {

		const queryString = "INSERT INTO tweets (tweet, user_id) VALUES ($2, $1);";
		const values = [updateObj.user_id, updateObj.tweet];

		dbPoolInstance.query(queryString, values, (error, result) => {
			callback(error, result);
	       	//console.log("results updatetweet model: ", result);
		})
	}

	return {
		tweetsRoot,
		getTweet,
		updateTweet,
		deleteTweet,
		newTweet
	}
}