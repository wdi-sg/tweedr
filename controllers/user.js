var sha256 = require('js-sha256');
const SALT = "MVC is so confusing";

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const newForm = (request, response) => {
    response.render('user/NewUser', {cookie: request.cookies['taken']});
  };

  const create = (request, response) => {
      // use user model method `create` to create new user entry in db
      db.user.create(request.body, (error, queryResult) => {

        if (error) {
          console.error('error creating user:', error);
          response.sendStatus(500);
        }

        if (request.cookies['wrongInput'] === 'true') {

            response.clearCookie('wrongInput');
        }

        if (request.cookies['taken'] === 'true') {

            response.clearCookie('taken');
        }

        if (queryResult === undefined) {

            response.redirect('/login');
        } else {

            response.cookie('taken', true);
            response.redirect('/register')
        }

      });
  };

  const profilePage = (request, response) => {

    db.user.showProfile(request.params.id, request.cookies['userId'], (error, queryResult) => {

        if (error) {
            console.log("error showing profile: ". error.message);
            response.sendStatus(500);
        }

        let cookies = {

            check: sha256(SALT + "logged in"),
            loginStatus: request.cookies['loginStatus'],
            username: request.cookies['username'],
            userId: request.cookies['userId']
        };

        response.render('user/profile', {user: queryResult, cookie: cookies});
    });
  };

  const editProfileForm = (request, response) => {

    if (request.cookies['loginStatus'] === sha256(SALT + 'logged in') && request.cookies['userId'] == request.params.id) {

        db.user.showProfile(request.params.id, request.cookies['userId'], (error, queryResult) => {

            response.render('user/EditProfile', {user: queryResult});
        });
    } else {
        response.sendStatus(403);
    }
  };

  const editProfile = (request, response) => {

     db.user.editProfile(request.body, request.params.id, (error) => {

        if (error) {
            console.log("error in updating profile: ", error.message);
            response.sendStatus(500);
        }

        response.redirect('/users/' + request.params.id);
     });
  };

  const deleteProfile = (request, response) => {

    db.user.deleteProfile(request.params.id, (error) => {

        if (error) {
            console.log("error deleting user: ", error.message);
            response.sendStatus(500);
        }

        response.clearCookie('loginStatus');
        response.clearCookie('userId');
        response.clearCookie('username');
        response.redirect('/');
    });
  };

  const follow = (request, response) => {

    db.user.follow(request.params.id, request.cookies['userId'], (error) => {

        if (error) {

            console.log("error in following: ", error.message);
            response.sendStatus(500);
        }

        response.redirect('/users/' + request.params.id);
    });
  };

  const unfollow = (request, response) => {

    db.user.unfollow(request.params.id, request.cookies['userId'], (error) => {

        if(error) {
            console.log("error unfollowing: ", error.message);
            response.sendStatus(500)
        }

        response.redirect('/users/' + request.params.id);
    });
  };

  const uploadImage = (request, response) => {

    // User did not upload file
    if(!request.files) {
        console.log("No image was uploaded.");
        response.sendStatus(400);
    }

    const uploadedFile = request.files.profilePic;

    uploadedFile.mv('public/media/'+ uploadedFile.name, (error) => {

        if (error) {
            console.log("fail to move file");
            response.sendStatus(500);
        }

        let path = '/media/' + uploadedFile.name;

        db.user.uploadImage(request.cookies['userId'], path, (error) => {

            if(error) {
                console.log("error inserting path into db: ", error.message);
                response.sendStatus(500);
            }

            response.redirect('/users/' + request.params.id);
        });
    });
  };

  const search = (request, response) => {

    let cookies = {

        check: sha256(SALT + "logged in"),
        loginStatus: request.cookies['loginStatus'],
        username: request.cookies['username'],
        userId: request.cookies['userId']
    };

    if (request.query.users === 'followers') {

        db.user.searchFollowers(request.cookies['userId'], (error, queryResult) => {

            if(error) {
                console.log("error looking for followers: ", error.message);
                response.sendStatus(500);
            }

            response.render('user/search', {users: queryResult, cookie: cookies});
        });

    } else if (request.query.users === 'following') {

        db.user.searchFollowing(request.cookies['userId'], (error, queryResult) => {

            if(error) {
                console.log("error looking for following: ", error.message);
                response.sendStatus(500);
            }

            response.render('user/search', {users: queryResult, cookie: cookies});
        });

    } else {

        db.user.searchAll(request.cookies['userId'], (error, queryResult) => {

            if(error) {
                console.log("error looking for all users: ", error.message);
                response.sendStatus(500);
            }

            response.render('user/search', {users: queryResult, cookie: cookies});
        });
    }

  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    profilePage,
    editProfileForm,
    editProfile,
    deleteProfile,
    follow,
    unfollow,
    uploadImage,
    search
  };
};
