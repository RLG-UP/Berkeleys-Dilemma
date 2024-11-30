const slider = document.getElementById('customRange');

const envBack = document.getElementById('idEnvBod');

const carouselImage = document.getElementById('carousel-image');
const images = carr;

slider.addEventListener('input', function () {
    const value = this.value; 
    const R = (57+value)%(256);
    const G = (62+value)%(62);
    const B = (65+value)%(18);
    
    console.log(R + " " + G + " " + B); 
    envBack.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;

    const index = Math.max(0, Math.floor(this.value / 10)-1);
    console.log(index);
    carouselImage.src = images[index].src;
    carouselImage.alt = `Foto ${index}`;
});