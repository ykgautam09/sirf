"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fru extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fru.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      f: DataTypes.INTEGER,
      fru: DataTypes.INTEGER,
      bc: DataTypes.INTEGER,
      bo: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "fru",
      underscored: true
    }
  );
  return fru;
};
