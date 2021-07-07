"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      profile_pic: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Tweed, {
      foreignKey: "user_id"
    });
  };
  return User;
};
