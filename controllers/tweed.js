module.exports = (db) => {

	const index = (request, response) => {

		if (request.query.only === "followers") {

			db.tweed.indexFollowers(request.cookies, (error, queryResult) => {
	
				if (error) {
					console.error('error getting tweeds:', error);
					response.sendStatus(500);
				
				} else {
	
					response.render('tweeds/index', {tweeds:queryResult.rows, cookies: request.cookies});
				}
			})

		} else if (request.query.only === "following") {
			
			db.tweed.indexFollowing(request.cookies, (error, queryResult) => {
	
				if (error) {
					console.error('error getting tweeds:', error);
					response.sendStatus(500);
				
				} else {
	
					response.render('tweeds/index', {tweeds:queryResult.rows, cookies: request.cookies});
				}
			})

		} else {

			db.tweed.index((error, queryResult) => {
	
				if (error) {
					console.error('error getting tweeds:', error);
					response.sendStatus(500);
				
				} else {
	
					response.render('tweeds/index', {tweeds:queryResult.rows, cookies: request.cookies});
				}
			})
		}
	}

	const create = (request, response) => {

		db.tweed.create(request.body, (error, queryResult) => {

			if (error) {
        console.error('error getting tweeds:', error);
        response.sendStatus(500);
			
			} else {

				response.redirect('/');
			}
		})
	}

	const editForm = (request, response) => {

		db.tweed.get(request.params, (error, queryResult) => {

			if (error) {
        console.error('error getting tweeds:', error);
        response.sendStatus(500);
			
			} else {

				response.render('tweeds/edit', {cookies: request.cookies, tweed: queryResult.rows[0]});
			}
		})
	}

	const update = (request, response) => {

		db.tweed.update(request.body, (error, queryResult) => {

			if (error) {
        console.error('error getting tweed:', error);
        response.sendStatus(500);
			
			} else {

				response.redirect('/');
			}
		})
	}

	const deleteTweed = (request, response) => {

		db.tweed.deleteTweed(request.body, (error, queryResult) => {

			if (error) {
        console.error('error getting tweed:', error);
        response.sendStatus(500);
			
			} else {

				response.redirect('/');
			}
		})
	}

	return {
		index,
		create,
		editForm,
		update,
		deleteTweed
  }
}