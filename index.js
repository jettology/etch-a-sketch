// ======================================================================
// Variable instantiations
// ======================================================================

// ********************
// Divs
// ********************
const screenContainerDiv = document.getElementById("screen-container");
const cellDiv = document.getElementsByClassName(".cell");

// ********************
// Buttons
// ********************
const brushButton = document.getElementById("brush-button");
const eraserButton = document.getElementById("eraser-button");
const clearButton = document.getElementById("clear-button");
const helpButton = document.getElementById("help-button");

// ********************
// Span
// ********************
const helpText = document.getElementById("help-text");

// ********************
// Color Picker
// ********************
const colorPicker = document.getElementById("color-picker");

// ********************
// Slider
// ********************
const slider = document.getElementById("slider");
const sliderText = document.getElementById("slider-text");

// ********************
// Switch
// ********************
const inputSwitch = document.getElementById("input-switch")
const gridSwitch = document.getElementById("grid-switch");
const gridCheckbox = document.getElementById("grid-checkbox");

// ********************
// Grid
// ********************
let gridLinesOn = true;
let numRows = 16;
let numCols = (numRows * 1.5);
let numCells = numRows * numCols;
let cells = [];

// ********************
// Colors
// ********************
let overColor = "black";        // default brush color (black brush)
const defaultColor = "white";   // default color (white background)
let currentColor = "black";     // current color of the cell
let prevBrushColor = "black";   // previous brush color
let brushColor = "black";       // current brush color

// ********************
// Border
// ********************
let currentBorder = "none";
const selectOutline = "coral dashed 2px";

// ********************
// Mouse + Keyboard
// ********************
let mousePressed = false;
let inputMode = "mouse"; // else, "keyboard"
let plantSeedCell = false;
let seedDiv = "";

// ======================================================================
// Event Listeners
// ======================================================================

// check if mouse button is pressed down
window.addEventListener('mouseup', () => mousePressed = false);

// clear button
clearButton.addEventListener('click', clearGrid);

// brush button
brushButton.addEventListener('click', turnBrushOn);

// eraser button
eraserButton.addEventListener('click', turnEraserOn);

// help button
helpButton.addEventListener('mouseover', showHelp);
helpButton.addEventListener('mouseout', hideHelp);

// input switch
inputSwitch.addEventListener('change', toggleInput);

// grid switch
gridSwitch.addEventListener('change', toggleGridLines)

// key press
window.addEventListener("keydown", upKeyDown);
window.addEventListener("keydown", downKeyDown);
window.addEventListener("keydown", leftKeyDown);
window.addEventListener("keydown", rightKeyDown);

// ======================================================================
// MAKE GRID + CELLS
// ======================================================================

// remove all divs from grid
function removeDivs() {
    screenContainerDiv.innerHTML = "";
}

// make a grid of divs based on row and col
function makeGrid(row, col) {

    cells = [];
    numCells = row * col;

    screenContainerDiv.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    screenContainerDiv.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

    for (let i = 0; i < numCells; i++) {
        const newCell = makeCell(i);
        newCell.addEventListener("mouseover", eventCell);
        newCell.addEventListener("mouseout", eventCell);
        newCell.addEventListener("mousedown", eventCell);

        screenContainerDiv.appendChild(newCell);

        cells.push(newCell);
    }

    checkGridLines();

    if (inputMode === "keyboard") {
        plantSeedCell = true;
    }
}

// create a new div cell
function makeCell(i) {
    const newDiv = document.createElement("div");
    newDiv.className = "cell";
    newDiv.index = i;

    return newDiv;
}

// ======================================================================
// GRID SIZE SLIDER
// ======================================================================

// adjust slider text when slider input gets changed
slider.oninput = function () {
    sliderText.innerHTML = `${this.value * 1.5} x ${this.value}`;

    removeDivs();

    numRows = this.value;
    numCols = this.value * 1.5;
    makeGrid(numRows, numCols);
}

// ======================================================================
// EVENTS FOR MOUSE + KEYBOARD
// ======================================================================

