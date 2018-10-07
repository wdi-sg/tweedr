var sha256 = require('js-sha256');


module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
    response.render('user/newUser');
  };

  const userRoot = (request, response) => {
    response.clearCookie('user_id');
    response.clearCookie('username');
    response.cookie('logged_in', false);

    response.render('user/userLogin');
  };

  const create = (request, response) => {
    // use user model method `create` to create new user entry in db
    db.user.create(request.body, (error, queryResult) => {
      // queryResult of creation is not useful to us, so we ignore it
      //console.log("query result:",queryResult);
      console.log(request.body);
      // (you can choose to omit it completely from the function parameters)

      if (error) {
        console.error('error getting user:', error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        console.log('User created successfully');

        // drop cookies to indicate user's logged in status and username
        response.cookie('logged_in', true);
        response.cookie('username', request.body.name);
      } else {
        console.log('User could not be created');
      }

      // redirect to home page after creation
      response.redirect('/');
    });
  };

  const userLogin = (request, response) => {

    db.user.userLogin(request.body, (error, result) => {
      //console.log(request.body);
      console.log("result controller: ", result.rows);
      if(error) {
        console.error("Query error", error);
      }

      else if(result.rows[0]!=undefined){
        if(sha256(request.body.password) === result.rows[0].password){
          response.clearCookie('logged_in');
          response.cookie('logged_in', true);
          response.cookie('username', request.body.name);
          response.cookie('user_id', result.rows[0].id);
          response.status(200).redirect('/tweets');
        }
        else {response.send("wrong password");}
      }
      else {response.send("no such user");}
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
    userLogin,
    userRoot
  };

};
