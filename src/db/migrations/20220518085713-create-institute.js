"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("institute", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      aktu_id: {
        type: DataTypes.STRING
      },
      aicte_id: {
        type: DataTypes.STRING
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      type: { type: DataTypes.ENUM, values: ["GOVERNMENT", "PRIVATE"] },
      website: { type: DataTypes.STRING },
      officer_name: { type: DataTypes.STRING },
      officer_contact: { type: DataTypes.STRING },
      officer_post: { type: DataTypes.STRING },
      certificate: { type: DataTypes.TEXT, allowNull: false },
      last_login: { type: DataTypes.DATE, default: DataTypes.NOW },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("institutes");
  }
};
