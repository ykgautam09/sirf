"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ipr_forms", {
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
      cal_yr_current: {
        type: Sequelize.INTEGER
      },
      cal_yr_prev: {
        type: Sequelize.INTEGER
      },
      cal_yr_second: {
        type: Sequelize.INTEGER
      },
      patent_pub_current: {
        type: Sequelize.INTEGER
      },
      patent_pub_prev: {
        type: Sequelize.INTEGER
      },
      patent_pub_second: {
        type: Sequelize.INTEGER
      },
      patent_granted_current: {
        type: Sequelize.INTEGER
      },
      patent_granted_prev: {
        type: Sequelize.INTEGER
      },
      patent_granted_second: {
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
    await queryInterface.dropTable("ipr_forms");
  }
};
