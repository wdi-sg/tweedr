module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let index = (request, response) => {
        db.tweedr.getAllTweets((error, allTweets) => {
            response.render('testpage', {
                allTweets
            });
        });
    };


    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */

    return {
        index,
    };

}