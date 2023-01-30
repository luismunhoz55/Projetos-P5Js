var population;
var lifespan = 350;
var lifeP;
let count = 0;
let target;
var bestTime;
var generation = 1;
var generationP;

var rectangle1 = {
  x: 0,
  y: 400,
  width: 300,
  height: 10
}

var rectangle2 = {
  x: 250,
  y: 230,
  width: 450,
  height: 10
}

var rectangle3 = {
  x: 0,
  y: 150,
  width: 150,
  height: 10
}

var rectangle4 = {
  x: 330,
  y: 150,
  width: 400,
  height: 10
}

var rectangle5 = {
  x: 0,
  y: 450,
  width: 250,
  height: 10
}

var rectangle6 = {
  x: 330,
  y: 450,
  width: 400,
  height: 10
}

function setup() {
  createCanvas(600, 600);

  bestTime = lifespan;

  population = new Population();

  lifeP = createP();
  generationP = createP();

  target = createVector(width / 2, 50);
}

function draw() {
  background(51);

  population.run();

  lifeP.html(count);
  generationP.html("Geração " + generation);
  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    //population = new Population();
    count = 0;
    generation++;
  }

  rect(rectangle1.x, rectangle1.y, rectangle1.width, rectangle1.height);
  // rect(rectangle2.x, rectangle2.y, rectangle2.width, rectangle2.height);
  // rect(rectangle3.x, rectangle3.y, rectangle3.width, rectangle3.height);
  // rect(rectangle4.x, rectangle4.y, rectangle4.width, rectangle4.height);
  // rect(rectangle5.x, rectangle5.y, rectangle5.width, rectangle5.height);
  // rect(rectangle6.x, rectangle6.y, rectangle6.width, rectangle6.height);

  circle(target.x, target.y, 16)

  console.log("BEST TIME: " + bestTime)
}

function Population() {

  this.rockets = [];
  this.popSize = 100;
  this.matingPool = [];

  for (let i = 0; i < this.popSize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.run = function () {
    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

  this.evaluate = function () {

    let maxFit = 0;
    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxFit) {
        maxFit = this.rockets[i].fitness;
      }
      if (this.rockets[i].evaluated) {
        if (this.rockets[i].minTime < bestTime) {
          bestTime = this.rockets[i].minTime;
          this.rockets[i].best = true;
        }
      }
    }

    for (let i = 0; i < this.popSize; i++) {
      if (this.rockets[i].evaluated) {
        if (this.rockets[i].minTime > bestTime) {
          this.rockets[i].best = false;
        }
      }
      if (this.rockets[i].best) {
        // console.log(this.rockets[i]);
      }
    }

    for (let i = 0; i < this.popSize; i++) {
      this.rockets[i].fitness /= maxFit;
    }

    this.matingPool = [];
    for (let i = 0; i < this.popSize; i++) {

      var n = this.rockets[i].fitness * 100;
      if (this.rockets[i].best) {
        n *= 10;
      }
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function () {
    let newrockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingPool).dna;
      var parentB = random(this.matingPool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newrockets[i] = new Rocket(child);

    }
    this.rockets = newrockets;
    // console.log(this.rockets)
  }

}

function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {

    this.genes = [];

    for (let i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.3);
    }
  }

  this.crossover = function (partner) {
    var newGenes = [];
    var midPoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midPoint) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = partner.genes[i];
      }
    }
    return new DNA(newGenes);
  }

  this.mutation = function () {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.3);
      }
    }
  }

}

function Rocket(dna) {

  this.pos = createVector(100, 550);
  this.vel = createVector();
  this.acc = createVector();
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;
  this.completed = false;
  this.crashed = false;
  this.minTime = 1000;
  this.evaluated = false;
  this.best = false;


  this.calcFitness = function () {
    // if (this.minTime < bestTime) {
    //   bestTime = this.minTime;
    //   console.log(bestTime);
    // }

    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
    if (this.completed) {
      this.fitness = this.fitness * 100;
    }
    if (this.best) {
      this.fitness = this.fitness * 100;
    }
    if (this.crashed) {
      this.fitness /= 10;
    }

  }

  this.applyForce = function (force) {
    this.acc.add(force);
  }

  this.checkColision = function (object) {
    if (this.pos.x > object.x && this.pos.x < object.x + object.width && this.pos.y > object.y && this.pos.y < object.y + object.height) {
      this.crashed = true;
    }
  }

  this.update = function () {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();

      if (!this.evaluated) {
        this.minTime = count;
        this.evaluated = true;
        // console.log(this.minTime);
      }
    }

    this.checkColision(rectangle1);
    // this.checkColision(rectangle2);
    // this.checkColision(rectangle3);
    // this.checkColision(rectangle4);
    // this.checkColision(rectangle5);
    // this.checkColision(rectangle6);

    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }
    if (this.pos.y > height) {
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);

    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  }

  this.show = function () {

    if (!this.crashed) {
      push();
      noStroke();
      fill(255, 150);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      rectMode(CENTER);
      rect(0, 0, 25, 5);
      pop();
    }

  }

}

