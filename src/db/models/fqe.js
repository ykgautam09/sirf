"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fqe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fqe.init(
    {
      fqe: DataTypes.INTEGER,
      fra: DataTypes.INTEGER,
      f1: DataTypes.INTEGER,
      f2: DataTypes.INTEGER,
      f3: DataTypes.INTEGER,
      fe: DataTypes.INTEGER,
      fq: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "fqe",
      tableName: "fqes",
      underscored: true
    }
  );
  return fqe;
};
