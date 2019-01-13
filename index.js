const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const pg = require('pg');
const sha256 = require('js-sha256');
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const configs = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tweedr',
  port: 5432,
  password: 'pg'
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
//==============================================================



// SHOW ALL TWEETS
//==============================================================
app.get('/', (req, res) => {
    let query = "SELECT * FROM tweets INNER JOIN users ON (tweets.author_id = users.id) ORDER BY tweeted_on DESC;";

    pool.query(query, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            let resultArr = [result.rows];
            resultArr.push(req.cookies['loggedIn']);

            if (req.cookies['loggedIn']) {
                query = `SELECT * FROM users WHERE name='${req.cookies['name']}';`;
                pool.query(query, (err, result) => {
                    if (err) {
                        console.error('query error:', err.stack);
                        res.send( 'query error' );
                    } else {
                        resultArr.push(result.rows);
                        res.render('home', resultArr);
                    }
                })
            } else {
                res.render('home', resultArr);
            }
        }
    });
});

//SIGN UP SIGN IN SIGN OUT
//==============================================================
app.post('/users/new', (req, res) => {
    switch (req.body.func) {
        case 'signin':
            let query = `SELECT * FROM users WHERE name='${req.body.name}'`;
            pool.query(query, (err, result) => {
                if (err) {
                    console.error('query error:', err.stack);
                    res.send( 'query error' );
                } else {
                    if ( result.rows.length === 0 ) {
                        res.redirect('/');
                    } else {
                        const user = result.rows[0];
                        let password = user.password;
                        if (password == req.body.password) {
                            res.cookie('loggedIn', true);
                            res.cookie('name', req.body.name);
                            res.redirect('/');
                        } else {
                            res.redirect('/');
                        }
                    }
                }
            });
            break;

        case 'signout':
            res.clearCookie('loggedIn');
            res.clearCookie('name');
            res.redirect('/');
            break;

        case 'signup':
            const values = [req.body.name, req.body.password];
            let text = "INSERT INTO users (name, password) VALUES ($1, $2)";

            pool.query(text, values, (err, result) => {
                if (err) {
                    console.error('query error:', err.stack);
                    res.send( 'query error' );
                } else {
                    res.cookie('loggedIn', true);
                    res.cookie('name', req.body.name);
                    res.redirect('/');
                }
            });
            break;
    }
});

//CREATE TWEET
//==============================================================
app.post('/', (req, res) => {
    let query = `SELECT * FROM users WHERE name='${req.cookies['name']}';`;

    pool.query(query, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            let query =`INSERT INTO tweets (content, author_id) VALUES ('${req.body.tweet}', ${result.rows[0].id})`;

            pool.query(query, (err, result) => {
                if (err) {
                    console.error('query error:', err.stack);
                    res.send( 'query error' );
                } else {
                    res.redirect('/');
                }
            });
        }
    });
});





//==============================================================
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
let onClose = function(){
  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};
process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);