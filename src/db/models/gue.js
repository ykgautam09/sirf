"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class gue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gue.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      gue: DataTypes.INTEGER,
      ng: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "gue",
      tableName: "gues",
      underscored: true
    }
  );
  return gue;
};
