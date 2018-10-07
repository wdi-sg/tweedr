const sha256 = require('js-sha256');
const SALT = "tweedr";

module.exports = (db) => {

  const newForm = (request, response) => {
    if (request.cookies.loggedin) {
      console.log("User is already logged in!");
      response.redirect("/");
    } else {
      response.render('user/new', {cookies: request.cookies});
    }
  }

  const create = (request, response) => {

    db.user.get(request.body, (error, queryResult) => {

      if (error) {
        console.error('error getting user:', error);
        response.sendStatus(500);
        
      } else if (queryResult.rowCount >= 1) {

        console.log('Username already exists!');
        response.send("A user with this name already exists.");

      } else {
        
        db.user.create(request.body, (error, queryResult) => {
        
          if (error) {
            console.error('error getting user:', error);
            response.sendStatus(500);
          }
    
          if (queryResult.rowCount >= 1) {
            console.log('User created!');
    
            userid = queryResult.rows[0].id;
    
            response.cookie('loggedin', sha256(userid + SALT));
            response.cookie('userid', userid);
            response.cookie('username', request.body.name);

            response.redirect('/');

          } else {
            console.log('User could not be created.');
            response.sendStatus(500);
          }
        })
      }
    })
  }

  const loginPost = (request, response) => {

    db.user.get(request.body, (error, queryResult) => {

      console.log(queryResult);
      
      if (error) {
        console.error('error getting user:', error);
        response.sendStatus(500);

      } else if (queryResult.rowCount === 0) {
        
        console.log('User not found!');
        response.render('user/login', {cookies: request.cookies, errorMessage: "User not found!"});

      } else {

        let userid = queryResult.rows[0].id;
        let username = queryResult.rows[0].name;
        let password = queryResult.rows[0].password;
        
        if (sha256(request.body.password) === password) {

          response.cookie('loggedin', sha256(userid + SALT));
          response.cookie('userid', userid);
          response.cookie('username', username);

          response.redirect('/');
        
        } else {
          console.log('Incorrect password!');
          response.render('user/login', {cookies: request.cookies, errorMessage: "Incorrect password!"});
        }
      } 
    })
  }

  const loginForm = (request, response) => {

    if (request.cookies.loggedin) {
      console.log("User is already logged in!");
      response.redirect("/");
    } else {
      response.render('user/login', {cookies: request.cookies});
    }
  }

  const logout = (request, response) => {

    response.clearCookie('loggedin');
    response.clearCookie('userid');
    response.clearCookie('username');

    response.redirect("/");    
  }

  const index = (request, response) => {

    db.user.index((error, queryResult) => {

      if (error) {
        console.error('error getting users:', error);
        response.sendStatus(500);
			
			} else {

				response.render('user/index', {users:queryResult.rows, cookies: request.cookies});
			}
		})
  }

  const profile = (request, response) => {

    db.user.getById(request.params, (error, queryResult) => {

      if (error) {
        console.error('error getting users:', error);
        response.sendStatus(500);
			
			} else if (queryResult.rowCount === 0) {
        
        console.log('User not found!');
        response.send("User not found!");

      } else {

        let user = queryResult.rows[0];
        
        db.follow.getFollowers(request.params, (error, queryResult) => {

          if (error) {
            console.error('error getting followers:', error);
            response.sendStatus(500);
          
          } else {

            let followers = queryResult.rows;

            db.follow.getFollows(request.params, (error, queryResult) => {

              if (error) {
                console.error('error getting follow:', error);
                response.sendStatus(500);
              
              } else {
    
                let follows = queryResult.rows;
    
                response.render('user/profile', {user: user, followers: followers, follows: follows, cookies: request.cookies});
              }
            })
          }
        })
			}
		})
  }


  return {
    newForm,
    create,
    loginPost,
    loginForm,
    logout,
    index,
    profile
  }
}
