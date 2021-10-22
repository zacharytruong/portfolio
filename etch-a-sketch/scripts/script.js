let range = document.getElementById('range');
let rangeText = document.querySelector('.range');
let favcolor = document.getElementById('favcolor');
const sketchpad = document.getElementById('sketchpad-container');
const clear = document.getElementById('clear');
const rainbow = document.getElementById('rainbow');
const rainbowArray = ['#ff3366', 
                '#ff6633', 
                '#FFCC33', 
                '#33FF66', 
                '#33FFCC', 
                '#33CCFF', 
                '#3366FF', 
                '#6633FF', 
                '#CC33FF', 
                '#efefef'];

// New sketchpad on load
createSketchPad(range.value);
function createSketchPad(num){
  for (let i = 1; i <= num * num; i++){
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.width = (100 / num) + '%';
    pixel.style.height = (100 / num) + '%';
    sketchpad.appendChild(pixel);
  }
}

// Change pixel background on mouse over event
let pixels = Array.from(document.querySelectorAll('.pixel'));
pixels.forEach(changeBackground);
function changeBackground(pixel){
  pixel.addEventListener('mouseover', updatePixel);
  function updatePixel(){
    if (rainbow.className.includes('active')){
      pixel.style.background = rainbowArray[Math.ceil(Math.random() * (rainbowArray.length))];
    } else pixel.style.background = favcolor.value;
  }
}

// User creates a new sketchpad size
rangeText.textContent = range.value + 'x' + range.value;
range.addEventListener('change', () => refreshSketchPad(range.value));

// Set color value based on user's selection
favcolor.addEventListener('input', () => favcolor.value);

// Set color value based on rainbow colors
rainbow.addEventListener('click', () => rainbow.classList.toggle('active'));

// Clear the whole sketchpad
clear.addEventListener('click', () => {
  pixels.forEach( pixel => pixel.style.background = 'transparent');
})

// Reusable functions
function refreshSketchPad(num){
  removeAllPixels(sketchpad);
  createSketchPad(num);
  rangeText.textContent = num + 'x' + num;
  pixels = Array.from(document.querySelectorAll('.pixel'));
  pixels.forEach(changeBackground);
}
function removeAllPixels(parent){
  while (parent.firstChild) parent.removeChild(parent.firstChild);
}