var sha256 = require('js-sha256');
const SALT = "MVC is so confusing";

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
   const homepage = (request, response) => {

        let cookies = {};
        cookies['check'] = sha256(SALT + 'logged in');
        cookies['loginStatus'] = request.cookies['loginStatus'];
        if (cookies.loginStatus === sha256(SALT + 'logged in')) {

            cookies['userId'] = request.cookies['userId'];
            cookies['username'] = request.cookies['username'];
        }

        var tweet;

        db.home.displayTweets((error, queryResult) => {

            if(error) {

                console.log('error showing tweet: ', error.message);
                response.sendStatus(500);
            }

            if(queryResult.length !== 0) {

                tweet = queryResult;
            }

            response.render('home/home', {cookie: cookies, tweet: tweet});

        });
    };

    const loginForm = (request, response) => {

        let incorrectAttempt = request.cookies['wrongInput'];

        response.render('home/login', {cookie: incorrectAttempt});

    };

    const checkUser = (request, response) => {

        db.home.checkUser(request.body, (error, queryResult) => {

            if (error) {

                console.log('error in checking user account: ', error.message);
                response.sendStatus(500);

            } else {

                if (queryResult !== undefined && sha256(request.body.password) === queryResult.password) {

                    if(request.cookies['wrongInput'] === 'true') {

                        response.clearCookie('wrongInput');
                    }

                    response.cookie('loginStatus', sha256(SALT + 'logged in'));
                    response.cookie('username', queryResult.username);
                    response.cookie('userId', queryResult.id);
                    response.redirect('/');

                } else {

                    response.cookie('wrongInput', true);
                    response.redirect('/login');
                }
            }

        });
    };

    const logOut = (request, response) => {

        response.clearCookie('loginStatus');
        response.clearCookie('userId');
        response.clearCookie('username');
        response.redirect('/');

    };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
   return {
     homepage,
     loginForm,
     checkUser,
     logOut
   };
};