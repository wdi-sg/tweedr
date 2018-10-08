module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */


    const newTweet = (request, response) => {

        response.render('tweets/NewTweet');

    };

    const allTweets = (request, response) => {
        var user = request.cookies['username'];

        db.tweets.newTweet(request.body.tweet, user, (error, queryResult) => {
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }

            response.redirect('/');
        })
    };

    const showTweets = (request, response) => {
        var currentUser = request.cookies['username'];
        db.tweets.allTweets(currentUser, (error, queryResult) => {
            if (error) {
                console.error('error getting tweets:', error);
                response.sendStatus(500);
            }
            response.render('tweets/allTweet', { tweets: queryResult.rows });
        });
    };

    const individualTweet = (request, response) => {
        var tweetId = request.params.id;
        db.tweets.individualTweet ( tweetId, (error, queryResult) =>{
            if (error) {
                console.error('error getting tweets:', error);
                response.sendStatus(500);
            }
            response.render('tweets/IndividualTweet', { tweets: queryResult.rows });

        })
    };

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        newTweet,
        allTweets,
        showTweets,
        individualTweet
    };
};