module.exports = (dbPoolInstance) => {

    const createTweet = (tweet, userId, callback) => {

        let queryText = "INSERT INTO tweet (title,message,user_id,dateandtime) VALUES ($1,$2,$3,$4) RETURNING id;";

        let values = [tweet.title, tweet.message, userId, tweet.date]

        dbPoolInstance.query(queryText, values, (error, result) => {

            callback(error, result.rows[0].id)
        });
    };

    const showTweet = (id, callback) => {

        let queryText = "SELECT tweet.*, users.username FROM tweet INNER JOIN users ON (tweet.user_id = users.id) WHERE tweet.id='" + id + "';";

        dbPoolInstance.query(queryText, (error, result) => {

            callback(error, result.rows[0]);
        });
    };

    const editTweet = (input, id, callback) => {

        let queryText = "UPDATE tweet SET title=($1), message=($2), dateandtime=($3) WHERE id='" + id +"';";

        values=[input.title, input.message, input.date];

        dbPoolInstance.query(queryText, values, (error, result) => {

            callback(error);
        });
    };

    const deleteTweet = (id, callback) => {

        let queryText = "DELETE FROM tweet WHERE id='" + id + "';";

        dbPoolInstance.query(queryText, (error, result) => {

            callback(error);
        });
    };

    return {
        createTweet,
        showTweet,
        editTweet,
        deleteTweet
    };
};