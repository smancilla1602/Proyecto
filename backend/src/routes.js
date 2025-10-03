const { Router } = require('express');
const pool = require('./db');  // Asegúrate de que la conexión con la base de datos esté bien configurada
const router = Router();  // Aquí se debe definir el 'router'

// Ruta básica para la raíz del servidor
router.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor de la API!');  // Esta es una respuesta básica de prueba
});

// Ruta de inicio de sesión
router.post('/auth/login', async (req, res) => {
  // Recibe el correo y la contraseña (contrasena)
  const { correo, contrasena } = req.body;

  console.log(`Petición POST recibida con correo: ${correo} y contrasena: ${contrasena}`);  // Para depuración

  try {
    // Consulta a la base de datos para verificar las credenciales
    const [rows] = await pool.query(
      'SELECT id_usuario, nombre, apellido, correo FROM usuarios WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );

    // Agregar un log aquí para verificar el resultado de la consulta
    console.log('Resultado de la consulta:', rows);

    // Si se encuentra el usuario
    if (rows.length > 0) {
      console.log('Usuario encontrado:', rows[0]);  // Log adicional para depuración
      return res.json({
        success: true,
        message: 'Login exitoso',
        user: rows[0],  // Devuelve el primer usuario que coincida
      });
    } else {
      console.log('Usuario no encontrado');  // Log adicional si no se encuentra el usuario
      return res.json({
        success: false,
        message: 'Credenciales inválidas',  // Mensaje si las credenciales no son válidas
      });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);  // Log de errores
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Puedes agregar otras rutas adicionales aquí si las necesitas

module.exports = router;
