// Functie die automatisch wordt uitgevoerd wanneer de pagina wordt geladen
window.onload = function() {
    window.open('level1.html', '_blank');  // Nieuwe tabblad of venster openen
}

// Reference to canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variables to track game state
let gameStarted = false;
let gameRunning = false;

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Start game function
function startGame() {
    document.getElementById('menu').style.display = 'none';
    gameRunning = true;
    gameLoop();
}

// Load game function
function loadGame() {
    alert('Load game feature is not implemented yet.');
}

// Settings function
function openSettings() {
    alert('Settings menu is not implemented yet.');
}

// Exit game function
function exitGame() {
    if (confirm('Do you really want to exit the game?')) {
        window.close();
    }
}
backgroundMusic1.volume = 1
backgroundMusic.volume = 0.2