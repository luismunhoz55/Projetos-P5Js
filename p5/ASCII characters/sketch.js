const density = 'Ñ@#W$9876543210?!abc;:+=-,._        ';
let me;

function preload() {
  me = loadImage('luis1150.png');
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);

  // image(me, 0, 0, width, height);

  let w = width / me.width;
  let h = height / me.height;

  me.loadPixels();
  for (let i = 0; i < me.width; i++) {
    for (let j = 0; j < me.height; j++) {
      const pixelIndex = (i + j * me.width) * 4;
      const r = me.pixels[pixelIndex + 0];
      const g = me.pixels[pixelIndex + 1];
      const b = me.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));

      noStroke();
      fill(255)
      // square(i * w, j * h, w);
      textAlign(CENTER, CENTER)
      textSize(w);
      text(density.charAt(charIndex), i * w + w / 2, j * h + h / 2);

    }
  }

  noLoop();

}