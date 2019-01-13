"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tweed = sequelize.define(
    "Tweed",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      content: DataTypes.STRING
    },
    {}
  );
  Tweed.associate = function(models) {
    Tweed.belongsTo(models.User, {
      foreignKey: "user_id"
    });
  };
  return Tweed;
};
