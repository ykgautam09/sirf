"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("iprs", {
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
      f: {
        type: Sequelize.INTEGER
      },
      pg: {
        type: Sequelize.INTEGER
      },
      ipg: {
        type: Sequelize.INTEGER
      },
      ipp: {
        type: Sequelize.INTEGER
      },
      pp: {
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
    await queryInterface.dropTable("iprs");
  }
};
