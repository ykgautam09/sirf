"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("annual_exps", {
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
      sal_current: {
        type: Sequelize.INTEGER
      },
      sal_prev: {
        type: Sequelize.INTEGER
      },
      sal_second: {
        type: Sequelize.INTEGER
      },
      mainte_current: {
        type: Sequelize.INTEGER
      },
      mainte_prev: {
        type: Sequelize.INTEGER
      },
      mainte_second: {
        type: Sequelize.INTEGER
      },
      seminar_current: {
        type: Sequelize.INTEGER
      },
      seminar_prev: {
        type: Sequelize.INTEGER
      },
      seminar_second: {
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
    await queryInterface.dropTable("annual_exps");
  }
};
