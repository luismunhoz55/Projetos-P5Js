let font;
let points;
let vehicles = [];
let word;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function shuffleArr() {
  for (let vehicle of vehicles) {
    vehicle.pos.set(random(width), random(height));
  }
}

function setWord(word, array) {

  len = word.length / 4;

  let size = word.length > 2 ? 500 / len : 400;

  text = font.textToPoints(word, 50, height / 2 + 200, size, {
    sampleFactor: 0.25
  });

  for (let i = 0; i < text.length; i++) {
    let pt = text[i];
    if (array[i]) {
      array[i].target.set(pt.x, pt.y);
    } else {
      array.push(new Vehicle(pt.x, pt.y));
    }
  }

  array.splice(text.length);

}

function setup() {
  createCanvas(1200, 800);

  input = select('#texto');

}

function draw() {
  background(0);

  setWord(input.value(), vehicles)

  for (let vehicle of vehicles) {
    vehicle.behaviors();
    vehicle.update();
    vehicle.show();
  }

}