const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Elimina las opciones obsoletas
        console.log('✅ Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = conectarDB;
