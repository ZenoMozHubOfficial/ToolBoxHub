// === Sound loader ===
const sounds = {
  convert: new Audio("sounds/convert.mp3"),
  copy: new Audio("sounds/copy.mp3"),
  test: new Audio("sounds/test.mp3"),
  advanced: new Audio("sounds/advanced.mp3")
};

// === Elements ===
const scriptLink = document.getElementById("script-link");
const convertedOutput = document.getElementById("converted-output");
const scriptMaker = document.getElementById("script-maker");

const convertBtn = document.getElementById("convert-btn");
const copyBtn = document.getElementById("copy-btn");
const testBtn = document.getElementById("test-btn");
const advancedBtn = document.getElementById("advanced-btn");

// === Converter ===
convertBtn.addEventListener("click", () => {
  const link = scriptLink.value.trim();
  if (link) {
    const loadstring = `loadstring(game:HttpGet("${link}"))()`;
    convertedOutput.value = loadstring;
    playSound("convert");
  }
});

// === Copy Converted ===
copyBtn.addEventListener("click", () => {
  if (convertedOutput.value) {
    navigator.clipboard.writeText(convertedOutput.value);
    playSound("copy");
  }
});

// === Script Maker (Test) ===
testBtn.addEventListener("click", () => {
  if (scriptMaker.value.trim()) {
    navigator.clipboard.writeText(scriptMaker.value.trim());
    playSound("test");
  }
});

// === Advanced (link redirect) ===
advancedBtn.addEventListener("click", () => {
  playSound("advanced");
  window.open("https://scripts-seven-beige.vercel.app/", "_blank");
});

// === Play Sound Helper ===
function playSound(type) {
  if (sounds[type]) {
    sounds[type].currentTime = 0;
    sounds[type].play();
  }
}

// === Particle Background ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
}

function createParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}

drawParticles();
