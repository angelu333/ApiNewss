const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = require('./config.js');

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT,
    logging: false, // Desactivar logs de SQL en consola
    define: {
        timestamps: true // Activar createdAt y updatedAt automáticamente
    }
});

const connectToDatabase = async () => {
    try {
        await connection.authenticate();
        console.log('✅ Se ha establecido conexión con la base de datos con éxito');

        // Sincronizar modelos con la base de datos (crear tablas si no existen)
        await connection.sync({ alter: true });
        console.log('✅ Tablas sincronizadas correctamente');

    } catch (error) {
        console.error('❌ No se pudo establecer conexión con la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = { connection, connectToDatabase };