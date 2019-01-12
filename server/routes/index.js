const { Users } = require("../controllers");

module.exports = app => {
  app.get("/", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Nodejs Backend API!"
    })
  );
  app.post("/users/new", Users.createNew);
};
