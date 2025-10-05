import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';

export default function User({ route, navigation }) {
  // Obtener los datos del usuario del login
  const { user } = route.params;

  const handleLogout = () => {
    // SOLUCIÓN PARA WEB Y MÓVIL
    if (Platform.OS === 'web') {
      // Para WEB - usar confirm nativo del navegador
      const confirmar = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
      if (confirmar) {
        // Recargar la página para volver al login
        window.location.href = window.location.origin;
      }
    } else {
      // Para MÓVIL - usar Alert de React Native
      Alert.alert(
        "Cerrar sesión",
        "¿Estás seguro de que quieres cerrar sesión?",
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Sí, cerrar sesión", 
            onPress: () => navigation.replace('Login')
          }
        ]
      );
    }
  };

  // Función para mostrar el tipo de usuario en español
  const getTipoUsuario = () => {
    return user.tipo_usuario === 'medico' ? 'Médico' : 'Paciente';
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>¡Bienvenido!</Text>
        <Text style={styles.userName}>{user.nombre} {user.apellido}</Text>
        <Text style={styles.userEmail}>{user.correo}</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Información del usuario:</Text>
          <Text style={styles.infoText}>• Rol: {getTipoUsuario()}</Text>
          <Text style={styles.infoText}>• Nombre: {user.nombre}</Text>
          <Text style={styles.infoText}>• Apellido: {user.apellido}</Text>
          <Text style={styles.infoText}>• Correo: {user.correo}</Text>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});