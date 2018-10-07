module.exports = db => {
  const newForm = (request, response) => {
    response.render('tweeds/NewTweed');
  };

  const create = (request, response) => {
    const params = {
      content: request.body.content,
      id: request.cookies.id
    };
    db.tweed.create(params, (error, queryResult) => {
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
