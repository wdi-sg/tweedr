var sha256 = require('js-sha256');
const SALT = "MVC is so confusing";

module.exports = (db) => {

    const newTweetForm = (request, response) => {

        if(request.cookies['loginStatus'] === sha256(SALT + 'logged in')) {

          response.render('tweet/CreateTweet');

        } else {

            response.sendStatus(403);
        }

    };

    const createTweet = (request, response) => {

        db.tweet.createTweet(request.body, request.cookies['userId'], (error, queryResult) => {

            if (error) {

                response.sendStatus(500);
            }

            let tweetId = queryResult;

            response.redirect("/tweet/" + tweetId);
        });
    };

    const showTweet = (request, response) => {

        db.tweet.showTweet(request.params.id, (error, queryResult) => {

            if(error) {

                response.sendStatus(500);
            }

            let cookies = {

                check: sha256(SALT + "logged in"),
                loginStatus: request.cookies['loginStatus'],
                username: request.cookies['username'],
                userId: request.cookies['userId']
            };

            response.render('tweet/tweet', {cookie: cookies, tweet: queryResult});

        });
    };

    const editTweetForm = (request, response) => {

        db.tweet.showTweet(request.params.id, (error, queryResult) => {

            if (error) {

                response.sendStatus(500);
            }

            if (request.cookies['loginStatus'] === sha256(SALT + 'logged in') && request.cookies['userId'] == queryResult.user_id) {

                response.render('tweet/EditTweet', {tweet: queryResult});
            } else {
                response.sendStatus(403);
            }

        });
    };

    const editTweet = (request, response) => {

        db.tweet.editTweet(request.body, request.params.id, (error) => {

            if (error) {
                console.log("edit error: ", error.message);
                response.sendStatus(500);
            }

            response.redirect("/tweet/" + request.params.id);
        });
    };

    const deleteTweet = (request, response) => {

        db.tweet.deleteTweet(request.params.id, (error) => {

            if (error) {
                console.log("delete tweet error: ",error.message);
                response.sendStatus(500);
            }

            response.redirect('/');
        });
    };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
    return {
        newTweetForm,
        createTweet,
        showTweet,
        editTweetForm,
        editTweet,
        deleteTweet
    };
};