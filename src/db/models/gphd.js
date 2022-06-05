"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class gphd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gphd.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      gss: DataTypes.INTEGER,
      f: DataTypes.INTEGER,
      nss: DataTypes.INTEGER,
      gphd: DataTypes.INTEGER,
      nphd: DataTypes.INTEGER,
      oi: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "gphd",
      tableName: "gphds",
      underscored: true
    }
  );
  return gphd;
};
