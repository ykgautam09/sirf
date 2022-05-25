"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fsr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fsr.init(
    {
      fsr: DataTypes.INTEGER,
      f: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "fsr",
      underscored: true
    }
  );
  return fsr;
};
