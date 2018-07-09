var sakuraNum = 300;

var sakuraArray = [];

var colors = [];

var outTheta = 0;

function setup() {
  createCanvas(500, 500);

  for (var i = 0; i < sakuraNum; i++) {
    sakuraArray.push(new Sakura());
  }

  noStroke();

  colors.push(color(225, 183, 232, 150));
  colors.push(color(224, 69, 172, 150));
  colors.push(color(231, 142, 249, 150));

  textAlign(CENTER, CENTER);
  strokeJoin(ROUND);
  textFont("Sawarabi Mincho");
}

function draw() {
  blendMode(BLEND);
  background(0);

  blendMode(ADD);
  for (var i = 0; i < sakuraNum; i++) {
    sakuraArray[i].draw();
    sakuraArray[i].move();
  }

  textSize(43);
  fill(255);
  stroke(200,0,0);
  strokeWeight(4);
  text("審神者\n音声交信中", width / 2, height / 2 - 80);

  fill(255);
  noStroke();
  for(var k = 0; k < 10; k++){
    var rectH = 60 * noise(k+frameCount/12);
    var rectW = 10;
    rect(k * rectW * 1.3 + width/2 - 5*rectW*1.3, height/2-rectH + 30, rectW, rectH);
  }

  noStroke();
  fill("#8F82BC");
  textSize(28);
  text("近侍専用回線", width / 2, height / 2 + 55);

  fill(255);
  textSize(18);
  text("対時間遡行軍用\n攻性防壁作動中", width / 2, height / 2 + 100);

}

function Sakura() {
  var n = 4;
  var A, md, r, x, y;

  this.theta = random(360);
  this.thetaDelta = 0;
  this.objTheta = this.theta;
  this.outR = random(150, 220);

  this.size = random(20, 50);
  this.c = floor(random(3));
  this.speed = random(0.5, 2.0);
  this.outTheta = 0;

  this.draw = function() {
    push();
    translate(width / 2, height / 2);
    rotate(radians(this.outTheta));
    this.ox = this.outR * cos(radians(this.theta));
    this.oy = this.outR * sin(radians(this.theta));

    fill(colors[this.c]);

    push();
    translate(this.ox, this.oy);
    rotate(radians(this.theta + 45));
    beginShape();
    for (var t = 0; t < 360 / 4; t++) {
      A = n / PI * radians(t);

      md = floor(A) % 2;

      r = pow(-1, md) * (A - floor(A)) + md;

      R = r + 2 * calcH(r);

      x = this.size * R * cos(radians(t));
      y = this.size * R * sin(radians(t));

      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
    pop();
  };

  this.move = function() {
    this.outTheta -= this.speed;
  };
}

function calcH(x) {
  if (x < 0.8) {
    return 0;
  } else {
    return 0.8 - x;
  }
}
