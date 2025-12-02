const { New } = require('./models');
const { connectToDatabase } = require('./config.db');

const updateImages = async () => {
    try {
        await connectToDatabase();
        console.log('🔄 Actualizando imágenes de noticias...');

        const imagenes = [
            'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop'
        ];

        const noticias = await New.findAll();
        
        for (let i = 0; i < noticias.length && i < imagenes.length; i++) {
            await noticias[i].update({ imagen: imagenes[i] });
            console.log(`✅ Actualizada noticia ${noticias[i].id}: ${noticias[i].titulo}`);
        }

        console.log('✅ Imágenes actualizadas correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

updateImages();
