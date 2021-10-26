module.exports = (sequelize, type) => {
    return sequelize.define('people', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        apellido: type.STRING,
        edad: type.INTEGER
    });
}