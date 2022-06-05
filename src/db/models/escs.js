"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class escs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  escs.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      f: DataTypes.INTEGER,
      nesc: DataTypes.INTEGER,
      escs: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "escs",
      underscored: true
    }
  );
  return escs;
};
