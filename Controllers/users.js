module.exports = (db) => {


    const loginForm = (request, response) => {
        let loggedin = request.cookies['loggedin'];
        let user = request.cookies['user'];

        if (loggedin === undefined) {
            response.render('../views/user/Login.jsx');
        } else {
            response.redirect("/user/profile");
        }
    }

    const loginCheck = (request, response) => {
        db.users.retrieveUser(request.body, (error, queryResult) => {
            if (error) {
                console.error('error getting login information:', error);
                response.send('Error at logincheck.');
            } else {
                if (queryResult.rows.length === 0) {
                    response.send("Wrong username or password. Please try again.")
                } else {
                      response.cookie('loggedin', 'true');
                      response.cookie('user', queryResult.rows[0].username);
                      response.redirect("/user/profile");
                }
            }
        })
    }


    const createNewUser = (request, response) => {
        db.users.createUser(request.body, (error, queryResult) => {
            if (error) {
                console.error('error getting pokemon:', error);
                response.sendStatus(500);
            }

            if (queryResult.rowCount >= 1) {
                console.log('Pokemon created successfully');
            } else {
                console.log('Pokemon could not be created');
            }
            // redirect to home page after creation
        });
    };


    const logout = (request, response) => {
        response.clearCookie('loggedin');
        response.clearCookie('user');
        response.redirect('/login');
    }

    // Export controller functions as a module
    return {
        loginForm,
        loginCheck,
        createNewUser,
        logout
    };

}