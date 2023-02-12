


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
const colorButton = document.getElementById("color-button");
const clearButton = document.getElementById("clear-button");
const inputButton = document.getElementById("input-button");

// ********************
// Slider
// ********************
const slider = document.getElementById("slider");
const sliderText = document.getElementById("slider-text");

// ********************
// Grid
// ********************

// 2, 4, 6, 8, 10, ... just evens
let numRows = 16;
let numCols = (numRows * 1.5);
let numCells = numRows * numCols;

// ********************
// Colors
// ********************
let overColor = "black";
const defaultColor = "white";
let currentColor = "black";
let prevBrushColor = "black";
let brushColor = "black";

// ********************
// Mouse
// ********************
let mousePressed = false;


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


// ======================================================================
// Functions
// ======================================================================

// remove all divs from grid
function removeDivs() {
    screenContainerDiv.innerHTML = "";
}

// make a grid of divs based on row and col
function makeGrid(row, col) {

    numCells = row * col;

    screenContainerDiv.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    screenContainerDiv.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

    for (let i = 0; i < numCells; i++) {
        const newCell = makeCell();
        newCell.addEventListener("mouseover", eventCell);
        newCell.addEventListener("mouseout", eventCell);
        newCell.addEventListener("mousedown", eventCell);


        screenContainerDiv.appendChild(newCell);
    }
}

// create a new div cell
function makeCell() {
    const newDiv = document.createElement("div");
    newDiv.className = "cell";
    newDiv.style.border = "0.5px solid lightgray";

    return newDiv;
}

// adjust slider text when slider input gets changed
slider.oninput = function() {
    sliderText.innerHTML = `${this.value * 1.5} x ${this.value}`;

    removeDivs();

    numRows = this.value;
    numCols = this.value * 1.5;
    makeGrid(numRows, numCols);
}

// events related to mouse and grid interactions
function eventCell(e) {
    // if mouse hovers over cell, highlight it
    if (e.type === "mouseover" && !mousePressed) {
        currentColor = e.target.style.background;
        e.target.style.background = overColor;
    }
    else if (e.type === "mouseover" && mousePressed) {
        currentColor = brushColor;
        e.target.style.background = brushColor;
    }

    // if mouse clicks over cell, color it
    if (e.type === "mousedown") {
        mousePressed = true;
        currentColor = brushColor;
        e.target.style.background = brushColor;
    }

    // if mouse moves out of cell, return to original color
    if (e.type === "mouseout") {
        e.target.style.background = currentColor;
    }
}

// clear grid of all user inputs
function clearGrid() {
    removeDivs();
    makeGrid(numRows, numCols);
}

// turn brush on
function turnBrushOn() {
    brushColor = prevBrushColor;
    overColor = brushColor;
}

// turn brush into eraser
function turnEraserOn() {
    prevBrushColor = brushColor;
    brushColor = "white";
    overColor = brushColor;
}


makeGrid(16, 24);
