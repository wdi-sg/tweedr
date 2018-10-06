var sha256 = require('js-sha256');


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const create = (user, callback) => {

        const queryString = "SELECT * FROM users WHERE username='" + user.username + "';";

        dbPoolInstance.query(queryString, (error, result) => {

            if (error) {
                console.log('error cheching db: ', error.message);
            }

            if (result.rows.length !== 0) {

                callback(error, result.rows);

            } else {

              var hashedValue = sha256(user.password);

              // set up query
              const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2)';
              const values = [
                user.username,
                hashedValue
              ];

              dbPoolInstance.query(queryString, values, (error, result) => {

                callback(error);
              });

            }
        });
    };

    const showProfile = (id, currentUser, callback) => {

        const queryString = "SELECT * FROM users WHERE id='" + id + "';";
        const queryString2 = "SELECT * FROM follow WHERE username_id='" + id + "' AND follower='" + currentUser + "';";

        dbPoolInstance.query(queryString, (error, result) => {

            var endResult = result.rows[0];

            dbPoolInstance.query(queryString2, (error, result) =>{

                if (result.rows.length === 0) {
                    endResult['followed'] = false;
                } else {
                    endResult['followed'] = true;
                }
                callback(error, endResult);
            });
        });
    };

    const editProfile = (input, id, callback) => {

        let queryString = "UPDATE users SET age=($1), description=($2) WHERE id=($3);"

        let values = [input.age, input.description, id];

        dbPoolInstance.query(queryString, values, (error, result) => {

            callback(error);
        });
    };

    const deleteProfile = (id, callback) => {

        let queryString = "DELETE FROM users WHERE id='" + id + "';";
        let queryString2 = "DELETE FROM follow WHERE username_id='" + id + "' OR follower='" + id + "';";
        let queryString3 = "DELETE FROM tweet WHERE user_id='" + id + "';";

        dbPoolInstance.query(queryString, (error, result) => {

            dbPoolInstance.query(queryString2, (error, result) => {

                dbPoolInstance.query(queryString3, (error, result) => {

                    callback(error);
                });
            });

        });
    };

    const follow = (id, currentUser, callback) => {

        let queryString = "INSERT INTO follow (username_id, follower) VALUES ($1,$2);";

        let values = [id, currentUser];

        dbPoolInstance.query(queryString, values, (error, result) => {

            callback(error);
        });
    };

    return {
      create,
      showProfile,
      editProfile,
      deleteProfile,
      follow
    };
};
