module.exports = (app, db) => {

const users = require('./controllers/tweedr')(db);

app.get('/', users.home);
app.get('/users/new', users.newUser);
app.post('/users', users.users);
app.get('/login', users.signIn);
app.post('/login', users.postTweets);
app.get('/special', tweets.cookie);
app.get('/tweets/new', tweets.newTweets);
app.post('/tweets/new', tweets.postNewTweets);



}