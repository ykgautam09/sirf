"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pr.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      pr: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "pr",
      tableName: "prs",
      underscored: true
    }
  );
  return pr;
};
