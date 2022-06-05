"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("financials", {
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
      library_current: {
        type: Sequelize.INTEGER
      },
      library_prev: {
        type: Sequelize.INTEGER
      },
      library_second: {
        type: Sequelize.INTEGER
      },
      new_equip_current: {
        type: Sequelize.INTEGER
      },
      new_equip_prev: {
        type: Sequelize.INTEGER
      },
      new_equip_second: {
        type: Sequelize.INTEGER
      },
      engg_workshop_current: {
        type: Sequelize.INTEGER
      },
      engg_workshop_prev: {
        type: Sequelize.INTEGER
      },
      engg_workshop_second: {
        type: Sequelize.INTEGER
      },
      other_exp_current: {
        type: Sequelize.INTEGER
      },
      other_exp_prev: {
        type: Sequelize.INTEGER
      },
      other_exp_second: {
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
    await queryInterface.dropTable("financials");
  }
};
