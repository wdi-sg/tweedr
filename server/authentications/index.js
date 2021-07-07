const checkToken = require("./checkToken");
const { hash, dehash } = require("./bcrypt");
module.exports = {
  checkToken,
  hash,
  dehash
};
