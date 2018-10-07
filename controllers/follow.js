module.exports = (db) => {

	const create = (request, response) => {

		db.follow.get(request.body, (error, queryResult) => {

			if (error) {
        console.error('error getting follows:', error);
        response.sendStatus(500);
			
			} else if (queryResult.rowCount > 0) {

				console.log("Follow relationship already exists!");
				response.send("You are already following this user!");
			
			} else {

				db.follow.create(request.body, (error, queryResult) => {

					if (error) {
						console.error('error following user:', error);
            response.sendStatus(500);
          }
    
          if (queryResult.rowCount >= 1) {
            console.log('Follow relationship created!');
    
            response.redirect(`/user/${request.body.followerid}`);

          } else {
            console.log('User could not be created.');
            response.sendStatus(500);
          }
				})
			}

				response.redirect('/'); // replace with below line
				// response.redirect(`/users/${request.body.userid}`);
		})
	}

	return {
		create
  }
}