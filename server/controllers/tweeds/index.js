const model = require("../../models");
const { Tweed, User } = model;

const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");

class Tweeds {
  static createNew(req, res) {
    let username = req.decoded.username;
    let content = req.body.content;

    return User.findOne({ attributes: ["id"], where: { name: username } }).then(
      user => {
        let userId = user.dataValues.id;
        return Tweed.create({ content, user_id: userId }).then(val =>
          res.status(200).send({ message: "tweed created", val })
        );
      }
    );
  }
  static listAllFromOneUser(req, res) {
    let username = req.body.username;
    return User.findOne({ attributes: ["id"], where: { name: username } }).then(
      user => {
        let userId = user.dataValues.id;
        return Tweed.findAll({ where: { user_id: userId } }).then(vals => {
          let tweeds = [];
          vals.map(val => {
            tweeds.push({
              user: username,
              content: val.dataValues.content,
              createdAt: val.dataValues.createdAt
            });
          });
          res.status(200).send(tweeds);
        });
      }
    );
  }
  static listAll(req, res) {
    let tweeds = [];
    return Tweed.findAll({
      include: [{ model: User, attributes: ["name"] }],
      order: [["updatedAt", "DESC"]]
    }).then(vals => {
      vals.map(val => {
        tweeds.push({
          user: val.dataValues.User.dataValues.name,
          content: val.dataValues.content,
          updatedAt: val.dataValues.updatedAt
        });
      });
      res.status(200).send(tweeds);
    });
  }
  static updateOne(req, res) {}
  static deleteOne(req, res) {}
}
module.exports = Tweeds;
