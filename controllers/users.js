var sha256 = require('js-sha256');
var SALT = "tweedr";


module.exports = (db) => {

    const registerControllerCallback(request,response) => {

        let hashedPassword = sha256(request.body.password + SALT);

        const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';

        const values = [
        request.body.username,
        hashedPassword,
    ];

        db.tweedr.getUsers(queryString, values, (err,result) =>{


        if (err) {
          console.error('query error:', err.stack);
          response.send( 'query error' );
        } else {
          console.log('query result:', result);

          response.redirect('/login');

        }

    });


    const indexControllerCallback(request,response) => {

        db.tweedr.getAll(queryString, (err, result) => {
        let tweets = {};
        tweets.list=[];
        for(let i = 0; i < result.rows.length; i++){
              tweets.list.push(result.rows[i]);
        }
        response.render('Home', tweets);
        });

    }

    const loginControllerCallback(request,response) =>{

        let requestUsername = request.body.username;
        let requestPassword = request.body.password;

        const queryString = "SELECT * FROM users WHERE username= '"+requestUsername+"'";

        db.tweedr.getUsers(queryString, (err, result) => {

            if (err) {
                console.error('query error: ', err.stack);
                response.send('query error');
            } else {
                console.log('query result: ', result.rows);


        if (result.rows.length > 0) {

            let hashedRequestPassword = sha256(requestPassword + SALT);

            if (hashedRequestPassword === result.rows[0].password) {
                let user_id = result.rows[0].id
                let hashedCookie = sha256(SALT+ user_id);


                response.cookie('user_id', user_id);
                response.cookie('hasLoggedIn', hashedCookie);

                response.redirect('/');
            } else {
                response.status(403).send('wrong password');
            }

        }

            else {
                response.status(403).send('NO USERNAME!');
            }
            }

        });
    }

    const tweetControllerCallback(request,response) => {
        response.render('tweet');
    }

    const newTweetControllerCallback(request,response) => {

        const newTweet = 'INSERT INTO tweets (content) VALUES ($1)';
        console.log(request.body);
        let values = [request.body.tweets];
        console.log(values);

        db.tweedr.tweedr(newTweet, values, (err, result) => {

          let tweets =[];

          for(let i = 0; i < result.rows.length; i++){
                  tweets.push(result.rows[i]);
              }
            console.log(result.rows);
            response.redirect('/');
        });

    }

    const cookieControllerCallback(request,response) =>{
        let user_id = request.cookies['user_id'];
        let hashedValue = sha256(SALT + user_id);


        if (request.cookies['hasLoggedIn'] === hashedValue) {
            response.send("LOGGED IN");
        } else {
            response.redirect('/login');
        }


    }



}

return{
    register : registerControllerCallback,
    index : indexControllerCallback,
    login : loginControllerCallback,
    tweet : tweetControllerCallback,
    newTweet : newTweetControllerCallback,
    cookie : cookieControllerCallback
}


}