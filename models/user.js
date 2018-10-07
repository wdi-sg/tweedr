var sha256 = require('js-sha256');
/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password

      var hashedValue = sha256(user.password);

      // set up query
      const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
      const values = [user.name, hashedValue];

      // execute query
      dbPoolInstance.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };

    const logIn = (user, callback)=>{
        console.log("Model user name", user);
        //set up query
        const queryString = "SELECT * from users WHERE name ='"+ user + "';";
        console.log("model queryResult", queryString);

        dbPoolInstance.query(queryString,(error, queryResult) => {

            if(error){
                console.log(error, null);
            } else {
                    if (queryResult.rows[0] === undefined){
                        callback(null,null);
                    }else {
                            console.log("Signin Query Works",queryResult.rows[0]);
                            callback(null,queryResult.rows[0]);
                        }
                }

      });

    }

    return {
      create,
      logIn
    };
};
