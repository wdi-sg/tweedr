/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    // creating a new tweet
    const newTweet = (tweet, user, callback) => {
        // find user id from request.cookies to put into tweets table
        const queryString = 'SELECT id FROM users WHERE name = ' + "'" + user + "'" ;

        dbPoolInstance.query(queryString, (error, queryResult) => {

            // insert tweet and user_id to tweets table
            const secondQueryString = 'INSERT INTO tweets (user_id, tweet) VALUES ($1, $2) RETURNING *';

            const values =[
            queryResult.rows[0].id, tweet
            ]

            dbPoolInstance.query(secondQueryString, values, (error, secondQueryResult) => {
                callback(error, secondQueryResult);
            });
        });
    };

    // showing all tweets
    const allTweets = (currentUser, callback) =>{
        // show all tweets
        //const queryString = 'SELECT * FROM tweets';

        //show all tweets from users current user follows
        const queryString = 'SELECT * FROM tweets INNER JOIN followers ON ( tweets.user_id = followers.user_id) WHERE followers.follower_user_id = ' + currentUser;

        //show all tweets from users that follow current user
        // const queryString = 'SELECT * FROM tweets INNER JOIN followers ON ( tweets.user_id = followers.follower_user_id) WHERE followers.user_id = ' + currentUser;


        dbPoolInstance.query(queryString, (error, queryResult) => {

                callback(error, queryResult);

        });
    }

    const individualTweet = ( tweetId, callback) =>{
        const queryString ='SELECT tweets.tweet, users.name, users.id FROM tweets INNER JOIN users ON ( tweets.user_id = users.id )WHERE tweets.id = '+ tweetId;
        dbPoolInstance.query(queryString, (error, queryResult) => {

                callback(error, queryResult);

        });
    }

    return {
        newTweet,
        allTweets,
        individualTweet
    };
};