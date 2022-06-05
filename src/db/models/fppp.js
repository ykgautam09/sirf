"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fppp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fppp.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      ipr: DataTypes.INTEGER,
      fppp: DataTypes.INTEGER,
      fpr: DataTypes.INTEGER,
      fpc: DataTypes.INTEGER,
      f: DataTypes.INTEGER,
      rf: DataTypes.INTEGER,
      cf: DataTypes.INTEGER,
      edp: DataTypes.INTEGER,
      ep: DataTypes.INTEGER,
      fbd: DataTypes.INTEGER,
      pbd: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "fppp",
      tableName: "fppps",
      underscored: true
    }
  );
  return fppp;
};
