"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pu.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      f: DataTypes.INTEGER,
      p: DataTypes.INTEGER,
      frq: DataTypes.INTEGER,
      pu: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "pu",
      underscored: true
    }
  );
  return pu;
};
