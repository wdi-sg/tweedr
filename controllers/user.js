const sha256 = require('js-sha256');

module.exports = (db) => {
const SALT = "Climbing is fun";
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const loginPost = (request, response) => {
    db.user.getUser(request.body.name, (error, modelResultUser) => {
      console.log('callback: ', modelResultUser);

      if(error){
        console.log('error');
        response.status(500).send('It didnt work!');
      }
      else if(modelResultUser === null){
          response.status(403).send('Cannot login!');
      }
      else{
        console.log( modelResultUser);
        //Hash password
        let hashedValue = sha256(request.body.password);
        //Hash current cookie
        let currentSessionCookie = sha256(SALT + request.cookies['username']);

        console.log('database: ', modelResultUser.password);
        console.log('input: ', hashedValue);

        if(modelResultUser.password === hashedValue){
          //authenticate & set cookie
          response.cookie('loggedIn', currentSessionCookie);
          response.cookie('username', request.body.name);
          //response.cookie("username", queryResult.rows[0].nane);
          console.log('User successfully logged in');
          response.redirect('/')

        }
        else{
          response.status(403).send('NOPE, CANT SEEM TO LOG YOU IN');
        }
      }
    });
  };

  const login = (request, response) => {
    response.render('user/UserLogin');
  };

  const newForm = (request, response) => {
    response.render('user/NewUser');
  };

  const create = (request, response) => {
      // use user model method `create` to create new user entry in db
      db.user.create(request.body, (error, queryResult) => {
        // queryResult of creation is not useful to us, so we ignore it
        // (console log it to see for yourself)
        //console.log("queryResult", queryResult);
        // (you can choose to omit it completely from the function parameters)

        if (error) {
          console.error('error getting user:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {

          console.log('User created successfully');
          //Hash current cookie
          let currentSessionCookie = sha256(SALT + request.cookies['username']);
          // drop cookies to indicate user's logged in status and username
          response.cookie('loggedIn', currentSessionCookie);
          response.cookie('username', request.body.name);
        } else {
          console.log('User could not be created');
        }

        // redirect to home page after creation
        response.redirect('/');
      });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    loginPost,
    login,
    newForm,
    create
  };
};
