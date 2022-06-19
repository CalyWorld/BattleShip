import { shipFactory } from "./shipFactory";
function gameboardFactory() {
    
    let gameboardArray = Array(10).fill("").map(x => Array(10).fill(""));

    const showGameboard = () => [...gameboardArray];

    const placeShip = (row, column, ship, direction) => {
        let shipFit = shipfit(row, column, direction, ship.length);
        let checkSpace = cellEmpty(row, column, direction, ship.length);
        // if (!shipFit) return false;
        // if (!checkSpace) return false;
        if (direction == "horizontal") {
            for (let i = 0; i < ship.length; i++) {
                gameboardArray[column][row + i] = ship;
                console.table(gameboardArray);
            }
            return true;
        }
        else if (direction == "vertical") {
            for (let i = 0; i < ship.length; i++) {
                gameboardArray[column + i][row] = ship;
            }
            return true;
        }
    }
    const shipfit = (row, column, direction, length) => {
        if (direction == "horizontal") {
            if (row >= 0 && (row + length - 1) < gameboardArray.length) {
                return true;
            } else {
                return false;
            }
        } else if (direction == "vertical") {
            if (column >= 0 && (column + length - 1) < gameboardArray.length) {
                return true;
            } else {
                return false;
            }
        }
    }

    const cellEmpty = (row, column, direction, length) => {
        if (direction = "horizontal") {
            for (let i = 0; i < length; i++) {
                if (gameboardArray[column][row + i] !== "") {
                    return false;
                } else {
                    return true;
                }
            }
        }
        else if (direction = "vertical") {
            for (let i = 0; i < length; i++) {
                if (gameboardArray[column + i][row] !== "") {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    const recieveAttack = (x, y, direction) => {
        if (direction == "horizontal") {
            if (gameboardArray[y][x] !== "") {
                gameboardArray[y][x].hit();
                console.table(gameboardArray);
            }
        }
    }

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
        recieveAttack
    }
}

export { gameboardFactory }