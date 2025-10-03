import React, { useState } from 'react';
import { Text, TextInput, Button, View, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Función para manejar el login
  const handleLogin = async () => {
    try {
      // Realizar la solicitud POST al backend
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        correo,
        contrasena,
      });

      console.log('Respuesta del backend:', response.data);

      // Verificar si el login fue exitoso
      if (response.data.success) {
        window.alert(`Login Exitoso: Bienvenido, ${response.data.user.nombre}`); // Usando window.alert() en la web
      } else {
        // Si las credenciales son inválidas
        window.alert(`Error: ${response.data.message}`); // Usando window.alert() en la web
      }
    } catch (error) {
      window.alert('Error: No se pudo conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
        />
        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
  },
  card: {
    width: '40%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
