const sha256 = require('js-sha256')

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

      // const queryString = 'INSERT INTO users (name) VALUES ($1, $2) RETURNING id';

      const values = [request.body.name];

      console.log(queryString);

        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('User created successfully');

          // drop cookies to indicate user's logged in status and username
          response.cookie('loggedIn', currentSessionCookie);
          response.cookie('username',  queryResult.rows[0].user_id);
          // response.cookie('username', request.body.name);
        } else {
          console.log('User could not be created');
        }

        // redirect to home page after creation
        response.redirect('/');
      });
  };


const loginForm = (request, response) => {
    response.render('user/loginUser');
}

const loginUser = (request, response) => {
    db.users.login(request.body, (err, queryResult) => {
        if(err) {
            console.log('Query error', err.stack);
            response.sendStatus(500);
        }

    let hashedPass = sha256(request.body.password)

         if (queryResult.rows[0] !== undefined && queryResult.rows[0].password === hashedPass) {
             response.cookie('loggedIn', currentSessionCookie);
             response.cookie('username',  queryResult.rows[0].user_id);

             console.log('Welcome, you entered the portal, you are succesfully logged in');
             respose.redirect('/')
         } else {
             console.log('Go away user, you coudnt be logged in')
         }
     });
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
    loginUser

  };
};

