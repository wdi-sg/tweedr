const sha256 = require("js-sha256");

module.exports = db => {
  // Salt for Hash
  const SALT = "aKiRa is a PokeMON";

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  // Controllers for Creating New Users
  const newForm = (req, res) => {
    res.render("user/NewUser");
  };

  const create = (req, res) => {
    // use user model method `create` to create new user entry in db
    db.users.create(req.body, (err, queryResult) => {
      // queryResult of creation is not useful to us, so we ignore it
      // (console log it to see for yourself)
      // (you can choose to omit it completely from the function parameters)

      if (err) {
        console.err("Errror getting user:", err);
        res.sendStatus(500);
      }
      if (queryResult.rowCount >= 1) {
        console.log("User created successfully");
        // Hashing Current Session Cookie
        let currentSessionCookie = sha256(
          queryResult.rows[0].user_id + "logged_id" + SALT
        );

        // drop cookies to indicate user's logged in status and username
        res.cookie("loggedIn", currentSessionCookie);
        res.cookie("user_id", queryResult.rows[0].user_id);
      } else {
        console.log("User could not be created");
      }

      // redirect to home page after creation
      res.redirect("/");
    });
  };

  // Controllers for Logging in Users
  const loginForm = (req, res) => {
    res.render("user/LoginUser");
  };

  const loginUser = (req, res) => {
    db.users.login(req.body, (err, queryResult) => {
      if (err) {
        console.err("Error Logging User In:", err);
        res.sendStatus(500);
      }

      let hashedPass = sha256(req.body.password);
      // Hashing Current Session Cookie
      let currentSessionCookie = sha256(
        queryResult.rows[0].user_id + "logged_id" + SALT
      );

      if (
        queryResult.rows[0] !== undefined &&
        queryResult.rows[0].password === hashedPass
      ) {
        res.cookie("loggedIn", currentSessionCookie);
        res.cookie("user_id", queryResult.rows[0].user_id);

        console.log("User successfully logged in");
        res.redirect("/");
      } else {
        console.log("User could not be logged in");
      }
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newForm,
    create,
    loginForm,
    loginUser
  };
};
