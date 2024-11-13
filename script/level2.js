const bulletImage = document.getElementById('bullet1');
const playerImage = document.getElementById('player');
const zombieImage = document.getElementById('zombieImage');
const backgroundMusic = document.getElementById('backgroundMusic');
const backgroundMusic1 = document.getElementById('backgroundMusic1');
const jumpSound = document.getElementById('jump');
const walkSound = document.getElementById('walkingPlayer');
const shootSound = document.getElementById('shoot');
const gravity = 0.5;
const jumpStrength = 12;
const maxSpeed = 6;
const groundLevel = window.innerHeight - 650;
const moveSpeed = 4;

let y = 100;
let x = -530;
let zombieY = 100;
let zombieX = 1000;
let zombieSpeed = 2;
let playerHealth = 100; // Gezondheid van de speler
let speed = maxSpeed;
let moveLeft = false;
let moveRight = false;
let isJumping = false;
let verticalSpeed = 0;
let image = "./img/Anton Prajo 2.png";
let idle = "./img/Anton Prajo 1.png";
let gif = "./img/anton animatie laatste 0.gif";
let gifRotate = "./img/anton animatie laatste.gif";


// Muziekbeheer
function playMusic() {
   backgroundMusic.play();
   backgroundMusic1.play();
}

function pauseMusic() {
   backgroundMusic.pause();
   backgroundMusic1.play();
}

// Muziekvolume
backgroundMusic.volume = 0.4;
backgroundMusic1.volume = 0.7;

let damageCooldown = false; // Cooldown variabele voor schade
const damageInterval = 500; // 500 ms cooldown
let gameRunning = true; // Game status variabele
let animationFrameId; // ID voor de animation frame

function update() {
   if (!gameRunning) return; // Stop de update als de game niet draait

   if (isJumping) {
      y -= verticalSpeed;
      verticalSpeed -= gravity;
   }

   if (y >= groundLevel) {
      y = groundLevel;
      verticalSpeed = 0;
      isJumping = false;
   }

   if (moveLeft) {
      x -= moveSpeed;
      playerImage.style.transform = `translate(${x}px, ${y}px) scaleX(-1)`;
   }

   if (moveRight) {
      x += moveSpeed;
      playerImage.style.transform = `translate(${x}px, ${y}px) scaleX(1)`;
   }

   if (x < -670) x = -670;
   if (x > window.innerWidth - -5000) x = window.innerWidth - -5000;

   playerImage.style.transform = `translate(${x}px, ${y}px)`;
   zombieImage.style.transform = `translate(${zombieX}px, ${y}px)`;

   const leftOffset = window.innerWidth / 8;
   window.scrollTo(x + leftOffset, window.scrollY);

   animationFrameId = requestAnimationFrame(update);
}

function moveImage(event) {
   switch (event.key) {
      case 'a':
         moveLeft = true;
         playerImage.setAttribute("src", gifRotate);
         walkSound.currentTime = 0;
         walkSound.play();
         break;
      case 'd':
         moveRight = true;
         playerImage.setAttribute("src", gif);
         walkSound.currentTime = 0;
         walkSound.play();
         break;
      case ' ':
         if (!isJumping) {
            isJumping = true;
            verticalSpeed = jumpStrength;
            jumpSound.currentTime = 0;
            jumpSound.play();
         }
         break;
   }
}

function stopImage(event) {
   switch (event.key) {
      case 'a':
         moveLeft = false;
         playerImage.setAttribute("src", idle);
         break;
      case 'd':
         moveRight = false;
         playerImage.setAttribute("src", idle);
         break;
   }
}

// Kogel schieten met de linkermuisklik
window.addEventListener('click', shoot);
var canshoot = true;
var timeout = false;

function shoot() {
   if (canshoot) {
      const bullet = document.createElement('div');
      bullet.classList.add('bullet');
      bullet.style.position = 'absolute';
      bullet.style.left = `${x + 720}px`;
      bullet.style.top = `${y - -300}px`;
      document.body.appendChild(bullet);

      const bulletSpeed = 10;
      shootSound.currentTime = 0;
      shootSound.play();

      function moveBullet() {
         bullet.style.left = `${parseFloat(bullet.style.left) + bulletSpeed}px`;

         if (parseFloat(bullet.style.left) > window.innerWidth + '-1px') {
            bullet.remove();
         } else {
            requestAnimationFrame(moveBullet);
         }
      }
      canshoot = false;
      moveBullet();
   } else if (!timeout) {
      timeout = setTimeout(function () {
         canshoot = true;
         timeout = false;
      }, 1000);
   }
}

// Botsingsdetectie functie
function playerColliding(rect1, rect2) {
   return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
   );
}

// Damage-functie en gezondheidslogica
function applyDamage(damage) {
   if (!damageCooldown) {
      playerHealth -= damage;
      console.log(`Speler schade! Gezondheid: ${playerHealth}`);
      damageCooldown = true;
      setTimeout(() => {
         damageCooldown = false;
      }, damageInterval);

      if (playerHealth <= 0) {
         console.log('Speler is dood!');
         showDeathScreen(); // Toon het death screen
      }
   }
}

// Game loop voor botsingen
function gameLoop() {
   const playerRect = playerImage.getBoundingClientRect();
   const zombieRect = zombieImage.getBoundingClientRect();

   if (playerColliding(playerRect, zombieRect)) {
      applyDamage(20);
   }

   requestAnimationFrame(gameLoop);
}

function moveZombie() {
   if (zombieX < x) {
      zombieX += zombieSpeed;
   } else if (zombieX > x) {
      zombieX -= zombieSpeed;
   }

   zombieImage.style.transform = `translate(${zombieX}px, ${y}px)`;
   requestAnimationFrame(moveZombie);
}

function showDeathScreen() {
   const deathScreen = document.getElementById('deathScreen');
   deathScreen.style.display = 'flex'; // Maak de overlay zichtbaar
   pauseGame(); // Stop de game loop
}

function restartGame() {
   playerHealth = 100; // Reset de gezondheid
   x = -530; // Reset de speler positie
   y = 100; // Reset de Y-positie
   zombieX = 1000; // Reset de zombie positie
   const deathScreen = document.getElementById('deathScreen');
   deathScreen.style.display = 'none'; // Verberg de overlay
   update(); // Herstart de game loop
   gameLoop(); // Herstart de botsing detectie loop
}

function pauseGame() {
   // Stop de game loops
   cancelAnimationFrame(animationFrameId);
}

function exitGame() {
   if (confirm('Wil je het spel echt verlaten?')) {
      window.close();
   }
}

// Start de game
moveZombie();
gameLoop();
window.addEventListener('keydown', moveImage);
window.addEventListener('keyup', stopImage);
update();