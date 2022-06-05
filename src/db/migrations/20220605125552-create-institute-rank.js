"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("institute_ranks", {
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
      category: {
        type: Sequelize.STRING
      },
      tlr: {
        type: Sequelize.FLOAT
      },
      rpc: {
        type: Sequelize.FLOAT
      },
      go: {
        type: Sequelize.FLOAT
      },
      oi: {
        type: Sequelize.FLOAT
      },
      pr: {
        type: Sequelize.FLOAT
      },
      rank: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable("institute_ranks");
  }
};
