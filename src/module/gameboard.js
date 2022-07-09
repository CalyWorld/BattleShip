import { utils } from "./util";

const gameboardFactory = () => {

    let gameboardArray = new Array(10).fill("").map(() => Array(10).fill(""));
    let ships = utils().getCreatedShips();

    const showGameboard = () => [...gameboardArray];

    const placeShip = (row, column, ship, direction) => {
        let shipFit = shipfit(row, column, direction, ship.getShipLength());
        if (!shipFit) return false;
        let checkSpace = cellEmpty(row, column, direction, ship.getShipLength());
        if (!checkSpace) return false;
        let shipSurround = shipSurrounding(row, column, ship.getShipLength(), direction);
        if (!shipSurround) return false;

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
            if (column >= 0 && ((column + (length - 1)) < gameboardArray.length)) {
                return true;
            } else {
                return false;
            }
        } else if (direction == "vertical") {
            if (row >= 0 && ((row + (length - 1)) < gameboardArray.length)) {
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

    const shipSurrounding = (row, column, length, direction) => {
        if (direction == "horizontal") {
            for (let c = column - 1; c <= column + length; c++) {
                if (c < 0 || c > 9) continue;
                for (let r = row - 1; r <= row + 1; r++) {
                    if (r < 0 || r > 9) continue;
                    if (cellEmpty(r, c, direction, length)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else if (direction == "vertical") {
            for (let c = column - 1; c <= column + 1; c++) {
                if (c < 0 || c > 9) continue;
                for (let r = row - 1; r <= row + length; r++) {
                    if (r < 0 || r > 9) continue;
                    if (cellEmpty(r, c, direction, length)) {
                        return true;
                    } else {
                        return false
                    }
                }
            }
        }
    }

    const recieveAttack = (row, column) => {
        let checkBoardAttack = checkAttack(row, column);
        if (!checkBoardAttack) return false;
        let checkHitLegal = checkNotHit(row, column);
        if (!checkHitLegal) return false;
        shipAttack(row, column, gameboardArray);
    }

    const shipAttack = (row, column, gameboardArray) => {
        gameboardArray[row][column] == true || "";
        if (gameboardArray[row][column] == "") {
            gameboardArray[row][column] = "miss";

        } else {
            gameboardArray[row][column].hit();
            shipSunk();
        }
    }

    const shipSunk = () => {
        const shipSunkStatus = (eachShip) => eachShip.isSunk();
        return ships.every(shipSunkStatus);
    }

    const checkAttack = (row, column) => {
        if ((row >= 0 && column >= 0) && (row <= gameboardArray.length) && (column <= gameboardArray.length)) {
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
        shipSurrounding,
    }
}

export { gameboardFactory }