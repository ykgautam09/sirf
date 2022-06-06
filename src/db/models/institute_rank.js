"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class institute_rank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      institute_rank.hasOne(models.Institute, {
        sourceKey: "institute_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "id"
      });
    }
  }
  institute_rank.init(
    {
      year: DataTypes.INTEGER,
      institute_id: DataTypes.INTEGER,
      category: DataTypes.STRING,
      tlr: DataTypes.FLOAT,
      rpc: DataTypes.FLOAT,
      go: DataTypes.FLOAT,
      oi: DataTypes.FLOAT,
      pr: DataTypes.FLOAT,
      rank: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: "institute_rank",
      tableName: "institute_ranks",
      underscored: true
    }
  );
  return institute_rank;
};
