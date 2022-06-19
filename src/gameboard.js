import { shipFactory } from "./shipFactory";
function gameboardFactory() {

    let gameboardArray = Array(10).fill("").map(x => Array(10).fill(""));

    const showGameboard = () => [...gameboardArray];

    const placeShip = (row, column, ship, direction) => {
        let shipFit = shipfit(row, column, direction, ship.getShipLength());
        let checkSpace = cellEmpty(row, column, direction, ship.getShipLength());
        if (!shipFit) return false;
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

    // const recieveAttack = (x, y, direction) => {
    //     if (direction == "horizontal") {
    //         if (gameboardArray[y][x] !== "") {
    //             gameboardArray[y][x].hit();
    //             console.table(gameboardArray);
    //         }
    //     }
    // }

    // const checkMiss = (x,y,direction)=>{
    //     let checkBoard = true;
    //     if(direction == "horizontal"){
    //         if(gameboardArray[x][y])
    //     }
    // }
    return {
        showGameboard,
        placeShip,
        shipfit,
        cellEmpty,
        // recieveAttack
    }
}

export { gameboardFactory }