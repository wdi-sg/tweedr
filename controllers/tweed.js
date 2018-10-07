module.exports = db => {
  const newForm = (request, response) => {
    response.render('tweeds/NewTweed');
  };

  const create = (request, response) => {
    const sampleData = {
      content: request.body.content,
      id: 1
    };
    db.tweed.create(sampleData, (error, queryResult) => {
      if (error) {
        console.error('error tweeding', error);
        response.sendStatus(500);
      }
      response.redirect('/');
    });
  };

  return {
    newForm,
    create
  };
};
