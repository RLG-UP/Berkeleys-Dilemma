const colorRange = document.getElementById('customRange');
const envBack = document.getElementById('idEnvBod');
//rgb(255, 61, 17)
//rgb(57, 62, 65)
colorRange.addEventListener('input', function () {
    const value = this.value; 
    const R = (57+value)%(256);
    const G = (62+value)%(62);
    const B = (65+value)%(18);
    
    console.log(R + " " + G + " " + B); 
    envBack.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
});