let population;
let target;
let lifespan = 120;
let count = 0;

function setup() {
  createCanvas(600, 600);

  population = new Population();

  target = new Ball(width / 2, 50, 60, 200, 100);

}


function draw() {
  background(51);

  count++;

  population.run();

  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }
  // console.log(population.matingPool);

  target.show();
}

function Population() {
  this.balls = [];
  this.popSize = 5;
  this.matingPool = [];

  for (let i = 0; i < this.popSize; i++) {
    this.balls[i] = new Ball(i * 125 + 50, 400)
  }

  this.run = function () {
    for (let i = 0; i < this.popSize; i++) {
      this.balls[i].show();
    }
  }

  this.evaluate = function () {
    for (let i = 0; i < this.popSize; i++) {
      //calcular a fitness de cada um
      this.balls[i].calcRedFitness();
      this.balls[i].calcGreenFitness();
      this.balls[i].calcBlueFitness();
      this.balls[i].calcFitness();
    }

    //pegar os melhores e colocar num novo array
    let bestFit = 0;
    for (let i = 0; i < this.popSize; i++) {
      if (this.balls[i].fitness > bestFit) {
        bestFit = this.balls[i].fitness;
        this.balls[i].best = true;
      }
    }
    for (let i = 0; i < this.popSize; i++) {
      if (this.balls[i].fitness < bestFit) {
        this.balls[i].best = false;
      }
    }

    for (let i = 0; i < this.popSize; i++) {
      if (this.balls[i].best) {
        this.fitness *= 100;
      }
      this.balls[i].fitness /= bestFit;
    }
    //preencher o array com os melhores e suas devidas pontuações
    for (let i = 0; i < this.popSize; i++) {
      let n = this.balls[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.balls[i]);
      }
    }

  }

  this.selection = function () {
    let newBalls = [];
    for (let i = 0; i < this.balls.length; i++) {
      var parentA = random(this.matingPool);
      var parentB = random(this.matingPool);
      var child = parentA.crossoverB();
      newBalls.push(child);
    }
    this.balls = newBalls;
    console.log(this.balls);
  }

}

function Ball(x, y, r, g, b) {
  if (!x && !y) {
    this.x = random(width);
    this.y = random(height);
  } else {
    this.x = x;
    this.y = y;
  }

  if (!r && !g && !b) {
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  } else {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  this.fitness;
  this.redFitness = 0;
  this.greenFitness = 0;
  this.blueFitness = 0;

  this.best = false;

  this.calcRedFitness = function () {
    this.redFitness = target.r - this.r;
    if (this.redFitness < 0) {
      this.redFitness *= -1;
    }
  }
  this.calcGreenFitness = function () {
    this.greenFitness = target.r - this.r;
    if (this.greenFitness < 0) {
      this.greenFitness *= -1;
    }
  }
  this.calcBlueFitness = function () {
    this.blueFitness = target.b - this.b;
    if (this.blueFitness < 0) {
      this.blueFitness *= -1;
    }
  }
  this.calcFitness = function () {
    this.fitness = this.redFitness + this.greenFitness + this.blueFitness;
  }

  this.crossover = function (partner) {
    let red;
    let green;
    let blue;

    let pickRed = random(1);
    let pickGreen = random(1);
    let pickBlue = random(1);

    if (pickRed < 0.5) {
      red = this.r;
    } else {
      red = partner.r;
    }
    if (pickGreen < 0.5) {
      green = this.g;
    } else {
      green = partner.g;
    }
    if (pickBlue < 0.5) {
      blue = this.b;
    } else {
      blue = partner.b;
    }

    return new Ball(random(width), random(height), red, blue, green);

  }

  this.crossoverB = function () {
    let red = this.r + random(5);
    let green = this.g + random(5);
    let blue = this.b + random(5);

    return new Ball(random(width), random(height), red, blue, green);

  }

  this.show = function () {
    noStroke;
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, 16, 16)
  }

}

