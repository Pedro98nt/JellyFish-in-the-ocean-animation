const jellyFish = document.querySelector(".jellyfish");
const leftLeg = jellyFish.querySelector("#left-leg");
const rightLeg = jellyFish.querySelector("#right-leg");
const head = jellyFish.querySelector("#head");

// [...Array(10)].forEach((_, i) => {
//   var cln = jellyFish.cloneNode(true);
//   cln.setAttribute("jelly-num", i);
//   document.querySelector(".container").appendChild(cln);
//   cln.style.left = i*100+i+5+"px";
// });

const jellyFishSwim = () => {
  const tl = gsap
    .timeline({ repeat: -1, repeatDelay: 2 })
    .to(
      ".jellyfish",
      {
        duration: 2,
        transformOrigin: "0% 0%",
        xPercent: "-=10",
        yPercent: "-=20",
        ease: "Power2.easeOut",
        rotation: -3
      },
      0.5
    )
    .to(".jellyfish", {
      duration: 4,
      yPercent: 0,
      xPercent: 0,
      ease: "Power1.easeInOut",
      rotation: 0
    })
    .to(
      head,
      {
        duration: 1.5,
        transformOrigin: "50% 50%",
        scaleY: 1.2,
        scaleX: 0.9,
        yoyo: true,
        repeat: 1,
        yoyoEase: "Power1.easeInOut",
        ease: "Power2.easeOut"
      },
      0
    )
    .to(
      leftLeg,
      {
        transformOrigin: "100% 0",
        duration: 2,
        rotation: -25,
        yoyo: true,
        repeat: 1,
        ease: "Power3.easeOut"
      },
      0.5
    )
    .to(
      rightLeg,
      {
        transformOrigin: "0 0",
        duration: 2,
        rotation: 25,
        yoyo: true,
        repeat: 1,
        ease: "Power3.easeOut"
      },
      1
    );

  return tl;
};

const InitBubbles = function (canvasEl, durationInSec) {
  let canvas;
  let ctx;
  let durationLimit_ms;

  const particles = [];
  let count = 100;
  let complete = false;
  let loopTime = 0;

  const update = () => particles.forEach((el) => el.update());

  const resize = () => {
    ctx.canvas.width = canvas.offsetWidth;
    ctx.canvas.height = canvas.offsetHeight;
    update();
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    particles.forEach((el) => el.draw());
  };
  const loop = () => {
    //  if (loopTime >= durationLimit_ms) InitBubbles.complete = true;
    draw();
    update();
    loopTime++;
    if (!InitBubbles.complete) window.requestAnimationFrame(loop);
  };

  const addParticles = () => {
    [...Array(count)].forEach(() => {
      particles.push(Bubble(canvas));
    });
  };

  const events = () => {
    window.addEventListener("resize", resize);
  };

  canvas = document.querySelector(`${canvasEl}`);
  ctx = canvas.getContext("2d");
  durationLimit_ms = durationInSec * 100;
  addParticles();
  events();
  loop();
  resize();

  return { complete: complete };
};

const Bubble = (canvEl) => {
  const random = (min, max) => min + Math.random() * (max - min);

  const canvas = canvEl;
  const ctx = canvas.getContext("2d");
  const height = document.body.clientHeight;

  var x = random(0, canvas.offsetWidth);
  var y = random(0, height);
  var alpha = random(0, 1);

  let fillArray = [
    "rgba(138, 204, 197, ",
    "rgba(62, 173, 178, ",
    "rgba(0, 79, 88, ",
    "rgba(0, 107, 118, "
  ];
  let fill = fillArray[Math.floor(Math.random() * fillArray.length)];
  const radius = random(0.3, 7.0);

  var i = 0;
  var easeDuration_ms = 5 * 60;

  var gravity = 2;
  var angle = random(-1, 1);
  var density = random(0, 1000);
  var speed = 0;
  var wind = 0;

  function draw() {
    ctx.beginPath();
    ctx.strokeStyle = fill + "1)";
    ctx.lineWidth = 1;

    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = fill + alpha + ")";
    ctx.fill();
    ctx.closePath();
  }

  const animateBubbles = () => {
    const hitTop = y < 0;
    angle += 0.02;

    if (hitTop) {
      y = height;
      x = random(0, canvas.offsetWidth);
    } else {
      y -= speed;
      x += wind;
      speed = 0.02 * (Math.cos(angle + density) + 1 + radius * 3);
      wind = 0.1 * (Math.sin(angle) * 2);
    }
  };

  const update = () => {
    animateBubbles();
  };

  return {
    update,
    draw
  };
};

document.addEventListener("DOMContentLoaded", () => {
  InitBubbles("#bubbles-canvas");
  jellyFishSwim();
});
