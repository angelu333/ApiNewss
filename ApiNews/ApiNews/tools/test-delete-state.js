const { setupDatabase } = require('../setup-database');
const { connectToDatabase } = require('../config.db');
const stateService = require('../services/states.service');
const { State } = require('../models/StateModel');

const idToDelete = process.argv[2] || 1;

const run = async () => {
    try {
        console.log('Iniciando prueba de deleteState para id =', idToDelete);

        // Asegurar la base de datos existe y la conexión está lista
        await setupDatabase();
        await connectToDatabase();

        // Mostrar estado antes
        const before = await State.findByPk(idToDelete, { raw: true });
        console.log('Estado antes:', before);

        // Ejecutar delete (soft delete)
        const result = await stateService.deleteState(idToDelete);
        console.log('Resultado deleteState:', result);

        // Mostrar estado después
        const after = await State.findByPk(idToDelete, { raw: true });
        console.log('Estado después:', after);

        process.exit(0);
    } catch (error) {
        console.error('Error en prueba:', error);
        process.exit(1);
    }
};

run();
