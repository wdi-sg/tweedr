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
              const queryString = 'INSERT INTO users (username, password, age, description, image) VALUES ($1, $2, $3, $4, $5)';
              const values = [
                user.username,
                hashedValue,
                undefined,
                '',
                '/media/image.png'
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
        const queryString3 = "SELECT users.username FROM users INNER JOIN follow ON (follow.follower = users.id) WHERE follow.username_id='" + id + "';";
        const queryString4 = "SELECT users.username FROM users INNER JOIN follow ON (follow.username_id = users.id) WHERE follow.follower='" + id + "';";

        dbPoolInstance.query(queryString, (error, result) => {

            if (error) {
                console.log("query error message: ",error.message);
            }

            var endResult = result.rows[0];

            dbPoolInstance.query(queryString2, (error, result) =>{

                if (result === undefined || result.rows.length === 0) {
                    endResult['followed'] = false;
                } else {
                    endResult['followed'] = true;
                }

                dbPoolInstance.query(queryString3, (error, result) => {

                    endResult['followers'] = result.rows;

                    dbPoolInstance.query(queryString4, (error, result) => {

                        endResult['following'] = result.rows;

                        callback(error, endResult);
                    });
                });
            });
        });
    };

    const editProfile = (input, id, callback) => {

        let queryString = "UPDATE users SET age=($1), description=($2), image=($3) WHERE id=($4);"

        let values = [input.age, input.description, input.profilePic ,id];

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

    const unfollow = (id, currentUser, callback) => {

        let queryString = "DELETE FROM follow WHERE username_id='" + id + "' AND follower='" + currentUser + "';";

        dbPoolInstance.query(queryString, (error, result) => {
            callback(error);
        });
    };

    const uploadImage = (currentUser, path, callback) => {

        const queryString = "UPDATE users SET image=($1) WHERE id=($2);"

        const values = [path, currentUser];

        dbPoolInstance.query(queryString, values, (error, result) => {
            callback(error);
        });
    };

    const searchAll = (currentUser, callback) => {

        const queryString = "SELECT * FROM users WHERE id!='" + currentUser + "';";

        dbPoolInstance.query(queryString, (error, result) => {

            callback(error, result.rows)
        });
    };

    const searchFollowing = (currentUser, callback) => {

        let queryString = "SELECT users.* FROM users INNER JOIN follow ON (follow.username_id = users.id) WHERE follow.follower='" + currentUser + "';";

        dbPoolInstance.query(queryString, (error, result) => {

            callback(error, result.rows);
        });
    };

    const searchFollowers = (currentUser, callback) => {

        let queryString = "SELECT users.* FROM users INNER JOIN follow ON (follow.follower = users.id) WHERE follow.username_id='" + currentUser + "';";

        dbPoolInstance.query(queryString, (error, result) => {

            callback(error, result.rows);
        });
    };

    return {
      create,
      showProfile,
      editProfile,
      deleteProfile,
      follow,
      unfollow,
      uploadImage,
      searchAll,
      searchFollowers,
      searchFollowing
    };
};
