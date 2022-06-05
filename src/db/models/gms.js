"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class gms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gms.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      gms: DataTypes.INTEGER,
      f: DataTypes.INTEGER,
      ms: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "gms",
      tableName: "gms",
      underscored: true
    }
  );
  return gms;
};
