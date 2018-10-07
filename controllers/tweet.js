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

    const uploadImageForm = (request, response) => {

        response.render('tweet/CreateImageTweet');
    };

    const tweetImage = (request, response) => {

        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;
        // User did not upload file
        if(!request.files) {
            console.log("No image was uploaded.");
            response.sendStatus(400);
        }

        const uploadedFile = request.files.imageTweet;

        uploadedFile.mv('public/tweet/'+ uploadedFile.name, (error) => {

            if (error) {
                console.log("fail to move file");
                response.sendStatus(500);
            }

            let path = '/tweet/' + uploadedFile.name;

            db.tweet.createImageTweet(path, date, request.cookies['userId'], (error, queryResult) => {

                if(error) {
                    console.log("error tweeting image: ", error.message);
                    response.sendStatus(500);
                }

                response.redirect('/tweet/' + queryResult);
            });
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
        deleteTweet,
        uploadImageForm,
        tweetImage
    };
};