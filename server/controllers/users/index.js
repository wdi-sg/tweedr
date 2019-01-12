const model = require("../../models");
const sha256 = require("js-sha256");
const { User } = model;

class Users {
  static createNew(req, res) {
    const { name, password, profilePic } = req.body;
    return User.findOne({ where: { name: `${name}` } }).then(user => {
      if (user) {
        console.log(sha256(password))
        res.status(200).send("username taken");
      } else {
        return User.create({
          name,
          password: sha256(password),
          profile_pic: profilePic
        }).then(val => res.status(200).send({ message: "created user", val }));
      }
    });
  }
  static listAll(req, res) {
    return User.findAll().then(users => {
      res.status(200).send(users);
    });
  }
  static getOne(req, res) {}
  static updateOne(req, res) {}
  static deleteOne(req, res) {}
}
module.exports = Users;
