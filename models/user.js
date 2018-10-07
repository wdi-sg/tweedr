var sha256 = require('js-sha256');

var session = "salt";

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const create = (user, callback) => {

          var hashedValue = sha256(user.password);

          // set up query
          const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2)';
          const values = [
            user.name,
            hashedValue
          ];

          // execute query
          dbPoolInstance.query(queryString, values, (error, queryResult) => {
            // invoke callback function with results after query has executed
            console.log("added username")
            callback(error, queryResult);
          });
        // });
    };

    const authentication = (user, callback)=>{

        let hashedValue = sha256(user.password);

        let username = user.name;

        const queryString = 'SELECT * FROM users';

      dbPoolInstance.query(queryString, (error, queryResult) => {

        // console.log("query result", queryResult)
        let authenticationResult;

        queryResult.rows.forEach((element)=>{
            if (user.name === element.username){

                if(hashedValue === element.password){
                    console.log("this is the correct user and password")
                    authenticationResult = true;

                }else{
                    console.log("this is the wrong password")
                }


            }else{
                    console.log("there is no such username")
            }

      });
        if(authenticationResult === true){
            let loginValue = sha256(session + user.password)
            console.log("login value: ", loginValue)
            callback(error, queryResult, loginValue)
        }

    });
    };

    const storeTweetInTable = (user, callback) => {

        console.log("tweet:" , user.username)

          // set up query
          const queryString = 'INSERT INTO tweets (username, tweet) VALUES ($1, $2)';
          const values = [
            user.username,
            user.tweet
          ];


          dbPoolInstance.query(queryString, values, (error, queryResult) => {
            console.log("added tweet")
            callback(error, queryResult);
          });

    };

    const displayTweet = (user, callback) => {

          const queryString = 'SELECT * FROM tweets WHERE username = ' + "'"+user+"'" + 'ORDER BY id DESC';


          dbPoolInstance.query(queryString, (error, queryResult) => {
            console.log("queryresult: " , queryResult.rows)
            callback(error, queryResult);
          });

    };


    return {
      create,
      authentication,
      storeTweetInTable,
      displayTweet
    };
};
