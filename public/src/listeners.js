const colorRange = document.getElementById('customRange');
const envBack = document.getElementById('envBod');

colorRange.addEventListener('input', function () {
    const value = this.value; 
    
    console.log(value); 
});