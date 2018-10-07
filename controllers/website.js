module.exports = (db) => {


  const showTweedr = (request, response) => {
    response.render('website/Website');
  };

  return {
    showTweedr
  };
};
