"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pcs_forms", {
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
      course: {
        type: Sequelize.STRING
      },
      have_lift_current: {
        type: Sequelize.STRING
      },
      have_lift_prev: {
        type: Sequelize.STRING
      },
      have_lift_second: {
        type: Sequelize.STRING
      },
      walking_aids_current: {
        type: Sequelize.STRING
      },
      walking_aids_prev: {
        type: Sequelize.STRING
      },
      walking_aids_second: {
        type: Sequelize.STRING
      },
      toilets_current: {
        type: Sequelize.STRING
      },
      toilets_prev: {
        type: Sequelize.STRING
      },
      toilets_second: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable("pcs_forms");
  }
};
