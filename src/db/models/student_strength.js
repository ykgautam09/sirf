"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student_strength extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_strength.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      course: DataTypes.STRING,
      msn: DataTypes.INTEGER,
      fsn: DataTypes.INTEGER,
      tsn: DataTypes.INTEGER,
      in_state_mf: DataTypes.INTEGER,
      out_state_mf: DataTypes.INTEGER,
      out_country_mf: DataTypes.INTEGER,
      eco_back_mf: DataTypes.INTEGER,
      social_chal_mf: DataTypes.INTEGER,
      tution_fee_reimburse_state_center: DataTypes.INTEGER,
      tution_fee_reimburse_institute: DataTypes.INTEGER,
      tution_fee_reimburse_private: DataTypes.INTEGER,
      no_tution_fee_reimburse: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "student_strength",
      tableName: "student_strengths",
      underscored: true
    }
  );
  return student_strength;
};
