let img;
let rectarray1 = [];
let rectarray2 = [];
function preload() {
  rectMode(CENTER);
  img = loadImage("PXL_20220412_192656235_3.jpg");
  song = loadSound("10kpools.mp3");
}

var song;
function setup() {
  rectMode(CENTER);
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  console.log(song.duration());
  fft = new p5.FFT();
  createCanvas(320, 320);

  pixelDensity(1);
  image(img, 0, 0, width, height);
  loadPixels();
  //   clear();

  console.log(pixels[0], pixels[1], pixels[2], pixels[3]);
  console.log(pixels);
  noStroke();

  //   for (let x = 0; x < width; x += pixelation_level) {
  //     for (let y = 0; y < height; y += pixelation_level) {
  //       let i = (x + y * width) * 4;
  //       rectarray1.push(x);
  //       rectarray2.push(y);
  //       let r = pixels[i + 0];
  //       let g = pixels[i + 1];
  //       let b = pixels[i + 2];
  //       let a = pixels[i + 3];

  //       fill(r, g, b, a);
  //       rect(x, y, pixelation_level - 0.2, pixelation_level - 0.2);
  //     }
  //   }

  //   song.play();
}
let notpaused = true;
let sampleIsPlaying = false;
let countdown = true;
let g = 0;
let pixelation_level = 4;
function create() {
  if (notpaused) {
    // console.log(countdown);
    // console.log(g);

    if (countdown) {
      g += 4;
      if (g >= 30) time = 0;
      if (g >= 50) (countdown = false), (time = 0);
    } else {
      g -= 4;

      if (g <= 4) (countdown = true), (time = 0);
    }
    pixelation_level = g;

    setTimeout(create, 1730);
  }
}
function mousePressed() {
  if (sampleIsPlaying) {
    notpaused = false;
    g = 0;
    create();
    song.stop();
    sampleIsPlaying = false;
  } else {
    notpaused = true;
    create();
    song.play();
    sampleIsPlaying = true;
  }
}
let spacing;
function rotateIt(angle) {
  rotate(angle);
}
let angle = 0;
let time = 0;
function draw() {
  clear();

  //   updatePixels();
  var vol2 = analyzer.getLevel([0]);
  let g2 = map(vol2, 0, 1, 0, 255);
  let g3 = map(vol2, 0, 1, 0, 100);
  //   console.log(g3);
  push();
  // translate(width / 2, height / 2);
  tint(125, 87);
  background(img);
  pop();
  push();
  // translate(width / 2, height / 2);
  time++;
  //   background(g2);
  for (let x = 0; x < width; x += pixelation_level) {
    for (let y = 0; y < height; y += pixelation_level) {
      let i = (x + y * width) * 4;

      let r = pixels[i + 0];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      let a = pixels[i + 3];

      fill(r, g, b, a);
      spacing = pixelation_level / 2;
      if (pixelation_level > 3) {
        spacing = pixelation_level / 2;
      } else {
        spacing = 0;
      }
      //   setTimeout(rotate(g2), 1730);8
      rect(x, y - time, pixelation_level - spacing, pixelation_level - spacing);
    }
  }
  for (let x = 0; x < width; x += pixelation_level) {
    for (let y = 0; y < height; y += pixelation_level) {
      let i = (x + y * width) * 4;
      let r = pixels[i + 0];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      let a = pixels[i + 3];
      fill(r, g, b, a);
      spacing = pixelation_level / 2;
      if (pixelation_level > 3) {
        spacing = pixelation_level / 2;
      } else {
        spacing = 0;
      }
      fill(g2, g, b, a);
      rect(x + time, y, pixelation_level - spacing, pixelation_level - spacing);
      stroke(g2, g, b, a);
      line(x, y, x + 2, y);
      line(x, y, x - 2, y);
    }
  }

  pop();

  angleMode(DEGREES);

  //   translate(width / 2, height / 2);
  let c = map(song.currentTime(), 0, 10, 0, 360);
  if (c % 3 < 1) {
    rotate(180);
  }
  //   let waveform = fft.waveform();
  //   noFill();
  //   beginShape();
  //   stroke(20);
  //   for (let i = 0; i < waveform.length; i++) {
  //     let x = map(i, 0, waveform.length, width / 2, width);
  //     let y = map(waveform[i], -1, 1, height / 2, height);
  //     image(img, x, y);
  //   }
  //   endShape();
  translate(width / 2, height / 2);
  let l = map(sin(time), -1, 1, 0, 360);

  for (let x = 0; x < width; x += pixelation_level) {
    for (let y = 0; y < height; y += pixelation_level) {
      let i = (x + y * width) * 4;

      let r = pixels[i + 0];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      let a = pixels[i + 3];
      //   noStroke();
      //   fill(r, g, b, a - 100);
      noFill();
      spacing = pixelation_level / 2;
      if (pixelation_level > 3) {
        // spacing = pixelation_level / 2;
        spacing = sin(r) * 10;
      } else {
        spacing = 2;
      }
      //   setTimeout(rotate(g2), 1730);8
      //   rect(
      //     x - 2,
      //     y - 2,
      //     pixelation_level - spacing,
      //     pixelation_level - spacing
      //   );

      //   image(
      //     img,
      //     x,
      //     y,
      //     pixelation_level - spacing,
      //     pixelation_level - 2 * spacing
      //   );
      //   set(x++, y++);
      stroke(r, g, b, a / 2);
      ellipse(x, y - time * 1.2, pixelation_level - spacing - sin(time) * 10);
    }
  }
}
