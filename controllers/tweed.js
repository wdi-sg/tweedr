var sha256 = require("js-sha256");

module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */
    const newTweedForm = (request, response) => {
        response.render('tweeds/NewTweed');
    };

    const newTweed = (request, response) => {
        // use user model method `create` to create new user entry in db
            const tweed = {tweed: request.body.tweed, user_id: request.cookies.user_id};
        db.tweed.newTweed(tweed, (error, queryResult) => {
            // queryResult of creation is not useful to us, so we ignore it
            // (console log it to see for yourself)
            // (you can choose to omit it completely from the function parameters)

            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }

            if (queryResult.rowCount >= 1) {
                console.log('Tweed created successfully');
                console.log("TWEED CONTROLLER: ", request.body)
                // drop cookies to indicate user's logged in status and username

            } else {
                console.log('Tweed could not be created');
            }

            // redirect to home page after creation
            response.redirect('/');
        });
    };

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        newTweedForm,
        newTweed,
    };
};