const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = password => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    return hash;
  });
};

const dehash = (password, hashedPassword) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    return res;
  });
};

module.exports = {hash,dehash}