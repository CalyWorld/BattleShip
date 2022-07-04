
import { Game } from "./game";
import { utils } from "./util"


const playerBoard = document.getElementById("playerBoard");
const ComputerBoard = document.getElementById("computerBoard");
const direction = document.getElementById("direction");

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
    ComputerBoard.style.setProperty('--grid-rows', gameboard.length);
    ComputerBoard.style.setProperty('--grid-cols', gameboard.length);
    for (let r = 0; r < gameboard.length; r++) {
        for (let c = 0; c < gameboard.length; c++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-item");
            cell.dataset.coord = [r, c];
            ComputerBoard.appendChild(cell);
        }
    }

};


const displayShipOnGameboard = (e, currShip, currCell, nextShip) => {
    if (currShip === undefined) return;
    let element = e.target;
    let row = parseInt(element.getAttribute("data-coord")[0]);
    let column = parseInt(element.getAttribute("data-coord")[2]);
    let result = game.placePlayerShip(row, column, currShip, currDirection);
    if (!result) return;
    for (const cell of currCell) {
        cell.classList.remove("hovered-cell");
        cell.classList.add("ship-cell");
    }
    // for (let i = 0; i < nextShip.getShipLength(); i++) {
    //     currCell[i].classList.add("invalid-placement");
    // }
    return result;
};

const CellsOnHover = (e, currShip, currCell) => {
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
        let nextShip = ships[0] || 1;
        const result = displayShipOnGameboard(e, currShip, currCell, nextShip);
        if (!result) return;
        currShip = ships.shift();
        if (currShip == undefined) {
            enableBoards();
            ComputerBoard.classList.remove("disable-board");
        }
    });
    playerBoard.addEventListener("mouseover", (e) => {
        if (e.target !== e.currentTarget) {
            CellsOnHover(e, currShip, currCell);
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

const changeDirection = (direction) => {
    if (currDirection == direction) {
        currDirection = "horizontal";
    } else {
        currDirection = "vertical"
    }
};

const enableBoards = () => {
    playerBoard.style.pointerEvents = "auto";
    playerBoard.style.pointerEvents = "auto";
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
    getDirectionController();
}


export { show };

