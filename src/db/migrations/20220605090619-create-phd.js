"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("phds", {
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
      full_time_total: {
        type: Sequelize.INTEGER
      },
      part_time_total: {
        type: Sequelize.INTEGER
      },
      academic_current: {
        type: Sequelize.INTEGER
      },
      academic_prev: {
        type: Sequelize.INTEGER
      },
      academic_second: {
        type: Sequelize.INTEGER
      },
      part_time_total_current: {
        type: Sequelize.INTEGER
      },
      part_time_total_prev: {
        type: Sequelize.INTEGER
      },
      part_time_total_second: {
        type: Sequelize.INTEGER
      },
      full_time_total_current: {
        type: Sequelize.INTEGER
      },
      full_time_total_prev: {
        type: Sequelize.INTEGER
      },
      full_time_total_second: {
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
    await queryInterface.dropTable("phds");
  }
};
