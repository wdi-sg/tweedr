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
      const values = [
        user.name,
        hashedValue
      ];

      // execute query
      dbPoolInstance.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };

    const userLoggedIn = (request, response) => {

    let name = request.body.name;
    const queryString = `SELECT password FROM users WHERE name = "${name}";`;
    let hashedValue = sha256(request.body.password);

    console.log('hashed:' + hashedValue);

    dbPoolInstanc.query(queryString, (err, result) => {
        if (err) {
            console.error('Query error:', err.stack);
            response.send('Wrong password, please try again');
        } else {
            const user = result.rows[0];
            if( user.password === hashedValue ){
            response.cookie('loggedin', 'true');
            response.cookie('cookie_id', user.id);
            response.send('You are logged in');
        } else {
            response.send('Try again');
        }
    }
  });
};

    return {
      create,
      userLoggedIn
    };
};
