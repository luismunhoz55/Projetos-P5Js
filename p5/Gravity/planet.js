class Planet {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.speed = createVector();
        this.acc = createVector();
    }

    update() {
        this.pos.add(this.speed);
        this.speed.add(this.acc);
    }

    show(r) {
        fill(0);
        stroke(255);
        strokeWeight(1);
        circle(this.pos.x, this.pos.y, r);
    }

    move() {
        this.posMouse = createVector(mouseX, mouseY);
        this.G = 200;
        this.force = p5.Vector.sub(this.posMouse, this.pos);
        this.dsquared = this.force.magSq();
        this.strength = this.G / this.dsquared;
        this.force.setMag(this.strength);
        this.acc = this.force;
    }

}