const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.DB_PASSWD,
    {
        dialect: "mariadb",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)