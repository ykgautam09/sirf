"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("consultancies", {
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
      fin_yr_current: {
        type: Sequelize.INTEGER
      },
      fin_yr_prev: {
        type: Sequelize.INTEGER
      },
      fin_yr_second: {
        type: Sequelize.INTEGER
      },
      cons_current: {
        type: Sequelize.INTEGER
      },
      cons_prev: {
        type: Sequelize.INTEGER
      },
      cons_second: {
        type: Sequelize.INTEGER
      },
      total_client_current: {
        type: Sequelize.INTEGER
      },
      total_client_prev: {
        type: Sequelize.INTEGER
      },
      total_client_second: {
        type: Sequelize.INTEGER
      },
      total_amt_current: {
        type: Sequelize.INTEGER
      },
      total_amt_prev: {
        type: Sequelize.INTEGER
      },
      total_amt_second: {
        type: Sequelize.INTEGER
      },
      total_amt_rec_current: {
        type: Sequelize.STRING
      },
      total_amt_rec_prev: {
        type: Sequelize.STRING
      },
      total_amt_rec_second: {
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
    await queryInterface.dropTable("consultancies");
  }
};
