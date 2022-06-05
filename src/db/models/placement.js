"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class placement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  placement.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      course: DataTypes.STRING,
      intake_firstyr_total: DataTypes.INTEGER,
      first_year_total: DataTypes.INTEGER,
      academic: DataTypes.INTEGER,
      lateral_total: DataTypes.INTEGER,
      acade_year: DataTypes.INTEGER,
      min_time: DataTypes.INTEGER,
      placed_total: DataTypes.INTEGER,
      med_salary: DataTypes.INTEGER,
      high_studies_total: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "placement",
      tableName: "placements",
      underscored: true
    }
  );
  return placement;
};
