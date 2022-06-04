"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class wd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wd.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      wd: DataTypes.INTEGER,
      nws: DataTypes.INTEGER,
      nwf: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "wd",
      underscored: true
    }
  );
  return wd;
};
