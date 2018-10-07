module.exports = (db) => {

	const index = (request, response) => {

		db.tweed.index((error, queryResult) => {

			if (error) {
        console.error('error getting tweeds:', error);
        response.sendStatus(500);
			
			} else {

				response.render('tweeds/index', {tweeds:queryResult.rows, cookies: request.cookies});
			}
		})
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