"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("fppps", {
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
      ipr: {
        type: Sequelize.INTEGER
      },
      fppp: {
        type: Sequelize.INTEGER
      },
      fpr: {
        type: Sequelize.INTEGER
      },
      fpc: {
        type: Sequelize.INTEGER
      },
      f: {
        type: Sequelize.INTEGER
      },
      rf: {
        type: Sequelize.INTEGER
      },
      cf: {
        type: Sequelize.INTEGER
      },
      edp: {
        type: Sequelize.INTEGER
      },
      ep: {
        type: Sequelize.INTEGER
      },
      fbd: {
        type: Sequelize.INTEGER
      },
      pbd: {
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
    await queryInterface.dropTable("fppps");
  }
};
