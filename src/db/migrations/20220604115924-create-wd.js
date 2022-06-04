"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wds", {
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
      wd: {
        type: Sequelize.INTEGER
      },
      nws: {
        type: Sequelize.INTEGER
      },
      nwf: {
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
    await queryInterface.dropTable("wds");
  }
};
