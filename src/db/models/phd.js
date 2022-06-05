"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class phd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  phd.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      course: DataTypes.STRING,
      full_time_total: DataTypes.INTEGER,
      part_time_total: DataTypes.INTEGER,
      academic_current: DataTypes.INTEGER,
      academic_prev: DataTypes.INTEGER,
      academic_second: DataTypes.INTEGER,
      part_time_total_current: DataTypes.INTEGER,
      part_time_total_prev: DataTypes.INTEGER,
      part_time_total_second: DataTypes.INTEGER,
      full_time_total_current: DataTypes.INTEGER,
      full_time_total_prev: DataTypes.INTEGER,
      full_time_total_second: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "phd",
      tableName: "phds",
      underscored: true
    }
  );
  return phd;
};
