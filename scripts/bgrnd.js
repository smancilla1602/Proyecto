document.addEventListener("DOMContentLoaded", function () {
    const images = ['../public/carruselPrin/dron0.jpg',
        '../public/carruselPrin/dron1.jpg',
        '../public/carruselPrin/dron2.jpg',
        '../public/carruselPrin/dron3.jpg',
        '../public/carruselPrin/dron4.jpeg'];
    
    let index = 0;
    function changeBackground() {
        document.body.style.background = `url('${images[index]}') no-repeat center center/cover`;
        index = (index + 1) % images.length;
    }
    setInterval(changeBackground, 4500); 
    changeBackground(); 
});