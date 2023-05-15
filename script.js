
const NUM_ROWS = 5;
const NUM_COLUMNS = 5;
const LIGHTS_OFF_COLOR = 'grey';
const LIGHTS_ON_COLOR = 'orange';

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    randomizeLights();
})

function initializeGame (){
    const gameGrid = document.getElementById("game-grid");
    let clickCount = 0;

    for (let row = 0; row < NUM_ROWS; row++) {
        const eachRow = document.createElement('tr');

        for (let column = 0; column < NUM_COLUMNS; column++){
            const cellNumber = (row * NUM_COLUMNS) + column;

            const eachTd = document.createElement('td');
            eachTd.setAttribute('id', cellNumber);
            eachTd.style.backgroundColor = LIGHTS_OFF_COLOR;
            eachTd.innerText = cellNumber;
            eachTd.addEventListener('click', (event) => {
                toggleLights(event.target);
                clickCount += 1;
                changeCount(clickCount);
            })

            eachRow.appendChild(eachTd);
        }

        gameGrid.appendChild(eachRow);
    }
    initializeSetupButtons();
}

function changeCount (count) {
    const tracker = document.getElementById("tracker");
    tracker.innerHTML = "Clicks: " + count;
}

function initializeSetupButtons(){
    const randomButton = document.getElementById("randomizer");
    randomButton.addEventListener('click', randomizeLights);

    const clearButton = document.getElementById("clear");
    clearButton.addEventListener('click', clearLights);
}

function clearLights(){
    const allCells = document.querySelectorAll('td');
    allCells.forEach((eachCell) => {
        eachCell.style.backgroundColor = LIGHTS_OFF_COLOR;
    })
}


function randomizeLights(){
    const allCells = document.querySelectorAll('td');
    allCells.forEach((cell) => {
        const RandomOn = Math.random() < 0.5;
        if (RandomOn) {
            toggleLights(cell);
        }
    });
}

function toggleLights(lightClicked) {
    const cellNumber = parseInt(lightClicked.getAttribute('id'));
    
    //toggle target light
    toggleLight(lightClicked);
    
    //toggle top light
    if (Math.floor(cellNumber / NUM_COLUMNS) != 0) {
        const topCellNumber = cellNumber - 5;
        const topLight = document.getElementById(topCellNumber.toFixed());
        toggleLight(topLight);
    }
    
    //toggle bottom light
    if (Math.floor(cellNumber / NUM_COLUMNS) < NUM_ROWS - 1) {
        const bottomCellNumber = cellNumber + 5;
        const bottomLight = document.getElementById(bottomCellNumber.toFixed());
        toggleLight(bottomLight);
    }

    //toggle right light
    if (cellNumber % NUM_COLUMNS != (NUM_COLUMNS - 1)) {
        const rightCellNumber = cellNumber + 1;
        const rightLight = document.getElementById(rightCellNumber.toFixed());
        toggleLight(rightLight);
    }
    
    //toggle left light
    if (cellNumber % NUM_COLUMNS != 0) {
        console.log(cellNumber % NUM_COLUMNS)
        const leftCellNumber = cellNumber - 1;
        const leftLight = document.getElementById(leftCellNumber.toFixed());
        toggleLight(leftLight);
    }

    checkWin();
}

function toggleLight(lightClicked) {
    const currentColor = lightClicked.style.backgroundColor;

    if (currentColor === LIGHTS_OFF_COLOR) {
        lightClicked.style.backgroundColor = LIGHTS_ON_COLOR;
    } else {
        lightClicked.style.backgroundColor = LIGHTS_OFF_COLOR;
    }
}

function checkWin(){
    const allCells = document.querySelectorAll('td');
    allCells.forEach((cell) => {
        const lightColor = cell.style.backgroundColor;
        if (lightColor === LIGHTS_OFF_COLOR){
            return false;
        } 
      });
    return true;
}