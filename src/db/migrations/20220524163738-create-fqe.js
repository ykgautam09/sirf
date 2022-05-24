"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("fqes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      fqe: {
        type: DataTypes.INTEGER
      },
      fra: {
        type: DataTypes.INTEGER
      },
      f1: {
        type: DataTypes.INTEGER
      },
      f2: {
        type: DataTypes.INTEGER
      },
      f3: {
        type: DataTypes.INTEGER
      },
      fe: {
        type: DataTypes.INTEGER
      },
      fq: {
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
    await queryInterface.dropTable("fqes");
  }
};
