var sha256 = require('js-sha256');


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const createTweet = (user, callback) => {
        const queryString = 'INSERT INTO tweets (content) VALUES ($1)';

        const values = [
            user.tweet
        ];

        //execute query
        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            //invoke callback function with results after query has executed
            callback(error, queryResult);
        })
    }

    const displayTweets = (callback) => {
        const queryString = 'SELECT * FROM tweets';
        dbPoolInstance.query(queryString, (error, queryResult) => {
            //invoke callback function with results after query has executed
            callback(error, queryResult);
        })
    }




    // const login = (user, callback) => {
    //   let trimName = user.name.trim(); //trim name so that whitespace doesnt matter for name
    //   //Set Up query!
    //   let queryString = "SELECT * from users WHERE name = '" + trimName + "';";

    //   // execute query
    //   dbPoolInstance.query(queryString, (error, queryResult) => {
    //     // invoke callback function with results after query has executed
    //     callback(error, queryResult);
    //   });
    // };


    return {
      createTweet,
      displayTweets
    };
};
