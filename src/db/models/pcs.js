"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pcs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pcs.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      pcs: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "pcs",
      tableName: "pcs",
      underscored: true
    }
  );
  return pcs;
};
