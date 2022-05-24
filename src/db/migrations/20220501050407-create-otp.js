"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("otp", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      institute_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING
      },
      expiry_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("OTP");
  }
};
