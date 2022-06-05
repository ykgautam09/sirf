"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("student_strengths", {
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
      msn: {
        type: Sequelize.INTEGER
      },
      fsn: {
        type: Sequelize.INTEGER
      },
      tsn: {
        type: Sequelize.INTEGER
      },
      in_state_mf: {
        type: Sequelize.INTEGER
      },
      out_state_mf: {
        type: Sequelize.INTEGER
      },
      out_country_mf: {
        type: Sequelize.INTEGER
      },
      eco_back_mf: {
        type: Sequelize.INTEGER
      },
      social_chal_mf: {
        type: Sequelize.INTEGER
      },
      tution_fee_reimburse_state_center: {
        type: Sequelize.INTEGER
      },
      tution_fee_reimburse_institute: {
        type: Sequelize.INTEGER
      },
      tution_fee_reimburse_private: {
        type: Sequelize.INTEGER
      },
      no_tution_fee_reimburse: {
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
    await queryInterface.dropTable("student_strengths");
  }
};
