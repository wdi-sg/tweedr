module.exports = (app, db) => {

    const tweedr = require('./controllers/tweedrC')(db);

    /*
     *  =========================================
     *  Routes for one controller
     *  =========================================
     */

    app.get('/', tweedr.index);
};