"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("qps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      },
      institute_id: {
        type: Sequelize.INTEGER
      },
      qp: {
        type: Sequelize.INTEGER
      },
      f: {
        type: Sequelize.INTEGER
      },
      cc: {
        type: Sequelize.INTEGER
      },
      p: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("qps");
  }
};
