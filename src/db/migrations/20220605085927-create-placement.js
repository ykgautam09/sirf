"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("placements", {
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
      intake_firstyr_total: {
        type: Sequelize.INTEGER
      },
      first_year_total: {
        type: Sequelize.INTEGER
      },
      academic: {
        type: Sequelize.INTEGER
      },
      lateral_total: {
        type: Sequelize.INTEGER
      },
      acade_year: {
        type: Sequelize.INTEGER
      },
      min_time: {
        type: Sequelize.INTEGER
      },
      placed_total: {
        type: Sequelize.INTEGER
      },
      med_salary: {
        type: Sequelize.INTEGER
      },
      high_studies_total: {
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
    await queryInterface.dropTable("placements");
  }
};
