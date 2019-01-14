module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const home = (request, response) => {
    db.tweets.getLogin((error, result) => {
        response.render('user/login')
    })
  }

  const signIn = (request, response) => {
    db.tweets.getSignIn(request.body,(error, result) => {
        if ( result.rows.length === 0 ) {
            console.log("user doesnt exist");
            response.send('User not found');
        }
        else {
            console.log("user exists!!!!!!");

            const user = result.rows[0];
            let password = user.password;

            if ( password == request.body.password ) {
                //password is correct
                console.log('PASS WORD CORRECT TOO');
                response.cookie('loggedin', 'true');
                response.redirect('/tweets');
            }
            else {
                // password is incorrect
                console.log('PASS WORD not correct');
                response.send('Password incorrect')
            }

        };
    })
  }

  const index = (request, response) => {
      db.tweets.getAllTweets((error, result) => {
        response.render('user/newtweets', { tweets: result.rows });
      });
  };

  const signOut = (request, response) => {
    db.tweets.getSignOut((error, result) => {
        response.clearCookie('loggedin');
        response.redirect('/')
    })
  }

  const users = (request, response) => {
      db.tweets.getUsers(request.body, (error, result) => {
        // response.redirect('/');
        response.render("user/NewUser", {user: result.rows});
      });
  };

  const newUser = (request, response) => {
    db.tweets.getNew((error, result) => {
        response.render('user/NewUser');
    })
  }

  const postTweets = (request, response) => {
    db.tweets.getNewTweets(request.body, (error, result) => {
        // response.redirect('/tweets');
        response.render("user/newtweets", {tweets: result.rows});
    })
  }

  const username = (request, response) => {
    db.tweets.getUsername(request.body, (error, result) => {
        // response.redirect('/tweets');
        response.render("user/profile", {tweets: result.rows});
    })
  }

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    home,
    index,
    signIn,
    signOut,
    users,
    newUser,
    postTweets,
    username
  };

}