const cookieParser = require('cookie-parser');

module.exports = (db) => {

	const newTweet = (request, response) => {

		console.log("new tweet req body: ", request.body);
		db.tweets.newTweet(request.body, (error, result) => {
			if (error) {
		        console.error('error getting user:', error);
		        response.sendStatus(500);
		    }
		    else {
				response.redirect('/tweets');
		    }
		})
	};

	const tweetsRoot = (request, response) => {

		let user_id = null;
		if(request.cookies['user_id']!=undefined){
			user_id = request.cookies['user_id'];
		}
		let login = request.cookies['logged_in'];

		console.log("login: ", login);

		db.tweets.tweetsRoot((error, result) => {

			if (error) {
		        console.error('error getting user:', error);
		        response.sendStatus(500);
		    }
		    else {
				response.render('tweets/home', {tweets: result.rows, userid: user_id, loggedin: login});
		    }
		});
	};

	const getTweet = (request, response) => {

		db.tweets.getTweet(request.params.id, (error, result) => {
			if (error) {
		        console.error('error getting user:', error);
		        response.sendStatus(500);
		    }
		    else {
				response.render('tweets/edit', result.rows[0]);
		    }
		})
	};

	const updateTweet = (request, response) => {

		console.log("body of update tweet: ", request.body);

		db.tweets.updateTweet(request.body, (error, result) => {
			if (error) {
		        console.error('error getting user:', error);
		        response.sendStatus(500);
		    }
		    else {
				response.redirect('/tweets');
		    }
		})
	};

	const deleteTweet = (request, response) => {

		db.tweets.deleteTweet(request.params.id, (error, result) => {
			if (error) {
		        console.error('error getting user:', error);
		        response.sendStatus(500);
		    }
		    else {
				response.redirect('/tweets');
		    }
		})
	}

	/**
	* ===========================================
	* Export controller functions as a module
	* ===========================================
	*/

	return {
		tweetsRoot,
		getTweet,
		updateTweet,
		deleteTweet,
		newTweet
	}

}
