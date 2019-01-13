const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

const checkToken = (req, res, next) => {
  console.log("checking token");
  let validateOnly = req.headers["validate-only"];
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("invalid token");
        res.json({ success: false, message: "Invalid token" });
      } else {
        if (validateOnly === "true") {
          res.json({ success: true, message: "Token is valid" });
        } else {
          req.decoded = decoded;
          next();
        }
      }
    });
  } else {
    console.log("no token");
    res.json({
      success: false,
      message: "Auth token not supplied"
    });
  }
};

module.exports = checkToken;
