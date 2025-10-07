const { Router } = require('express');
const pool = require('./db');
const router = Router();

// Ruta básica para la raíz del servidor
router.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor de la API!');
});

// Ruta de REGISTRO
router.post('/auth/registro', async (req, res) => {
  const { nombre, apellido, correo, contrasena, tipo_usuario = 'paciente' } = req.body;

  console.log(`Petición REGISTRO recibida: ${nombre} ${apellido}, ${correo}`);

  try {
    // Verificar si el correo ya existe
    const [existingUsers] = await pool.query(
      'SELECT id_usuario FROM usuarios WHERE correo = ?',
      [correo]
    );

    if (existingUsers.length > 0) {
      return res.json({
        success: false,
        message: 'El correo ya está registrado'
      });
    }

    // Insertar nuevo usuario
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, correo, contrasena, tipo_usuario) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, correo, contrasena, tipo_usuario]
    );

    console.log('Usuario registrado con ID:', result.insertId);

    res.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
});

// Ruta de inicio de sesión
router.post('/auth/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  console.log(`Petición POST recibida con correo: ${correo} y contrasena: ${contrasena}`);

  try {
    const [rows] = await pool.query(
      'SELECT id_usuario, nombre, apellido, correo FROM usuarios WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );

    console.log('Resultado de la consulta:', rows);

    if (rows.length > 0) {
      console.log('Usuario encontrado:', rows[0]);
      return res.json({
        success: true,
        message: 'Login exitoso',
        user: rows[0],
      });
    } else {
      console.log('Usuario no encontrado');
      return res.json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;