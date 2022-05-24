"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OTP.hasMany(models.Institute, {
        sourceKey: "institute_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "id"
      });
    }
  }

  OTP.init(
    {
      institute_id: { type: DataTypes.UUID, allowNull: false },
      code: DataTypes.STRING,
      expiry_at: { type: DataTypes.DATE, allowNull: false }
    },
    {
      sequelize,
      tableName: "otp"
    }
  );
  return OTP;
};
