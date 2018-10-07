var sha256 = require('js-sha256');

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
      response.render('user/NewUser');
  };

  const create = (request, response) => {
      // use user model method `create` to create new user entry in db
      db.user.create(request.body, (error, queryResult) => {
        // queryResult of creation is not useful to us, so we ignore it
        // (console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)

        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully');

          //response.cookie('username', request.body.name);
        } else {
          console.log('User could not be created');
        }

        // redirect to home page after creation
        response.redirect('/');
      });
  };

  /**
   * ===========================================
   * Login Function for user
   * ===========================================
   */

  const loginForm = (request, response) => {
      response.render('user/LoginPage');
  };

  const loginStatus = (request, response) => {
      db.user.login(request.body, (error, queryResult) => {
        if (error) {
            console.error('Query error:', error.stack);
        } else {
            //console.log(res.rows[0].id);
            if (Object.keys(queryResult.rows).length == 0){
                response.send("Cannot find username!");
            }
            else {
                // run user input password through bcrypt to obtain hashed password
                console.log('QUERYRESULTS LOGINSTATUS: ', queryResult.rows);
                var hashedValue = sha256(request.body.password);
                let user_id = queryResult.rows[0].id;
                if(hashedValue === queryResult.rows[0].hashedpassword){
                    response.cookie('ID cookie ', user_id);
                     // drop cookies to indicate user's logged in status and username
                    response.cookie('loggedIn', hashedValue);
                    response.cookie('Username', request.body.name);
                    //response.render('user/Index', {user:queryResult.rows});
                    response.redirect('/');
                }

                else{
                    response.send('PASSWORD DOES NOT MATCHED! PLEASE TRY AGAIN!');
                    //response.redirect('/users/login'); //Somehow still got a cookie added!
                }
            }
        }
      })
  }

  //Displaying user index page
  const userPage = (request, response) => {
        //console.log("Rest cookies: ", request.cookies)
     db.user.userDisplay(request.params, (err, queryResult) => {
          if (err) {
            console.error('error getting user:', err);
            response.sendStatus(500);
          }
          else {
            console.log("QUERY RESULTS.ROWS: ", queryResult.rows);
            response.render('user/Index', {users: queryResult.rows, cookies:request.cookies})
          }
      })
  }

  /**
   * ===========================================
   * Following other users
   * ===========================================
   */

   const followPage = (request, response) => {
      response.render('user/Follow');
   }


   const followPost = (request, response) => {

    db.user.followUser(request.body, request.cookies, (err, queryResult) => {
        //console.log("request.body: ", request.body);
          if (err) {
            console.error('error getting user:', err);
            response.sendStatus(500);
          }
          else {
            console.log("QUERY RESULTS.ROWS: ", queryResult.rows);
            response.send("FOLLOW SUCCESSFULLY!");
          }
      })
   }



  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    loginForm,
    loginStatus,
    userPage,
    followPage,
    followPost
  };
};
