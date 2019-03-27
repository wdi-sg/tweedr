'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define('Profiles', {
    displayPic: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {});
  Profiles.associate = function(models) {
    // associations can be defined here
  };
  return Profiles;
};