module.exports = (app) => {

  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Nodejs Backend API!',
  }));

};