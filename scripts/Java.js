
// Función para mostrar mensajes en el área de notificación
function mostrarMensaje(texto, tipo = 'exito', tiempo = 3000) {
    const mensaje = document.getElementById('mensaje-confirmacion');
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`; // Agrega clase para el tipo de mensaje

    // Ocultar el mensaje después del tiempo especificado
    setTimeout(() => {
        mensaje.className = 'mensaje'; // Restablece la clase
    }, tiempo);
}

// Función para habilitar la edición
function habilitarEdicion() {
    const inputs = document.querySelectorAll('.input-editar');
    const textos = document.querySelectorAll('.lista-datos span');

    inputs.forEach(input => input.style.display = 'inline-block');
    textos.forEach(texto => texto.style.display = 'none');

    document.getElementById('guardar-btn').style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Hace scroll hacia el inicio de la sección de edición
}

// Función para guardar los cambios
function guardarCambios() {
    const inputs = document.querySelectorAll('.input-editar');
    const textos = document.querySelectorAll('.lista-datos span');

    inputs.forEach((input, index) => {
        textos[index].textContent = `${textos[index].textContent.split(':')[0]}: ${input.value}`;
        input.value = ''; // Limpia los inputs
    });

    inputs.forEach(input => input.style.display = 'none');
    textos.forEach(texto => texto.style.display = 'inline-block');

    document.getElementById('guardar-btn').style.display = 'none';

    mostrarMensaje('✅ Cambios guardados exitosamente.', 'exito');
}

// Función para volver al menú (redirige a otra página)
function volverAlMenu() {
    window.location.href = "Droneco.html";
}

document.getElementById('cambiar-fondo-btn').addEventListener('click', function() {
    document.getElementById('fondo-input').click();
});

document.getElementById('fondo-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        }
        reader.readAsDataURL(file);
    }
});