const sha256 = require('js-sha256');
const SALT = 'tweedr';

module.exports = (dbPoolInstance) => {

    const create = (user, callback) => {
        // run user input password through bcrypt to obtain hashed password
        var hashedValue = sha256(SALT + user.password);

        // set up query
        const text = 'INSERT INTO users (username, password) SELECT ($1), ($2) WHERE NOT EXISTS ( SELECT * FROM users WHERE username = ($3)) RETURNING *';

        const values = [
            user.name,
            hashedValue,
            user.name
        ];

        // execute query
        dbPoolInstance.query(text, values, (err, result) => {
            // invoke callback function with results after query has executed
            callback(err, result);
        });
    };

    const login = (user, callback) => {
        const text = `SELECT * FROM users WHERE username = '${user.name}'`;
        dbPoolInstance.query(text, (err, result) => {
            callback(err, result);
        });
    };

    const userpage = (user, callback) => {
        console.log('TEST: ',user.username);
        const text = `SELECT * FROM tweets INNER JOIN users ON tweets.user_id = users.id WHERE users.username = '${user.username}'`
        dbPoolInstance.query(text, (err, result) => {
            callback(err, result);
        });
    };

    const followUser = (user, followedUser, callback) => {
        const text = `INSERT INTO followers (user_id, follower_user_id) VALUES ($1, $2)`;
        const values = [followedUser.id, user_id];
        dbPoolInstance.query(text, values, (err, result) => {
            callback(err, result);
        });
    };

    const allusers = (user, callback) => {
        const text = 'SELECT username FROM users';
        dbPoolInstance.query(text, (err, result) => {
            callback(err, result);
        });
    };

    return {
        create,
        login,
        userpage,
        followUser,
        allusers
    };
};