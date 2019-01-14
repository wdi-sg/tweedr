const cookieParser = require('cookie-parser')
const routes = require('express').Router();
const pg = require('pg');

routes.use(cookieParser());

const configs = {
    user: 'tengchoonhong',
    host: '127.0.0.1',
    database: 'tweedr',
    port: 5432,
};

const pool = new pg.Pool(configs)

routes.get('/', (request, response) => {
    response.send('Welcome To Tweedr.');
});

routes.get('/users/new', (request, response) => {
    response.render('user/newuser');
});

routes.post('/users', (request, response) => {

    const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
    const values = [
        request.body.name,
        request.body.password
    ];

    // execute query
    pool.query(queryString, values, (error, queryResult) => {
        //response.redirect('/');
        response.cookie('loggedin', 'true');

        response.send('user created');
    });
});

routes.get('/users/login', (request, response) => {
    response.render('user/login');
});

routes.post('/users/login', (request, response) => {
    
    const name = `SELECT name FROM users`;
    const password = `SELECT password FROM users`;

    pool.query(name, (err, results) => {
        let checktrue = 0;
        // response.send(results.rows[0].name)
        for (let i = 0; i < results.rows.length; ++i) {
            if (results.rows[i].name == request.body.name) {
                checktrue = 1;
            }
            console.log(results.rows[i].name);
            console.log(request.body.name);
        };

        if (checktrue === 1) {
            response.cookie('loggedin', 'true');
            response.redirect('/users/profile')
        } else {
            response.send(`different user ${request.body.name}`)
        }

    })

})

routes.get('/users/logout', (request, response) => {
    response.clearCookie('loggedin');
    response.send('you are logged out')
})

routes.get('/users/profile', (request, response) => {
    var loggedin = request.cookies['loggedin'];

    // see if there is a cookie
    if ( loggedin === undefined ){
        response.send("youre not logged in");

    } else {
        response.render('user/profile');
    }
})

routes.post('/users/profile', (request, response) => {
    const queryString = `UPDATE users set email = ${request.body.file} WHERE name = test`;

    pool.query(queryString, (err, queryResult) => {
        response.send('picture uploaded');
    });
});


module.exports = routes;