"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("sses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ss: {
        type: DataTypes.INTEGER
      },
      nt: {
        type: DataTypes.INTEGER
      },
      ne: {
        type: DataTypes.INTEGER
      },
      np: {
        type: DataTypes.INTEGER
      },
      year: {
        type: DataTypes.INTEGER
      },
      institute_id: {
        type: DataTypes.INTEGER
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
    await queryInterface.dropTable("sses");
  }
};
