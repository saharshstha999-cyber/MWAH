/* =========================================================
   SETTINGS — feel free to edit these!
   ========================================================= */

// The floating memories shown one at a time in Scene 2.
// Add, remove, or reword lines here - script.js just plays
// through whatever is in this list.
const memories = [
  "You've made ordinary days feel extraordinary.",
  "You've made me laugh when I didn't even want to smile.",
  "You became my favorite place without ever being a place.",
  "I never expected someone could mean this much to me.",
];

// How long each memory stays fully visible, in milliseconds,
// before fading out and showing the next one.
const MEMORY_HOLD_TIME = 2600;


/* =========================================================
   GRAB THE HTML ELEMENTS WE NEED
   ========================================================= */

const starsContainer = document.getElementById("stars-container");
const particlesContainer = document.getElementById("particles-container");
const firefliesContainer = document.getElementById("fireflies-container");
const flowersContainer = document.getElementById("flowers-container");

const sceneIntro = document.getElementById("scene-intro");
const sceneStar = document.getElementById("scene-star");
const sceneMemories = document.getElementById("scene-memories");
const scenePath = document.getElementById("scene-path");
const sceneCelebration = document.getElementById("scene-celebration");
const sceneForever = document.getElementById("scene-forever");

const memoryCard = document.getElementById("memory-card");
const yesButton = document.getElementById("yes-button");
const giantHeart = document.getElementById("giant-heart");
const surpriseButton = document.getElementById("surprise-button");

const confettiContainer = document.getElementById("confetti-container");
const celebrationHeartsContainer = document.getElementById("celebration-hearts-container");
const sparklesContainer = document.getElementById("sparkles-container");

const foreverHeartsContainer = document.getElementById("forever-hearts-container");
const foreverSparklesContainer = document.getElementById("forever-sparkles-container");

const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");


/* =========================================================
   HELPER: SWITCH BETWEEN SCENES
   Every scene is a full-screen div. Showing one is just a
   matter of adding the "active" class to it and removing
   "active" from all the others - the CSS handles the fade.
   ========================================================= */

const allScenes = [
  sceneIntro,
  sceneStar,
  sceneMemories,
  scenePath,
  sceneCelebration,
  sceneForever,
];

function showScene(sceneToShow) {
  allScenes.forEach(function (scene) {
    scene.classList.remove("active");
  });
  sceneToShow.classList.add("active");
}


/* =========================================================
   STEP 0: BUILD THE NIGHT SKY (stars, particles, fireflies,
   glowing flowers). All purely decorative background pieces.
   ========================================================= */

// Twinkling stars scattered across the whole sky
for (let i = 0; i < 70; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 90 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  starsContainer.appendChild(star);
}

// Soft drifting particles (like glowing dust) rising slowly
for (let i = 0; i < 22; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = 10 + Math.random() * 8 + "s";
  particle.style.animationDelay = Math.random() * 10 + "s";
  particlesContainer.appendChild(particle);
}

// Fireflies wandering gently around the lower half of the screen
for (let i = 0; i < 14; i++) {
  const firefly = document.createElement("div");
  firefly.className = "firefly";
  firefly.style.left = Math.random() * 100 + "%";
  firefly.style.top = 45 + Math.random() * 45 + "%"; // lower half of screen
  firefly.style.animationDuration = 6 + Math.random() * 6 + "s, " + (2 + Math.random() * 2) + "s";
  firefly.style.animationDelay = Math.random() * 4 + "s";
  firefliesContainer.appendChild(firefly);
}

// A handful of glowing flowers near the bottom of the screen
const flowerEmojis = ["🌸", "🌷", "💮"];
for (let i = 0; i < 6; i++) {
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
  flower.style.left = 5 + Math.random() * 90 + "%";
  flower.style.top = 80 + Math.random() * 15 + "%";
  flower.style.animationDelay = Math.random() * 3 + "s";
  flowersContainer.appendChild(flower);
}


/* =========================================================
   STEP 1: INTRO -> QUESTION SCENE
   Tapping anywhere on the intro moves the story forward.
   ========================================================= */

sceneIntro.addEventListener("click", function () {
  showScene(sceneStar);

  // This is the very first tap/click on the page, which means
  // the browser will now allow audio to play. If there's no
  // music.mp3 file, this simply fails quietly - nothing breaks.
  bgMusic.play().catch(function () {
    console.log("No music file found (or autoplay blocked). That's okay!");
  });
});


/* =========================================================
   STEP 2: "YES." -> START THE MEMORIES
   ========================================================= */

yesButton.addEventListener("click", function (event) {
  event.stopPropagation(); // don't let the click "fall through" to anything behind it
  currentMemoryIndex = 0;
  showScene(sceneMemories);
  playMemories(0);
});

let memoryTimer = null; // keeps track of the current pending timeout

// Shows the memory at the given index, then schedules the next one
function playMemories(index) {
  // Once we've shown every memory, move on to the heart path
  if (index >= memories.length) {
    setTimeout(function () {
      showScene(scenePath);
    }, 1000);
    return;
  }

  // Show this memory
  memoryCard.textContent = memories[index];
  memoryCard.classList.add("show");

  // After it's been visible for a while, fade it out, then
  // show the next one
  memoryTimer = setTimeout(function () {
    memoryCard.classList.remove("show");
    setTimeout(function () {
      playMemories(index + 1);
    }, 700); // matches the fade-out time in style.css
  }, MEMORY_HOLD_TIME);
}

