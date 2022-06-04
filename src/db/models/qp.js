"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class qp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  qp.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      qp: DataTypes.INTEGER,
      f: DataTypes.INTEGER,
      cc: DataTypes.INTEGER,
      p: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "qp",
      underscored: true
    }
  );
  return qp;
};
