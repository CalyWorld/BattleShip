import { shipFactory } from "./shipFactory";
function gameboardFactory() {

    let gameboardArray = Array(10).fill("").map(x => Array(10).fill(""));

    const showGameboard = () => [...gameboardArray];

    let ship = shipFactory(5);
    const shipArray = [];
    shipArray.push(ship);


    const placeShip = (row, column, ship, direction) => {
        let shipFit = shipfit(row, column, direction, ship.getShipLength());
         if (!shipFit) return false;
        let checkSpace = cellEmpty(row, column, direction, ship.getShipLength());
        if (!checkSpace) return false;
        if (direction == "horizontal") {
            for (let i = 0; i < ship.getShipLength(); i++) {
                gameboardArray[row][column + i] = ship;
            }
            return true;
        }
        else if (direction == "vertical") {
            for (let i = 0; i < ship.getShipLength(); i++) {
                gameboardArray[row + i][column] = ship;
            }
            return true;
        }
    }

    const shipfit = (row, column, direction, length) => {
        if (direction == "horizontal") {
            if (column >= 0 && (column + length - 1) < gameboardArray.length) {
                return true;
            } else {
                return false;
            }
        } else if (direction == "vertical") {
            if (row >= 0 && (row + length - 1) < gameboardArray.length) {
                return true;
            } else {
                return false;
            }
        }
    }

    const cellEmpty = (row, column, direction, length) => {
        if (direction == "horizontal") {
            for (let i = 0; i < length; i++) {
                if (gameboardArray[row][column + i] !== "") {
                    return false;
                }
            }
            return true;
        }
        else if (direction == "vertical") {
            for (let i = 0; i < length; i++) {
                if (gameboardArray[row + i][column] !== "") {
                    return false;
                }
            }
            return true;
        }
    }

    const recieveAttack = (row, column) => {
        let checkBoardAttack = checkAttack(row, column);
        if (!checkBoardAttack) return false;
        let checkHitLegal = checkNotHit(row, column);
        if (!checkHitLegal) return false;
        shipAttack(row, column);
    }

    const shipAttack = (row, column) => {
        if (gameboardArray[row][column] == "") {
            gameboardArray[row][column] = "miss";
        } else if (gameboardArray[row][column] !== "") {
            gameboardArray[row][column].hit();
            shipSunk();
        }
    }

    const checkAttack = (row, column) => {
        if (row >= 0 && column >= 0 && row <= gameboardArray.length && column <= gameboardArray.length) {
            return true;
        } else {
            return false;
        }
    }

    const checkNotHit = (row, column) => {
        if (gameboardArray[row][column] !== true && gameboardArray[row][column] !== "miss") {
            return true;
        } else {
            return false;
        }
    }

    const shipSunk = () =>{
        const sunkShip = (eachShip) => eachShip.isSunk();
        return shipArray.every(sunkShip);
    }

    return {
        showGameboard,
        placeShip,
        shipfit,
        cellEmpty,
        checkAttack,
        recieveAttack,
        checkNotHit,
        shipAttack,
        shipSunk,
    }
}

export { gameboardFactory }