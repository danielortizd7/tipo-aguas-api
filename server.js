const express = require('express');
const dotenv = require('dotenv');
const tipoAguaRoutes = require('./app/routes/tipoAguaRoutes');
const conectarDB = require('./app/database/databasemongo');

dotenv.config();
const app = express();

app.use(express.json()); // Middleware para JSON

conectarDB(); // Conectar a MongoDB

// Rutas
app.use('/api/tipoAgua', tipoAguaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
