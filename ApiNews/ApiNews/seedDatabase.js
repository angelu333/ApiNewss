const { Profile, State, Category, User, New } = require('./models');

const seedDatabase = async () => {
    try {
        console.log('🌱 Iniciando poblado de la base de datos...');

        // Verificar si ya existen datos
        const profileCount = await Profile.count();
        if (profileCount > 0) {
            console.log('📊 La base de datos ya contiene datos, omitiendo poblado inicial.');
            return;
        }

        // Crear Perfiles
        console.log('📝 Creando perfiles...');
        const profiles = await Profile.bulkCreate([
            { nombre: 'Administrador' },
            { nombre: 'Contribuidor' }
        ]);

        // Crear Estados
        console.log('🗺️ Creando estados...');
        const states = await State.bulkCreate([
            {
                nombre: 'Yucatán',
                abreviacion: 'YUC'
            },
            {
                nombre: 'Baja California',
                abreviacion: 'BC'
            },
            {
                nombre: 'Campeche',
                abreviacion: 'CAM'
            },
            {
                nombre: 'Chiapas',
                abreviacion: 'CHI'
            },
            {
                nombre: 'Chihuahua',
                abreviacion: 'CHIH'
            }
        ]);

        // Crear Categorías
        console.log('📂 Creando categorías...');
        const categories = await Category.bulkCreate([
            {
                nombre: 'Salud Médica',
                descripcion: 'Noticias más importantes acerca de la salud'
            },
            {
                nombre: 'Ecología y fauna',
                descripcion: 'Todo lo importante acerca de los seres vivos en nuestro país'
            }
        ]);

        // Crear Usuarios
        console.log('👥 Creando usuarios...');
        const users = await User.bulkCreate([
            {
                perfil_id: profiles[0].id, // Administrador
                nombre: 'Administrador',
                apellidos: 'General',
                nick: 'Admin',
                correo: 'admin@gmail.com',
                contraseña: 'cursoexpressjs',
                bio: 'Administrador del sitio de noticias',
                avatar: 'https://i.pravatar.cc/150?img=1',
                verificado: true,
                ultima_actividad: new Date()
            },
            {
                perfil_id: profiles[1].id, // Contribuidor
                nombre: 'Jhon',
                apellidos: 'Boston',
                nick: 'jhonBoston1',
                correo: 'jhon@gmail.com',
                contraseña: '123456',
                bio: 'Periodista especializado en ecología',
                avatar: 'https://i.pravatar.cc/150?img=2',
                verificado: false,
                ultima_actividad: new Date()
            }
        ]);

        // Crear Noticias
        console.log('📰 Creando noticias...');
        await New.bulkCreate([
            {
                categoria_id: categories[1].id, // Ecología y fauna
                estado_id: states[0].id, // Yucatán
                usuario_id: users[0].id, // Admin
                titulo: 'Descubren nueva especie de mariposa',
                slug: 'descubren-nueva-especie-de-mariposa',
                fecha_publicacion: new Date('2023-08-14 12:00:00'),
                descripcion: 'Científicos han anunciado el descubrimiento de una nueva especie de mariposa en una expedición a la selva amazónica. La especie, llamada "Morpho amazonica", posee colores y patrones únicos en sus alas.',
                imagen: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop',
                estado_publicacion: 'publicado',
                visitas: 15,
                comentarios_count: 2
            },
            {
                categoria_id: categories[0].id, // Salud Médica
                estado_id: states[1].id, // Baja California
                usuario_id: users[1].id, // Jhon
                titulo: 'Avance médico: Terapia génica muestra promesa',
                slug: 'avance-medico-terapia-genica-promesa',
                fecha_publicacion: new Date('2023-08-15 12:00:00'),
                descripcion: 'Investigadores informan avances significativos en el uso de terapia génica para tratar enfermedades raras. En ensayos clínicos, pacientes con afecciones genéticas hereditarias han experimentado mejoras notables después del tratamiento.',
                imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
                estado_publicacion: 'publicado',
                visitas: 23,
                comentarios_count: 5
            },
            {
                categoria_id: categories[1].id, // Ecología y fauna
                estado_id: states[2].id, // Campeche
                usuario_id: users[0].id, // Admin
                titulo: 'Se registra aumento en la población de aves',
                slug: 'aumento-poblacion-aves',
                fecha_publicacion: new Date('2023-08-16 12:00:00'),
                descripcion: 'Los esfuerzos de conservación están dando frutos mientras la población de pandas gigantes en su hábitat natural experimenta un aumento. Los expertos atribuyen este éxito a medidas de protección y programas de reproducción en cautiverio.',
                imagen: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop',
                estado_publicacion: 'publicado',
                visitas: 8,
                comentarios_count: 1
            },
            {
                categoria_id: categories[0].id, // Salud Médica
                estado_id: states[3].id, // Chiapas
                usuario_id: users[1].id, // Jhon
                titulo: 'Nueva investigación revela datos sobre el sueño',
                slug: 'investigacion-sueño-salud',
                fecha_publicacion: new Date('2023-08-17 12:00:00'),
                descripcion: 'Un estudio reciente sugiere que la calidad del sueño puede tener un impacto significativo en la salud cardiovascular. Los resultados muestran que patrones de sueño irregulares podrían aumentar el riesgo de enfermedades del corazón.',
                imagen: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800&h=600&fit=crop',
                estado_publicacion: 'publicado',
                visitas: 42,
                comentarios_count: 8
            },
            {
                categoria_id: categories[1].id, // Ecología y fauna
                estado_id: states[4].id, // Chihuahua
                usuario_id: users[0].id, // Admin
                titulo: 'Avance en la lucha contra la contaminación',
                slug: 'avance-lucha-contaminacion',
                fecha_publicacion: new Date('2023-08-18 12:00:00'),
                descripcion: 'Científicos anuncian el desarrollo de un nuevo material biodegradable que podría ayudar a reducir la contaminación plástica en los océanos. Este avance prometedor ofrece esperanzas para abordar uno de los mayores desafíos ambientales de nuestro tiempo.',
                imagen: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
                estado_publicacion: 'publicado',
                visitas: 31,
                comentarios_count: 3
            }
        ]);

        console.log('✅ Base de datos poblada exitosamente con datos iniciales');
        console.log(`📊 Resumen:
        - ${profiles.length} perfiles creados
        - ${states.length} estados creados
        - ${categories.length} categorías creadas
        - ${users.length} usuarios creados
        - 5 noticias creadas`);

    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
        throw error;
    }
};

module.exports = { seedDatabase };