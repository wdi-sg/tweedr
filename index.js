const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const pg = require('pg');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const configs = {
    user: 'cash',
    host: '127.0.0.1',
    database: 'testdb',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

// Root GET req (it doesn't belong in any controller file)
app.get('/', (req, res) => {
    let loggedin = req.cookies['loggedin'];
    if (loggedin == undefined) {
        res.render('main')
    } else {
        let tempArr = [];
        let getusers = `select * from users;`
        let gettweets = `select * from tweets;`
        let getfollows = `select * from getfollows;`
        pool.query(getusers, (err, result1) => {
            tempArr.push(result1.rows);
        })
        pool.query(gettweets, (err, result2) => {
            tempArr.push(result2.rows);
        })
        pool.query(getfollows, (err, result3) => {
            tempArr.push(result3.rows);
        })
        let passObj = {
            tempArr
        }
        res.render('loggedmain', {
            passObj: passObj
        });
    };
});

app.post('/login', (req, res) => {
    let testlogin = `select * from users where username='${req.body.username}';`
    pool.query(testlogin, (err, result) => {
        if (result.rows.length == 0) {
            console.log(req.body.username)
            console.log('username error')
            res.render('loginerror');
        } else {
            if (result.rows[0].password == req.body.password) {
                let tempArr = [];
                tempArr.push(result.rows)
                let getusers = `select * from users;`
                let gettweets = `select * from tweets;`
                let getfollows = `select * from getfollows;`
                pool.query(getusers, (err, result1) => {
                    tempArr.push(result1.rows);
                })
                pool.query(gettweets, (err, result2) => {
                    tempArr.push(result2.rows);
                })
                pool.query(getfollows, (err, result3) => {
                    tempArr.push(result3.rows);
                })
                let passObj = {
                    tempArr
                }
                res.render('loggedmain', {
                    passObj: passObj
                });
            } else {
                console.log('password error')
                res.render('loginerror');
            };
        };
    });
});

app.get('/users/new', (req, res) => {
    res.render('createacc');
});


app.post('/users', (req, res) => {

    const queryString = 'INSERT INTO users (username, firstname, lastname, password, email) VALUES ($1, $2, $3, $4, $5)';
    const values = [
        req.body.username,
        req.body.firstname,
        req.body.lastname,
        req.body.password,
        req.body.email
    ];

    pool.query(queryString, values, (error, queryResult) => {
        //res.redirect('/');
        if (error) {
            console.log(error.stack)
        }
        console.log('user created');
        res.render('main');
    });
});



/**
 * ===================================
 * Listen to reqs on port 3000
 * ===================================
 */

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

    server.close(() => {
        console.log('Process terminated')
        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);