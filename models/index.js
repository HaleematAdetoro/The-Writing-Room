const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');



const sequelize = new Sequelize(
    dbConfig.DB_NAME,
    dbConfig.DB_USER,
    dbConfig.DB_PASSWORD,
    {
        host: dbConfig.DB_HOST,
        dialect: dbConfig.DB_DIALECT
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.log('Unable to connect to the database:', error)
    })


const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

//Add models

db.models = require('./models')(sequelize)



db.sequelize.sync({ force: false})
    .then(() => {
        console.log('Database and tables synced');
    }).catch((error) => {
        console.log('Unable to sync database and tables:', error)
    })



module.exports = db