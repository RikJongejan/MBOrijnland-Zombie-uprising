document.getElementById('myElement').style.opacity = '0,7';

// Functie om het volume in te stellen
function setVolume(value) {
    document.getElementById('volumeValue').innerText = value;
    // Logica om het spelvolume aan te passen
    console.log("Volume ingesteld op: " + value);
    // Voeg hier je game audio-logica toe, bijvoorbeeld aanpassen van audio-API.
}

// function closeSettings() {
//     document.getElementById("settingsBox").style.display = "none";
// }