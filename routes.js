module.exports = (app, db) => {

    const tweets = require('./controllers/tweets')(db);

    app.get('/', tweets.index);
    app.post('/users/new', tweets.sign);
    app.post('/', tweets.create);
};