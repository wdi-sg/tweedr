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

	return {
		index,
		create
  }
}