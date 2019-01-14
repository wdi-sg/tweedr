module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const index = (req, res) => {
      db.tweets.getAll(req.cookies['loggedIn'], req.cookies['name'], (err, result) => {
        res.render('home', result);
      });
  };

  const sign = (req, res) => {
    db.tweets.sign( req.body, (err, result, func, nameCookie) => {
        switch (func) {
            case 'signout':
                res.clearCookie('loggedIn');
                res.clearCookie('name');
                res.redirect('/');
                break;

            case 'signin':
                res.cookie('loggedIn', true);
                res.cookie('name', nameCookie);
                res.redirect('/');
                break;

            default:
                res.redirect('/');
        }
    });
  };

  const create = (req, res) => {
    db.tweets.create( req.body, req.cookies['name'], (err, result) => {
        res.redirect('/');
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index,
    sign,
    create,
  };
}
