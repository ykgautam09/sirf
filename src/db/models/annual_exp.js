"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class annual_exp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  annual_exp.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      course: DataTypes.STRING,
      sal_current: DataTypes.INTEGER,
      sal_prev: DataTypes.INTEGER,
      sal_second: DataTypes.INTEGER,
      mainte_current: DataTypes.INTEGER,
      mainte_prev: DataTypes.INTEGER,
      mainte_second: DataTypes.INTEGER,
      seminar_current: DataTypes.INTEGER,
      seminar_prev: DataTypes.INTEGER,
      seminar_second: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "annual_exp",
      underscored: true
    }
  );
  return annual_exp;
};
