


// ======================================================================
// Variable instantiations
// ======================================================================

// ********************
// Divs
// ********************
const screenContainerDiv = document.getElementById("screen-container");


function makeGrid() {

    screenContainerDiv.style.gridTemplateRows = "repeat(10, 50px)";
    screenContainerDiv.style.gridTemplateColumns = "repeat(10, 50px)";

    let cells = [];

    for (let i = 0; i < 70; i++) {
        const newCell = makeCell();
        cells.push(newCell);

        const newContent = document.createTextNode(`${i+1}`);
        newCell.appendChild(newContent);

        screenContainerDiv.appendChild(newCell);
    }


}

function makeCell() {
    const newDiv = document.createElement("div");
    newDiv.className = "cell";
    newDiv.style.minHeight = "50px";
    newDiv.style.width = "50px";
    newDiv.style.border = "1px solid blue";

    return newDiv;
}

makeGrid();
