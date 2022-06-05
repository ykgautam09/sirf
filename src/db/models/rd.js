"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rd.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      rd: DataTypes.INTEGER,
      os: DataTypes.INTEGER,
      oc: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "rd",
      underscored: true
    }
  );
  return rd;
};
