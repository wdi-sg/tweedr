const sha256 = require('js-sha256');
const SALT = 'fQdkaUjfieowavwEivorutyFvdaljfLoewKdkfj';

module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const loginForm = (request, response) => {
    response.render('Login');
  };

  const login = (request, response) => {
    db.user.get(request.body.name, (error, queryResult) => {
      if (error) {
        response.render('Login', { error: 'Invalid username' });
      } else {
        const hashedPassword = sha256(request.body.password);
        if (hashedPassword !== queryResult.password) {
          response.render('Login', { error: 'Invalid password' });
        } else {
          const hashedUsername = sha256(queryResult.name + 'loggedIn' + SALT);
          response.cookie('username', queryResult.name);
          response.cookie('loggedIn', hashedUsername);
          response.redirect('/tweets');
        }
      }
    });
  };

  const logout = (request, response) => {
    response.clearCookie('username');
    response.clearCookie('loggedIn');
    response.redirect('/');
  };

  const newForm = (request, response) => {
    response.render('user/NewUser');
  };

  const index = (request, response) => {
    const username = request.cookies.username;
    db.user.index(username, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        const hashedUsername = sha256(username + 'loggedIn' + SALT);
        let data = { users: queryResult };
        if (hashedUsername === request.cookies.loggedIn) {
          data.username = username;
        }

        db.user.following(username, (error, queryResult) => {
          if (error) {
            response.sendStatus(500);
          } else {
            data.following = queryResult.map(user => user.user_name);
            response.render('user/Index', data);
          }
        });
      }
    });
  };

  const create = (request, response) => {
    db.user.get(request.body.name, (error, queryResult) => {
      if (!error) {
        response.render('user/NewUser', { error: 'Name already exists.' });
      } else {
        db.user.create(request.body, (error, queryResult) => {
          if (error) {
            response.sendStatus(500);
          } else {
            const hashedUsername = sha256(queryResult.name + 'loggedIn' + SALT);
            response.cookie('username', queryResult.name);
            response.cookie('loggedIn', hashedUsername);
          }

          response.redirect('/tweets');
        });
      }
    });
  };

  const get = (request, response) => {
    db.user.get(request.params.name, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        const username = request.cookies.username;
        const hashedUsername = sha256(queryResult.name + 'loggedIn' + SALT);
        const data = { user: queryResult };
        if (hashedUsername === request.cookies.loggedIn) {
          data.username = username;
        }

        db.tweet.get(request.params.name, (error, queryResult) => {
          if (error) {
            response.sendStatus(500);
          } else {
            data.tweets = queryResult;
            response.render('user/Show', data);
          }
        });
      }
    });
  };

  const follow = (request, response) => {
    const user = request.body.user_name;
    const follower = request.body.follower_name;
    db.user.follow(user, follower, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.redirect('back');
      }
    });
  };

  const unfollow = (request, response) => {
    const user = request.body.user_name;
    const follower = request.body.follower_name;
    db.user.unfollow(user, follower, (error, queryResult) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.redirect('back');
      }
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    loginForm,
    login,
    logout,
    newForm,
    index,
    create,
    get,
    follow,
    unfollow
  };
};
