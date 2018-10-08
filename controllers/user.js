var sha256 = require('js-sha256');
const SALT = "tweedr tweeds";


module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */
    const loginForm = (request, response) => {
        response.render('user/UserLogin');
    }

    const loggedIn = (request, response) => {
        db.user.loggedIn(request.body, (error, queryResult) => {
            console.log(queryResult)

            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            var hashedValue = sha256(request.body.password);
            if(request.body.name !== undefined && hashedValue === queryResult.rows[0].password){

            response.cookie('loggedIn', queryResult.rows[0].password);
            response.cookie('username', queryResult.rows[0].id);
            response.redirect('/');}
            else{
                response.send('not logged in')
            }
        });
    }

    const logout = (request, response) => {
        response.clearCookie('loggedIn');
        response.clearCookie('username');
        response.redirect('/login');

    }

    const newForm = (request, response) => {
        response.render('user/NewUser');
    };

    const create = (request, response) => {
        // use user model method `create` to create new user entry in db
        db.user.create(request.body, (error, queryResult) => {
            console.log(queryResult)

            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }

            if (queryResult.rowCount >= 1) {
                console.log('User created successfully');

                // drop cookies to indicate user's logged in status and username
                let createdId = queryResult.rows[0].id;
                var hashedCookie = sha256(SALT + createdId);

                response.cookie('loggedIn', hashedCookie);
                response.cookie('username', queryResult.rows[0].id);
            } else {
                console.log('User could not be created');
            }

            // redirect to home page after creation
            response.redirect('/users/newtweet');
        });
    };

    const allUsers = (request, response) => {
        db.user.allUsers((error, queryResult) => {
            if (error) {
                console.error('error getting all user:', error);
                response.sendStatus(500);
            }

            response.render('user/AllUsers', { users: queryResult.rows });
        })
    }

    const individuals = (request, response) => {
        let requestedUser = request.params.id
        db.user.individuals(requestedUser, (error, tweets, followers, following) => {
            if (error) {
                console.error('error getting this user:', error);
                response.sendStatus(500);
            }
            response.render('user/IndividualUser', { currentuser: requestedUser, tweets: tweets.rows, followers: followers.rows, following: following.rows});
        })

    }

    const following = (request, response) => {
        let requestedFollow = request.params.id
        let userName = request.cookies['username'];
        db.user.follow(requestedFollow, userName, (error, queryResult) => {
            if (error) {
                console.error('error following this user:', error);
                response.sendStatus(500);
            }
            response.redirect('/users/' + requestedFollow);
        })
    }

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        loginForm,
        loggedIn,
        logout,
        newForm,
        create,
        allUsers,
        individuals,
        following

    };
};