const Sequelize = require('sequelize');

// Tablas
const PeopleModel = require('./models/people')

// Conexion Base de Datos (Database name / Username / Password)
const sequelize = new Sequelize('VTAqHnTeKf', 'VTAqHnTeKf', 'KsIzuBC2LJ', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});

const People = PeopleModel(sequelize, Sequelize);

sequelize.sync({
    force: false
}).then(() => {
    console.log('Tables synchronized')
});

module.exports = { People }