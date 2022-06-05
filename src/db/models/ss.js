"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ss.init(
    {
      ss: DataTypes.INTEGER,
      nt: DataTypes.INTEGER,
      ne: DataTypes.INTEGER,
      np: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "ss",
      tableName: "sses",
      underscored: true
    }
  );
  return ss;
};
