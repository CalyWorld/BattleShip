import { Game } from "./game";

const renderPlayerBoard = () => {
    const playerBoard = document.querySelector(".playerBoard");
    let gameboard = Game().getPlayer().getGameboard().showGameboard();
    playerBoard.style.setProperty('--grid-rows', gameboard.length);
    playerBoard.style.setProperty('--grid-cols', gameboard.length);
    for (let c = 0; c < (gameboard.length * gameboard.length); c++) {
        let cell = document.createElement("div");
        playerBoard.appendChild(cell).className = "grid-item";
    }
};

const renderComputerBoard = () => {
    const computerBoard = document.querySelector(".computerBoard");
    let gameboard = Game().getPlayer().getGameboard().showGameboard();
    computerBoard.style.setProperty('--grid-rows', gameboard.length);
    computerBoard.style.setProperty('--grid-cols', gameboard.length);
    for (let c = 0; c < (gameboard.length* gameboard.length); c++) {
        let cell = document.createElement("div");
        computerBoard.appendChild(cell).className = "grid-item";
    }
};

export { renderPlayerBoard, renderComputerBoard }

