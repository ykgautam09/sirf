require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql", // logging: console.info,
    quoteIdentifiers: true,
    define: {
      underscored: true,
      name: { singular: true, lowerCase: true },
      freezeTableName: true
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    quoteIdentifiers: true,
    define: {
      underscored: true,
      name: { singular: true, lowerCase: true },
      freezeTableName: true
    }
  }
};
