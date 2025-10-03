// backend/src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());  // Para parsear JSON en las peticiones
app.use('/api', routes);  // Prefijo de las rutas

// Ruta básica para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor de la API!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
