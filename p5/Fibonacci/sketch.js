let fibonacci = [];

fibonacci[0] = 0;
fibonacci[1] = 1;

let a = 0;
let b = 1;

function setup() {
  createCanvas(1200, 885);

  angleMode(DEGREES);

  // for (let i = 2; i <= 10; i++) {
  //   fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
  //   console.log(fibonacci[i]);
  // }
  
  for (let i = 2; i <= 17; i++) {
    fibonacci[i] = a + b;
    a = b;
    b = fibonacci[i];
  }

}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  for (let i = 0; i < fibonacci.length; i++) {
    const fib = fibonacci[i];
    rect(0, 0, fib, fib);
    arc(fib, 0, 2 * fib, 2 * fib, 90, 180);
    translate(fib, fib);
    rotate(-90);
  }

}
