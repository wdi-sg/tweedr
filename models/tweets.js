

module.exports = (dbPoolInstance) => {

    const postTweet = (tweet, callback) => {
        let text = 'INSERT INTO tweets (user_id, content) VALUES ($1, $2)';

        let values = [tweet.id, tweet.tweet];

        dbPoolInstance.query(text, values, (err, result) => {
            callback(err, result);
        });
    };

    return {
        postTweet
    };
};