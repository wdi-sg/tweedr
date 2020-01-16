module.exports = (app, db) => {

  const tweets = require('./controllers/tweedr')(db);

  /*
   *  =========================================
   *  Routes for one controller
   *  =========================================
   */
    app.get('/', tweets.home);
    app.post('/', tweets.signIn);
    app.get('/tweets', tweets.index);
    app.post('/tweets', tweets.postTweets);
    app.get('/user/logout', tweets.signOut);
    app.post('/users', tweets.users);
    app.get('/users/new', tweets.newUser);
    app.get('/:username', tweets.username)
}


//   app.get('/', (request, response) => {
//     response.render("user/login");
//   });

//   // app.get('/users/new', (request, response) => {
//   //   response.render('user/newuser');
//   // });

//   app.post('/', (request, response) => {

//       let text = "SELECT * FROM users WHERE username='"+request.body.username+"'";
//       pool.query(text, (err, result) => {
//           console.log( result.rows );

//           // if the user doesnt exist
//           if ( result.rows.length === 0 ) {
//               console.log("user doesnt exist");
//               response.send('User not found');
//           }
//           else {
//               console.log("user exists!!!!!!");

//               const user = result.rows[0];
//               let password = user.password;

//               if ( password == request.body.password ) {
//                   //password is correct
//                   console.log('PASS WORD CORRECT TOO');
//                   response.cookie('loggedin', 'true');
//                   response.redirect('/tweets');
//               }
//               else {
//                   // password is incorrect
//                   console.log('PASS WORD not correct');
//                   response.send('Password incorrect')
//               }

//           }

//       })
//   });

//   app.get('/user/logout', (request, response) => {

//     response.clearCookie('loggedin');
//     response.redirect('/')
//   })


//   app.post('/users', (request, response) => {

//       let text = 'INSERT INTO users (name, username, password) VALUES ($1, $2, $3)';
//       const values = [
//           request.body.name,
//           request.body.reguser,
//           request.body.regpass
//       ];

//       // execute query
//       pool.query(text, values, (error, result) => {
//           //response.redirect('/');
//           response.render("user/NewUser", {user: result.rows});
//       });
//   });

//   app.get('/tweets', (request, response) => {
//       let text = "SELECT * FROM tweets";

//       pool.query(text, (err, result) => {
//           response.render("user/newtweets", {tweets: result.rows});
//       })
//   });

//   app.post('/tweets', (request, response) => {

//       let text = 'INSERT INTO tweets (name, username, content) VALUES ($1, $2, $3)';
//       const values = [request.body.name, request.body.username, request.body.newtweet];

//       pool.query(text, values, (error, result) => {
//           response.render("user/newtweets", {tweets: result.rows});
//           // response.redirect('/tweets');
//       });
//   });

//   app.get('/:username', (request, response) => {
//       let text = "SELECT users.username, followers.following_id from users INNER JOIN followers ON users.id = followers.user_id";

//       pool.query(text, (err, result) => {
//           response.render("user/profile", {tweets: result.rows});
//       })
//   });
// };