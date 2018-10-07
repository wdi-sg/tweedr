var sha256 = require('js-sha256');

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

   const SALT = "not all those who wander are lost";

   const getRoot = (request, response)  => {
        response.render('user/home');
   };


    const newForm = (request, response) => {
        response.render('user/NewUser');
    };

    const create = (request, response) => {
      // use user model method `create` to create new user entry in db

      console.log(request.body);

      db.user.create(request.body, (error, queryResult) => {


        // queryResult of creation is not useful to us, so we ignore it
        // (console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)

        console.log('create QR:',queryResult);

        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        };

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully');

          // drop cookies to indicate user's logged in status and username

          let currentSessionCookie = sha256(request.body.name + 'logged_id' + SALT);

          response.cookie('logged_in', currentSessionCookie);
          response.cookie('username', request.body.name);

        } else {

          console.log('User could not be created');

        }

        // redirect to home page after creation
        response.redirect('/home/'+request.body.name);

      });
  };


    const userHome = (request, response) => {

        let ownerName = request.params.name;
        console.log(request.params);

        // console.log("userhome-control-ownerName", ownerName);


        db.user.userHome(ownerName, (error, queryResult) => {

            console.log("userhome-ctrl QR.rows", queryResult.rows);


            if(error) {

                console.error('userhome not loading:', error);

                response.sendStatus(500);
            }

            if (queryResult.rows.length !== 0) {
        response.render('userhome', {tweets: queryResult.rows});
        } else {
            response.render('userhome', {tweets: request.params});
        };

        });
    };


    const loginForm = (request, response) => {
            response.render('user/ExistingUser');
        };


    const existing = (request, response) => {

        db.user.existing(request.body, (error, queryResult) => {


            console.log("existing-control QR", queryResult);
            console.log("exist-ctrl reqbody", request.body);

            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);

            };

            var enteredValue = sha256(request.body.password);
            console.log("user entered pw:", enteredValue);

            if(queryResult.rowCount < 1) {
                response.redirect('/users/new');

            } else if (enteredValue === queryResult.rows[0].password ) {

                let currentSessionCookie = sha256(request.body.name + 'logged_id' + SALT);
                response.cookie('logged_in', currentSessionCookie);
                response.redirect ('/home/'+ queryResult.rows[0].name);

                } else {
                    response.render('user/wrongPw')
                };
        })
    };



    const newPost = (request, response) => {

        console.log("newpost controller", request.body);

        db.user.newPost(request.body, (error, queryResult) => {

        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        };

        if (queryResult.rowCount >= 1) {
          console.log('Post created successfully');

        } else {

          console.log('Post could not be created');

        };

        // redirect to home page after creation
        response.redirect('/home/'+request.body.name);

      });
    };


    const cookieClear = (request, response) => {

        if(sha256( request.cookies["request.body.name"] + 'logged_in' + SALT ) === request.cookies["logged_id"] ){

                response.clearCookie('logged_in');

            };
    };

    const logOut = (request,response) => {

        response.redirect('/');
    };



  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    loginForm,
    userHome,
    existing,
    newPost,
    cookieClear,
    logOut
  };
};