// events related to mouse/keyboard grid interactions
function eventCell(e) {

    // if MOUSE mode
    if (inputMode === "mouse") {
        // if mouse HOVERS over cell, highlight it
        if (e.type === "mouseover" && !mousePressed) {
            currentColor = e.target.style.background;
            e.target.style.background = overColor;
        }
        // else if mouse PRESSED over cell, color it
        else if (e.type === "mouseover" && mousePressed) {
            currentColor = brushColor;
            e.target.style.background = brushColor;
        }

        // if mouse DOWN over cell, color it
        else if (e.type === "mousedown") {
            mousePressed = true;
            currentColor = brushColor;
            e.target.style.background = brushColor;
        }

        // if mouse moves out of cell, return to original color
        else if (e.type === "mouseout") {
            e.target.style.background = currentColor;
        }
    }

    // else if KEYBOARD mode
    else if (inputMode === "keyboard" && plantSeedCell) {

        // if mouse HOVERS over cell, outline it
        if (e.type === "mouseover" && !mousePressed) {
            currentBorder = e.target.style.border;
            e.target.style.border = selectOutline;
        }

        // if mouse moves out of cell, return to original border
        else if (e.type === "mouseout") {
            e.target.style.border = currentBorder;
        }

        // if ready for input, select that cell as seed
        else if (e.type === "mousedown") {
            selectSeed(e);
        }
    }
}

// ======================================================================
// INPUT: KEYBOARD
// ======================================================================

// select starting cell to draw with keyboard inputs
function selectSeed(e) {
    plantSeedCell = false;
    currentColor = brushColor;
    e.target.style.border = currentBorder;
    e.target.style.background = brushColor;
    seedDiv = e.target;
}

// switch between keyboard and mouse inputs
function toggleInput() {
    if (inputMode === "keyboard") {
        inputMode = "mouse";
    }
    else if (inputMode === "mouse") {
        inputMode = "keyboard";
        plantSeedCell = true;
    }
}

function upKeyDown(e) {
    if (e.keyCode == 38 && (seedDiv.index - numCols > 0) && inputMode === "keyboard") {

        for (let i = 0; i < numCols; i++) {
            if (seedDiv.previousSibling.className === "cell") {
                seedDiv = seedDiv.previousSibling;
            }
        }

        seedDiv.style.background = brushColor;
    }
}

function downKeyDown(e) {
    if (e.keyCode == 40 && (seedDiv.index + numCols < numCells) && inputMode === "keyboard") {

        for (let i = 0; i < numCols; i++) {
            if (seedDiv.nextSibling.className === "cell") {
                seedDiv = seedDiv.nextSibling;
            }
        }

        seedDiv.style.background = brushColor;
    }
}

function leftKeyDown(e) {
    if (e.keyCode == 37 && (seedDiv.index % numCols != 0) && inputMode === "keyboard") {

        if (seedDiv.previousSibling.className === "cell") {
            seedDiv = seedDiv.previousSibling;
        }

        seedDiv.style.background = brushColor;
    }
}

function rightKeyDown(e) {
    if (e.keyCode == 39 && ((seedDiv.index + 1) % numCols != 0) && inputMode === "keyboard") {

        if (seedDiv.nextSibling.className === "cell") {
            seedDiv = seedDiv.nextSibling;
        }

        seedDiv.style.background = brushColor;
    }
}

// ======================================================================
// BUTTONS (BRUSH, ERASER, CLEAR) + UI (COLOR PICKER)
// ======================================================================

// turn brush on
function turnBrushOn() {
    // fix issue with subsequent "eraser" click
    if (prevBrushColor === "white") {
        prevBrushColor = colorPicker.value;
    }

    brushColor = prevBrushColor;
    overColor = brushColor;


}

// turn brush into eraser
function turnEraserOn() {
    prevBrushColor = brushColor;
    brushColor = "white";
    overColor = brushColor;
}

// clear grid of all user inputs
function clearGrid() {
    removeDivs();
    makeGrid(numRows, numCols);
}

// adjust color
colorPicker.oninput = function () {
    prevBrushColor = brushColor;
    brushColor = colorPicker.value;
    overColor = brushColor;
}

// ======================================================================
// GRID LINES
// ======================================================================

function checkGridLines() {
    if (gridLinesOn) {
        showGridLines();
    }
    else {
        hideGridLines();
    }
}

function toggleGridLines() {
    if (gridLinesOn) {
        gridLinesOn = false;
        hideGridLines();
    }
    else {
        gridLinesOn = true;
        showGridLines();
    }
}

function showGridLines() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.border = "0.5px solid lightgray";
    }
}

function hideGridLines() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.border = "none";
    }
}

function initializeCheckboxOn(checkboxID) {
    checkboxID.defaultChecked = "true";
}

// ======================================================================
// SHOW HELP
// ======================================================================
function showHelp() {
    helpText.style.visibility = "visible";
}

function hideHelp() {
    helpText.style.visibility = "hidden";
}


// ======================================================================
// INITIALIZATION
// ======================================================================

function initialize() {
    // initial grid size
    makeGrid(16, 24);

    // turn on grid lines switch to ON
    initializeCheckboxOn(gridCheckbox);
    gridLinesOn = true;
    showGridLines();
}

initialize();