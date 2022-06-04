"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class gph extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gph.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      gph: DataTypes.INTEGER,
      np: DataTypes.INTEGER,
      nhs: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "gph",
      underscored: true
    }
  );
  return gph;
};
