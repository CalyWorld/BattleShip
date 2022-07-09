import { Game } from "./game";
import { utils } from "./util"


const playerBoard = document.getElementById("playerBoard");
const computerBoard = document.getElementById("computerBoard");
const direction = document.querySelector("#direction");

let currDirection = "horizontal";
let currCell = [];
let game = Game();
let ships = utils().getCreatedShips();
let currShip = ships.shift();


const renderPlayerBoard = () => {
    let gameboard = Game().getPlayer().getGameboard().showGameboard();
    playerBoard.style.setProperty('--grid-rows', gameboard.length);
    playerBoard.style.setProperty('--grid-cols', gameboard.length);
    for (let r = 0; r < gameboard.length; r++) {
        for (let c = 0; c < gameboard.length; c++) {
            let cell = document.createElement("div");
            cell.dataset.coord = [r, c];
            playerBoard.appendChild(cell).className = "grid-item";
        }
    }
};

const renderComputerBoard = () => {
    let gameboard = Game().getComputerPlayer().getGameboard().showGameboard();
    computerBoard.style.setProperty('--grid-rows', gameboard.length);
    computerBoard.style.setProperty('--grid-cols', gameboard.length);
    for (let r = 0; r < gameboard.length; r++) {
        for (let c = 0; c < gameboard.length; c++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-item");
            cell.dataset.coord = [r, c];
            computerBoard.appendChild(cell);
        }
    }

};


const displayShipOnGameboard = (e, currShip, currCell) => {
    if (currShip === undefined) return;
    let element = e.target;
    let row = parseInt(element.getAttribute("data-coord")[0]);
    let column = parseInt(element.getAttribute("data-coord")[2]);
    let result = game.placePlayerShip(row, column, currShip, currDirection);
    console.table(game.getPlayer().getGameboard().showGameboard());
    if (!result) return;
    for (const cell of currCell) {
        cell.classList.remove("hovered-cell");
        cell.classList.add("ship-cell");
    }
    colorSurroundCells(row, column, currShip, currDirection);
    return result;
};

const colorSurroundCells = (row, column, currShip, currDirection) => {
    const playerCells = [...playerBoard.children];
    if (currDirection == "horizontal") {
        for (let c = column - 1; c <= column + currShip.getShipLength(); c++) {
            if (c < 0 || c > 9) continue;
            for (let r = row - 1; r <= row + 1; r++) {
                if (r < 0 || r > 9) continue;
                let cell = findCell(playerCells, r, c);
                if (!cell.classList.contains("ship-cell")) {
                    cell.classList.add("surrounding-cell");
                }
            }
        }
    } else if (currDirection == "vertical") {
        for (let c = column - 1; c <= column + 1; c++) {
            if (c < 0 || c > 9) continue;
            for (let r = row - 1; r <= row + currShip.getShipLength(); r++) {
                if (r < 0 || r > 9) continue;
                let cell = findCell(playerCells, r, c);
                if (!cell.classList.contains("ship-cell")) {
                    cell.classList.add("surrounding-cell");
                }
            }
        }
    }
};

const cellsOnHover = (e, currShip, currCell) => {
    if (currShip === undefined) return;
    const playerCells = [...playerBoard.children];
    let element = e.target;
    let row = parseInt(element.getAttribute("data-coord")[0]);
    let column = parseInt(element.getAttribute("data-coord")[2]);
    let cell;
    for (let i = 0; i < currShip.getShipLength(); i++) {
        if (currDirection == "vertical") {
            cell = findCell(playerCells, row + i, column);
        } else {
            cell = findCell(playerCells, row, column + i);
        }
        if (cell) {
            currCell.push(cell);
            cell.classList.add("hovered-cell");
        }
    }
    for (const cell of currCell) {
        if (currCell.length !== currShip.getShipLength() || cell.classList.contains("ship-cell")) {
            cell.classList.add("invalid-placement");
        }
    }
};

const cellsOfHover = (e) => {
    const playerCells = [...playerBoard.children];
    for (const cell of playerCells) {
        cell.classList.remove("hovered-cell");
        cell.classList.remove("invalid-placement");
    }
};

const placeCellsController = () => {
    playerBoard.addEventListener("click", (e) => {
        const result = displayShipOnGameboard(e, currShip, currCell);
        if (!result) return;
        currShip = ships.shift();
        if (currShip == undefined) {
            enableBoards();
            computerBoard.classList.remove("disable-board");
        }
    });
    playerBoard.addEventListener("mouseover", (e) => {
        if (e.target !== e.currentTarget) {
            cellsOnHover(e, currShip, currCell);
        }
    });

    playerBoard.addEventListener("mouseout", (e) => {
        if (e.target !== e.currentTarget) {
            cellsOfHover(e)
            currCell = [];
        }
    });

};

const findCell = (cells, row, column) => {
    return cells.find((cell) =>
        parseInt(cell.getAttribute("data-coord")[0]) == row &&
        parseInt(cell.getAttribute("data-coord")[2]) == column);
};



const updateBoard = (cells) => {
    let board = game.getPlayer().getGameboard().showGameboard();
    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board.length; column++) {
            if (board[row][column] == "miss") {
                createAttackSpan(true, cells, row, column); 
            }
            else if (board[row][column] !== "" && board[row][column].hit()) {
                createAttackSpan(false, cells, row, column);
            } 
        }
    }
};

const createAttackSpan = (isMiss, cells, row, column) => {
    const span = document.createElement("span");
    let cell = findCell(cells, row, column);
    if (isMiss == true) {
        span.classList.add("attack", "attack-missed");
    } else {
        span.classList.add("attack", "attack-succesful");
    }
    cell.appendChild(span);
};

const attackBoard = (e) => {
    let element = e.target.closest(".grid-item");
    if(!element) return;
    const playerCells = [...playerBoard.children];
    const computerCells = [...computerBoard.children];
    let row = parseInt(element.getAttribute("data-coord")[0]);
    let column = parseInt(element.getAttribute("data-coord")[2]);
    console.log(row);
    console.log(column);
    let winner = game.playerTurn(row, column);
    updateBoard(playerCells);
    updateBoard(computerCells);
    if (winner) {
        disableBoards();
        game.gameOver(winner);
    }
}

const computerAttackController = () => {
    computerBoard.addEventListener("click", (e) => {
        if(e.target !== e.currentTarget){
        attackBoard(e)
        }
    });
}

const changeDirection = (direction) => {
    if (currDirection === direction) {
        currDirection = "horizontal";
    } else {
        currDirection = "vertical"
    }
};

const enableBoards = () => {
    playerBoard.style.pointerEvents = "auto";
    computerBoard.style.pointerEvents = "auto";
}

const disableBoards = () => {
    playerBoard.style.pointerEvents = "none";
    computerBoard.style.pointerEvents = "none";
}

const getDirectionController = () => {
    direction.addEventListener("click", (e) => {
        let direction = e.target.value;
        changeDirection(direction);
    });
};

const show = () => {
    renderPlayerBoard();
    renderComputerBoard();
    placeCellsController();
    computerAttackController();
}

getDirectionController();



export { show};

