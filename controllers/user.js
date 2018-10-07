module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const login = (request, response) => {
    response.render('user/login');
  };

  const loginAuthentication = (request, response) => {

    db.user.authentication (request.body, (error, queryResult, loginValue)=>{

    let redirectUrl = '/userpage/' + request.body.name

        response.cookie('loggedIn', loginValue);
        response.cookie('username', request.body.name);

    response.redirect(redirectUrl);
    });
  };


  const newForm = (request, response) => {
    response.render('user/NewUser');
  };

  const create = (request, response) => {
      // use user model method `create` to create new user entry in db
      db.user.create(request.body, (error, queryResult) => {
        // queryResult of creation is not useful to us, so we ignore it
        // (console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)
        console.log(queryResult)

        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully');

          // drop cookies to indicate user's logged in status and username
          response.cookie('loggedIn', true);
          response.cookie('username', request.body.name);
        } else {
          console.log('User could not be created');
        }

        // redirect to home page after creation
        response.redirect('/');
      });
  };

  const userPage = (request, response) => {

    let username = request.cookies.username

    db.user.displayTweet(username, (error, queryResult) => {

    let playerPageData = {"username": username, "queryResult": queryResult}

    response.render('user/UserPage' , {"playerdata":playerPageData});

    })

  };

  const storeTweet = (request, response) => {

    db.user.storeTweetInTable(request.body, (error, queryResult) => {

    let username = request.body.username
    let url = '/userpage/' + username

    response.redirect(url);

    })
  };


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    login,
    loginAuthentication,
    userPage,
    storeTweet
  };
};