// Let her tap the memories scene to skip ahead faster if she wants
let currentMemoryIndex = 0;
sceneMemories.addEventListener("click", function () {
  clearTimeout(memoryTimer);
  memoryCard.classList.remove("show");
  currentMemoryIndex++;
  setTimeout(function () {
    playMemories(currentMemoryIndex);
  }, 400);
});

// NOTE: the simple tap-to-skip above and the automatic timer
// above both call playMemories(), so if she never taps, the
// story still plays through all the memories by itself.


/* =========================================================
   STEP 3: THE GIANT HEART -> CELEBRATION
   ========================================================= */

giantHeart.addEventListener("click", function () {
  showScene(sceneCelebration);
  startConfetti();
  startCelebrationHearts();
  startSparkles();
});


/* =========================================================
   STEP 4: CELEBRATION EFFECTS
   ========================================================= */

const confettiColors = ["#ff8fd0", "#ffd166", "#ff6b6b", "#ffffff", "#c9a0ff"];

function createConfettiPiece() {
  const piece = document.createElement("div");
  piece.className = "confetti-piece";
  piece.style.left = Math.random() * 100 + "%";
  piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];

  const fallTime = 3 + Math.random() * 2.5;
  piece.style.animationDuration = fallTime + "s";

  confettiContainer.appendChild(piece);
  setTimeout(function () { piece.remove(); }, fallTime * 1000);
}

const celebrationHeartEmojis = ["💖", "💕", "💗", "❤️", "💞", "🎈"];

function createCelebrationHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = celebrationHeartEmojis[Math.floor(Math.random() * celebrationHeartEmojis.length)];
  heart.style.left = Math.random() * 100 + "%";

  const riseTime = 5 + Math.random() * 4;
  heart.style.animationDuration = riseTime + "s";

  celebrationHeartsContainer.appendChild(heart);
  setTimeout(function () { heart.remove(); }, riseTime * 1000);
}

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle-bit";
  sparkle.textContent = "✨";
  sparkle.style.left = Math.random() * 100 + "%";
  sparkle.style.top = Math.random() * 100 + "%";

  sparklesContainer.appendChild(sparkle);
  setTimeout(function () { sparkle.remove(); }, 1800);
}

// These interval IDs let us stop the celebration effects later
// when we move on to the forever screen, so the page doesn't
// keep creating extra elements it no longer needs.
let confettiInterval = null;
let celebrationHeartsInterval = null;
let sparklesInterval = null;

function startConfetti() {
  createConfettiPiece();
  confettiInterval = setInterval(createConfettiPiece, 180);
}

function startCelebrationHearts() {
  createCelebrationHeart();
  celebrationHeartsInterval = setInterval(createCelebrationHeart, 500);
}

function startSparkles() {
  createSparkle();
  sparklesInterval = setInterval(createSparkle, 300);
}


/* =========================================================
   STEP 5: "ONE LAST SURPRISE..." -> FOREVER SCENE
   ========================================================= */

surpriseButton.addEventListener("click", function (event) {
  event.stopPropagation();

  // Stop the celebration effects so they don't keep running
  // in the background forever
  clearInterval(confettiInterval);
  clearInterval(celebrationHeartsInterval);
  clearInterval(sparklesInterval);

  showScene(sceneForever);
  startForeverHearts();
  startForeverSparkles();
});

const foreverHeartEmojis = ["💖", "💕", "💗", "❤️", "💞", "✨"];

function createForeverHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = foreverHeartEmojis[Math.floor(Math.random() * foreverHeartEmojis.length)];
  heart.style.left = Math.random() * 100 + "%";

  const riseTime = 6 + Math.random() * 5;
  heart.style.animationDuration = riseTime + "s";

  foreverHeartsContainer.appendChild(heart);
  setTimeout(function () { heart.remove(); }, riseTime * 1000);
}

function createForeverSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle-bit";
  sparkle.textContent = "✨";
  sparkle.style.left = Math.random() * 100 + "%";
  sparkle.style.top = Math.random() * 100 + "%";

  foreverSparklesContainer.appendChild(sparkle);
  setTimeout(function () { sparkle.remove(); }, 1800);
}

// "Forever" just means these keep running with no stop condition -
// new hearts/sparkles are created continuously, and each one cleans
// itself up automatically after its animation finishes, so the page
// stays light and smooth no matter how long it's left open.
function startForeverHearts() {
  createForeverHeart();
  setInterval(createForeverHeart, 350);
}

function startForeverSparkles() {
  createForeverSparkle();
  setInterval(createForeverSparkle, 250);
}


/* =========================================================
   MUSIC MUTE/UNMUTE BUTTON
   ========================================================= */

musicToggle.addEventListener("click", function (event) {
  event.stopPropagation(); // don't trigger scene taps underneath it
  if (bgMusic.muted) {
    bgMusic.muted = false;
    musicToggle.textContent = "🔈";
    bgMusic.play().catch(function () {});
  } else {
    bgMusic.muted = true;
    musicToggle.textContent = "🔇";
  }
});
