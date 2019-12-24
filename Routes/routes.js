module.exports = (app, db) => {
    const users = require('../Controllers/users.js')(db);
    
    app.get('/login', users.loginForm);
    app.post('/login', users.loginCheck);
    app.post('/users/new', users.createNewUser);
    app.get('/logout', users.logout)


}
