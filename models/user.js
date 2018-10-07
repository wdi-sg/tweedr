var sha256 = require('js-sha256');


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password
      console.log("user password at create:", user.password);

      var hashedValue = sha256(user.password);

      // set up query
      const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';

      const values = [
        user.name,
        hashedValue
      ];

      // execute query
      dbPoolInstance.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        console.log("create models QR", queryResult);

        callback(error, queryResult);
      });
    };

    const insertEmpty = (user, callback) => {

    };

    const userHome = (user, callback) => {

        console.log("user log at userHome:", user);

        const queryString = `SELECT users.name AS name, users.id AS user_id, tweets.id, tweets.title, tweets.content, tweets.date_posted FROM tweets INNER JOIN users ON (tweets.user_id = users.id) WHERE users.name = '${user}'`;

        dbPoolInstance.query(queryString, (error, queryResult) => {
        // invoke callback function with results after query has executed

         console.log("userHome-model QR:", queryResult);

        callback(error, queryResult);

      });
    };


    const existing = (user, callback) => {

        console.log("user password at login:", user);

         var hashedValue = sha256(user.password);

        let queryString = "SELECT * FROM users WHERE name ='"+ user.name.toLowerCase() + "'";

            console.log(queryString);


            dbPoolInstance.query(queryString, (error, queryResult) => {

                console.log("existing-model QR", queryResult);

                callback(error, queryResult);
          });
    };


    const newPost = (user,callback) => {

            // console.log("post at newPost", user);

            let queryString ="INSERT INTO tweets (title, content, user_id) VALUES($1, $2, $3)";

            const values = [user.title, user.content, user.user_id];

            // console.log(queryString);


            dbPoolInstance.query(queryString, values, (error, queryResult) => {

                // console.log("existing-model QR", queryResult);

                callback(error, queryResult);
          });
    };


    return {
      create,
      userHome,
      existing,
      newPost
    };
};
