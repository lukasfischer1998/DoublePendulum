const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// dimensions context transformation
const canvasW = document.body.clientWidth;
const canvasH = document.body.clientHeight;
canvas.width = canvasW;
canvas.height = canvasH;
ctx.translate(canvasW / 2, canvasH / 2);
ctx.scale(1, -1);

let doublePendulums = [];
let framesPerSecond = 120;
let animationInterval;

//start animation
function startAnimation() {
  doublePendulums = [];
  const doublePendulumsCount =
    parseInt(document.getElementById("pendulumCount").value) || 5;

  // Create pendulum
  for (let i = 0; i < doublePendulumsCount; i++) {
    const initA1 = 2 * Math.PI * getRandomNumber(0.35, 0.65);
    const initA2 = 2 * Math.PI * getRandomNumber(0.35, 0.65) + i * 0.02;

    const doublePendulum = new DoublePendulum({
      fixPointX: 0,
      fixPointY: 0,
      r1: 150,
      m1: 1,
      a1: initA1,
      r2: 150,
      m2: 0.5,
      a2: initA2,
      g: 0.05,
      ctx,
      color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
    });

    doublePendulums.push(doublePendulum);
  }

  let drawOnlyLastCircle = false;

  // only the last circle
  setTimeout(() => (drawOnlyLastCircle = true), 7000);

  // Main loop
  animationInterval = setInterval(() => {
    // Clear
    ctx.fillStyle = "black";
    ctx.fillRect(
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    // Cal draw pendulums
    doublePendulums.forEach((doublePendulum) => {
      doublePendulum.calculate();
      doublePendulum.draw(drawOnlyLastCircle);
    });
  }, 1000 / framesPerSecond);
}

// stop animation
function stopAnimation() {
  clearInterval(animationInterval);
}

document
  .getElementById("startButton")
  .addEventListener("click", startAnimation);

document.getElementById("stopButton").addEventListener("click", stopAnimation);

// Helper Rand
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
