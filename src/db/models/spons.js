"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class spons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  spons.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      course: DataTypes.STRING,
      fin_yr_current: DataTypes.INTEGER,
      fin_yr_prev: DataTypes.INTEGER,
      fin_yr_second: DataTypes.INTEGER,
      spons_current: DataTypes.INTEGER,
      spons_prev: DataTypes.INTEGER,
      spons_second: DataTypes.INTEGER,
      agencies_current: DataTypes.INTEGER,
      agencies_prev: DataTypes.INTEGER,
      agencies_second: DataTypes.INTEGER,
      total_amt_current: DataTypes.INTEGER,
      total_amt_prev: DataTypes.INTEGER,
      total_amt_second: DataTypes.INTEGER,
      total_amt_rec_current: DataTypes.STRING,
      total_amt_rec_prev: DataTypes.STRING,
      total_amt_rec_second: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "spons",
      underscored: true
    }
  );
  return spons;
};
