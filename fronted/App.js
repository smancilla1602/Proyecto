import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Text, 
  TextInput, 
  Button, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import axios from 'axios';
import User from './User';

const Stack = createStackNavigator();

// Componente de Login
function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('paciente');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.13:3001/api/auth/login', {
        correo,
        contrasena,
      });

      console.log('Respuesta del backend:', response.data);

      if (response.data.success) {
        // Navegar a la pantalla de usuario con los datos
        navigation.replace('User', { user: response.data.user });
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  };

  const handleRegistro = async () => {
    try {
      const response = await axios.post('http://192.168.1.13:3001/api/auth/registro', {
        nombre,
        apellido,
        correo,
        contrasena,
        tipo_usuario: tipoUsuario
      });

      console.log('Respuesta del registro:', response.data);

      if (response.data.success) {
        Alert.alert('Éxito', `Registro Exitoso: Bienvenido, ${nombre}`);
        setEsRegistro(false);
        setNombre('');
        setApellido('');
        setCorreo('');
        setContrasena('');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
        </Text>

        {esRegistro && (
          <>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={apellido}
              onChangeText={setApellido}
            />
          </>
        )}

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />

        {esRegistro && (
          <>
            <Text style={styles.label}>Tipo de usuario</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity 
                style={styles.radioButton}
                onPress={() => setTipoUsuario('paciente')}
              >
                <View style={styles.radioCircle}>
                  {tipoUsuario === 'paciente' && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.radioText}>Paciente</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.radioButton}
                onPress={() => setTipoUsuario('medico')}
              >
                <View style={styles.radioCircle}>
                  {tipoUsuario === 'medico' && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.radioText}>Médico</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={styles.buttonContainer}>
          <Button 
            title={esRegistro ? "Registrarse" : "Iniciar sesión"} 
            onPress={esRegistro ? handleRegistro : handleLogin} 
          />
        </View>

        <TouchableOpacity 
          style={styles.switchButton}
          onPress={() => setEsRegistro(!esRegistro)}
        >
          <Text style={styles.switchText}>
            {esRegistro 
              ? "¿Ya tienes cuenta? Inicia sesión" 
              : "¿No tienes cuenta? Regístrate"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Componente principal con navegación
function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="User" 
          component={User}
          options={{ 
            title: 'Mi Perfil',
            headerBackTitle: 'Cerrar sesión'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '100%',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  switchButton: {
    marginTop: 20,
    padding: 10,
  },
  switchText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default MainApp;