const model = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = model;

const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");

class Users {
  static createNew(req, res) {
    const { name, password, profilePic } = req.body;
    return User.findOne({ where: { name: `${name}` } }).then(user => {
      if (user) {
        res.status(200).send("username taken");
      } else {
        bcrypt.hash(password, saltRounds).then(hash => {
          return User.create({
            name,
            password: hash,
            profile_pic: profilePic
          }).then(val =>
            res.status(200).send({ message: "created user", val })
          );
        });
      }
    });
  }
  static listAll(req, res) {
    return User.findAll({ attributes: ["name", "profile_pic"] }).then(users => {
      res.status(200).send(users);
    });
  }
  static getOne(req, res) {}
  static updateOne(req, res) {}
  static deleteOne(req, res) {}

  static login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
      return User.findOne({ where: { name: username } }).then(user => {
        if (user.dataValues.name === username) {
          bcrypt.compare(password, user.dataValues.password).then(val => {
            if (val) {
              let token = jwt.sign({ username: username }, secret, {
                expiresIn: "24h"
              });
              res.json({
                success: true,
                message: "Authentication successful",
                token: token
              });
            } else {
              res.json({
                success: false,
                message: "Incorrect username or password"
              });
            }
          });
        }
      });
    } else {
      res.json({ sucess: false, message: "Authentication failed" });
    }
  }
}
module.exports = Users;
