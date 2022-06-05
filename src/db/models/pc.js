"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pc.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      course: DataTypes.STRING,
      have_lift_current: DataTypes.STRING,
      have_lift_prev: DataTypes.STRING,
      have_lift_second: DataTypes.STRING,
      walking_aids_current: DataTypes.STRING,
      walking_aids_prev: DataTypes.STRING,
      walking_aids_second: DataTypes.STRING,
      toilets_current: DataTypes.STRING,
      toilets_prev: DataTypes.STRING,
      toilets_second: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "pc",
      tableName: "pcs",
      underscored: true
    }
  );
  return pc;
};
