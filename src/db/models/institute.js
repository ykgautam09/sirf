"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Institute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Institute.hasMany(models.OTP, {
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "institute_id"
      });
      Institute.hasOne(models.institute_rank, {
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "institute_id"
      });
    }
  }

  Institute.init(
    {
      aktu_id: DataTypes.STRING,
      aicte_id: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      course: DataTypes.STRING,
      certificate: { type: DataTypes.TEXT, allowNull: false },
      type: { type: DataTypes.ENUM, values: ["GOVERNMENT", "PRIVATE"] }
    },
    {
      sequelize,
      tableName: "institute"
    }
  );
  return Institute;
};
