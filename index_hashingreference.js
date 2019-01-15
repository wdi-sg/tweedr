const express = require('express');

var sha256 = require('js-sha256');

const SALT = "bananas are delicious";

const pg = require('pg');

const configs = {
  user: 'akira',
  host: '127.0.0.1',
  database: 'testdb',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


var cookieParser = require('cookie-parser')
app.use(cookieParser())


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

app.get('/user/new', (request, response) => {
  response.render('newuser');
})

app.post('/user', (request, response) => {


  console.log(request.body);

  let hashedPassword = sha256(request.body.password)

  console.log( "hashed password", hashedPassword );

  const values = [
    request.body.name,
    hashedPassword
  ];

  let query = "INSERT INTO users (name, password) VALUES ($1, $2)";

  pool.query(query, values, (err, queryResponse) => {

    response.cookie('loggedin', 'true');

    response.send('hellooooo');
  })

})

app.get('/mytweets', (request, response) => {



    response.send('all the logged in users tweets');
});

app.get('/profile', (request, response) => {
    var loggedin = request.cookies['loggedin'];

    // see if there is a cookie
    if( loggedin === undefined ){
        response.send("youre not logged in");

    }else{
        let userIdCookie = request.cookies['user_id'];

        let hashedRequestCookie = sha256( userIdCookie + SALT );

        if( hashedRequestCookie === request.cookies['hashedLoginCookie'] ){

            // we have verified this login cookie

            // output the user's name on this page



            let query = "SELECT * FROM users WHERE id='"+request.cookies['user_id']+"'";

            pool.query(query, (err, queryResponse) => {

                let user = queryResponse.rows[0];

                response.send("heres your secret stuff: "+user.name);
            });

        }else{
                response.send("incorrect hashed cookie");

        }




    }
});

app.get('/user/login', (request, response) => {
  response.render('login');
})


app.post('/user/login', (request, response) => {

    // if the user name and password are the same as in the DB, log them in

    let query = "SELECT * FROM users WHERE name='"+request.body.name+"'";

    pool.query(query, (err, queryResponse) => {


        //response.send('hellooooo');

        console.log( queryResponse.rows );

        // if the user doesnt exist
        if( queryResponse.rows.length === 0 ){
            console.log("user doesnt exist");
        }else{
            console.log("user exists!!!!!!");

            const user = queryResponse.rows[0];

            let hashedPassword = user.password;

            let formHashedPassword = sha256(request.body.password);

            console.log( "we are comapring 2 hashed values:");
            console.log( "from the DB:"+ hashedPassword );
            console.log( "from the login fomr:"+ formHashedPassword );

            if( hashedPassword == formHashedPassword ){
                //password is correct
                console.log('PASS WORD CORRECT TOO');

                let hashedCookie = sha256( user.id + SALT );
                response.cookie('hashedLoginCookie', hashedCookie);

                response.cookie('loggedin', 'true');
                response.cookie('user_id', user.id);
            }else{
                // password is incorrect
                console.log('PASS WORD not correct');
            }

        }

        response.send('hellooooo')
    })
});

app.get('/user/logout', (request, response) => {

  response.clearCookie('loggedin');

  response.send('you are logged out');
})






app.get('/', (request, response) => {

  response.cookie('strawberry', 'something');

  response.send('hello');
})

app.get('/what', (request, response) => {


  console.log( "cookies", request.cookies['banana'] );

  response.send('WHATTTTTTT');
})

app.get('/countme', (request, response) => {


        // get the currently set cookie
    var visits = request.cookies['visits'];

    // see if there is a cookie
    if( visits === undefined ){

      // set a default value if it doesn't exist
      visits = 1;
    }else{

      // if a cookie exists, make a value thats 1 bigger
      visits = parseInt( visits ) + 1;
    }

    // set the cookie
    response.cookie('visits', visits);

    response.send('visited '+visits);
})





app.get('/users/new', (request, response) => {

  console.log("hello")
  response.render("newuser");
});




////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);