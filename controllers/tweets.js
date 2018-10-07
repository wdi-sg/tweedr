const sha256 = require('js-sha256');

module.exports = (db) => {
    const SALT = 'tweedr';

    const writeTweet = (req, res) => {
        let sessionHash = sha256(SALT + req.cookies.user);

        if ( req.cookies.loggedIn == sessionHash ) {
            res.render('tweets/writeTweet', {cookies: req.cookies});
        } else {
            res.send('Please login to Tweet!');
        };
    };

    const postTweet = (req, res) => {
        db.tweet.postTweet(req.body, (err, result) => {
            if(err) {
                console.log('Error: ', err);
                res.sendStatus(500);
            }

            if (result.rowCount >= 1) {
                res.redirect(`/users/${req.cookies.user}/userpage`);
            } else {
                res.send('Error! Could not post tweet!')
            }
        })
    }

    return {
        writeTweet,
        postTweet
    };
};