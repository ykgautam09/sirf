"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("gphs", {
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
      gph: {
        type: Sequelize.INTEGER
      },
      np: {
        type: Sequelize.INTEGER
      },
      nhs: {
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
    await queryInterface.dropTable("gphs");
  }
};
