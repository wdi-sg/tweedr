const sha256 = require('js-sha256');
module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */


   const SALT = "i am a bird";

   let publicHome = (request, response) => {
        db.tweedr_db.getAllTweets((error,result) => {
            if (error) {
                console.log('query err', err.message);
            } else {
                response.render('homePublic', result);
            }
        });
   };


   let registerForm = (request, response) => {
    response.render('form_register');
   }


   let register = (request, response) => {
        let name = request.body.name;
        let hashedName = sha256(name + SALT);
        let password = request.body.password;
        let hashedPassword = sha256(password + SALT);
        let profile_url = request.body.profile_url;
        db.tweedr_db.insertRegisterInfo(name, hashedPassword, profile_url, (error, result) => {
            if (error) {
                console.log('query err', error.message);
            } else {
            response.cookie('loggedin', 'true');
            response.cookie('user', name);
            response.cookie('userID', hashedName);
            response.redirect('/');
            }
        });
   };


    let loginForm = (request, response) => {
        response.render('form_login');
    };


    let loginCheck = (request, response) => {
        let user_name = request.body.name;
        db.tweedr_db.getUserLoginInfo(user_name, (error, result) => {
            if (error) {
                    console.log('query err', error.message);
            } else if (result.length === 0) {
                response.send(user_name + " does not exist in our system!");
            } else {
                let hashedPassword = result[0].password;
                let hashedInputPassword = sha256(request.body.password + SALT);
                let hashedName = sha256(user_name + SALT);
                if(hashedPassword === hashedInputPassword) {
                    response.cookie('loggedin', 'true');
                    response.cookie('user', user_name);
                    response.cookie('userID', hashedName);
                    response.redirect('/')
                } else {
                    response.send('Password is incorrect!')
                }
            }
        });
    };


    let userHome = (request, response) => {
        if (request.cookies['user'] !== undefined) {
            let user_name = request.cookies['user'];
            let hashedName = sha256(user_name + SALT);
            if (hashedName === request.cookies['userID']) {
                db.tweedr_db.getProfileTweets(user_name, (error, result) => {
                    response.render('home', result);
                    })}
            else {
                response.redirect('/users/login');
            }
        };
    };


    let postTweet = (request, response) => {
        if (request.cookies['user'] !== undefined) {
            let user_name = request.cookies['user'];
            let hashedName = sha256(user_name + SALT);
            if (hashedName === request.cookies['userID']) {
                let msg = request.body.msg;
                let photo_url = request.body.photo_url;
                db.tweedr_db.insertTweet(user_name, msg, photo_url, (error, result) => {
                    response.redirect('/user');
                });
            } else {
                response.redirect('/users/login');
            }
        }
    }



  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
    return {
    publicHome,
    registerForm,
    register,
    loginForm,
    loginCheck,
    userHome,
    postTweet
    }

}