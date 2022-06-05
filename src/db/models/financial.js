"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class financial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  financial.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      course: DataTypes.STRING,
      library_current: DataTypes.INTEGER,
      library_prev: DataTypes.INTEGER,
      library_second: DataTypes.INTEGER,
      new_equip_current: DataTypes.INTEGER,
      new_equip_prev: DataTypes.INTEGER,
      new_equip_second: DataTypes.INTEGER,
      engg_workshop_current: DataTypes.INTEGER,
      engg_workshop_prev: DataTypes.INTEGER,
      engg_workshop_second: DataTypes.INTEGER,
      other_exp_current: DataTypes.INTEGER,
      other_exp_prev: DataTypes.INTEGER,
      other_exp_second: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "financial",
      tableName: "financials",
      underscored: true
    }
  );
  return financial;
};
