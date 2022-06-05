"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ipr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ipr.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      course: DataTypes.STRING,
      cal_yr_current: DataTypes.INTEGER,
      cal_yr_prev: DataTypes.INTEGER,
      cal_yr_second: DataTypes.INTEGER,
      patent_pub_current: DataTypes.INTEGER,
      patent_pub_prev: DataTypes.INTEGER,
      patent_pub_second: DataTypes.INTEGER,
      patent_granted_current: DataTypes.INTEGER,
      patent_granted_prev: DataTypes.INTEGER,
      patent_granted_second: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "ipr",
      tableName: "iprs",
      underscored: true
    }
  );
  return ipr;
};
