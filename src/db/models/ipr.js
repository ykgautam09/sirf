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
      ipr: DataTypes.INTEGER,
      f: DataTypes.INTEGER,
      pg: DataTypes.INTEGER,
      ipg: DataTypes.INTEGER,
      ipp: DataTypes.INTEGER,
      pp: DataTypes.INTEGER
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
