const sha256 = require('js-sha256');
const SALT = 'tweedr';

module.exports = (db) => {

    const newForm = (req, res) => {
        res.render('user/NewUser', {cookies: req.cookies});
    };

    const create = (req, res) => {
        db.user.create(req.body, (err, result) => {

            if (err) {
                console.log('Error:', err);
                res.sendStatus(500);
            }

            if (result.rowCount >= 1) {
                console.log('User created successfully');

                console.log(result.rows)

                // Hashing the password
                let sessionCookie = sha256(SALT + result.rows[0].username)

                res.cookie('loggedIn', sessionCookie);
                res.cookie('user', result.rows[0].username);
                res.cookie('id', result.rows[0].id);

                res.redirect('/users');

            } else {
                res.send('User could not be created');
            }
        });
    };

    const loginpage = (req, res) => {
        res.render('user/loginpage');
    };

    const loggingIn = (req, res) => {
        db.user.login(req.body, (err, result) => {
            if(err) {
                console.log('Error: ', err);
                res.sendStatus(500);
            }

            if ( result.rows[0] != undefined ) {

                let hashPW = sha256(SALT + req.body.password);

                let sessionCookie = sha256(SALT + result.rows[0].username);

                    if ( result.rows[0] != undefined && result.rows[0].password == hashPW ) {
                    res.cookie('loggedIn', sessionCookie);
                    res.cookie('user', result.rows[0].username);
                    res.cookie('id', result.rows[0].id);

                    res.redirect('/users/'+result.rows[0].username+'/userpage');
                } else {
                    res.send('Could not log in!');
                };
            };
        });
    };

    const userpage = (req, res) => {
        db.user.userpage(req.params, (err, result) => {

            if(err) {
                console.log('Error: ', err);
            } else {
                res.render('user/userpage', {user: result.rows, cookies: req.cookies, params: req.params});
            };
        });
    };

    const followUser = (req, res) => {
        db.user.followUser(req.cookies, req.params, (err, result) => {
            if(err) {
                console.log('Error: ', err);
            } else {
                res.redirect('/');
            };
        });
    };

    const logout = (req, res) => {
        res.clearCookie('loggedIn');
        res.clearCookie('user');
        res.clearCookie('id');
        res.redirect('/users');
    };

    const allusers = (req, res) => {
        db.user.allusers(req.cookies, (err, result) => {
            if(err) {
                console.log('Error: ', err);
            } else {
                res.render('user/allusers', {user: result.rows, cookies: req.cookies});
            };
        });
    };

    return {
        newForm,
        create,
        loginpage,
        loggingIn,
        userpage,
        followUser,
        logout,
        allusers
    };
};