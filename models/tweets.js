const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope
    let getAll = (loggedinCookie, nameCookie, callback) => {
        let query = "SELECT * FROM tweets INNER JOIN users ON (tweets.author_id = users.id) ORDER BY tweeted_on DESC;";
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.error('query error:', err.stack);
                callback(err, null);
            } else {
                let resultArr = [result.rows];
                resultArr.push(loggedinCookie);

                if (loggedinCookie) {
                    query = `SELECT * FROM users WHERE name='${nameCookie}';`;
                    dbPoolInstance.query(query, (err, result) => {
                        if (err) {
                            console.error('query error:', err.stack);
                            callback(err, null);
                        } else {
                            resultArr.push(result.rows);
                            callback(err, resultArr);
                        }
                    })
                } else {
                    callback(err, resultArr);
                }
            }
        });
    };

    let sign = (userForm, callback) => {
        switch (userForm.func) {
            case 'signin':
                let query = `SELECT * FROM users WHERE name='${userForm.name}'`;
                dbPoolInstance.query(query, (err, result) => {
                    if (err) {
                        console.error('query error:', err.stack);
                        callback(err, null);
                    } else {
                        if ( result.rows.length === 0 ) {
                            callback(null, null);
                        } else {
                            const user = result.rows[0];
                            let password = user.password;
                            if (password == sha256(userForm.password)) {
                                callback(null, null, 'signin', userForm.name);
                            } else {
                                callback(null, null);
                            }
                        }
                    }
                });
                break;

            case 'signout':
                callback(null, null, 'signout');
                break;

            case 'signup':
                const values = [userForm.name, sha256(userForm.password)];
                let text = "INSERT INTO users (name, password) VALUES ($1, $2)";

                dbPoolInstance.query(text, values, (err, result) => {
                    if (err) {
                        console.error('query error:', err.stack);
                        callback(err, null);
                    } else {
                        callback(null, null, 'signin', userForm.name);
                    }
                });
                break;
        }
    };

    let create = (userForm, nameCookie, callback) => {
        let query = `SELECT * FROM users WHERE name='${nameCookie}';`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.error('query error:', err.stack);
                callback(err, null);
            } else {
                let query =`INSERT INTO tweets (content, author_id) VALUES ('${userForm.tweet}', ${result.rows[0].id})`;

                dbPoolInstance.query(query, (err, result) => {
                    if (err) {
                        console.error('query error:', err.stack);
                        callback(err, null);
                    } else {
                        callback(null, null);
                    }
                });
            }
        });
    };

    return {
        getAll,
        sign,
        create,
    };
};