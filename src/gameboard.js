import { shipFactory } from "./shipFactory";
function gameboardFactory() {
    let ship = shipFactory(4, "battleship");
    let gameboardArray = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]];

    const showGameboard = () => [...gameboardArray];

    const placeShip = (x, y, direction, battleship) => {
        if (shipfit(x, y, direction, ship.getShipLength())) {
            if (direction == "horizontal") {
                for (let i = 0; i < ship.getShipLength(); i++) {
                    gameboardArray[x + i][y] = battleship;

                }
                return gameboardArray;
            }
            else if (direction == "vertical") {
                for (let i = 0; i < ship.getShipLength(); i++) {
                    gameboardArray[x][y + i] = battleship;
                }

                return gameboardArray;
            }

        } else {
            return false;
        }
    }

    const shipfit = (x, y, direction, length) => {
        if (direction == "horizontal") {
            if (x >= 0 && (x + length - 1) <= gameboardArray.length) {
                return true;
            } else {
                return false;
            }
        } else if (direction == "vertical") {
            if (y >= 0 && (y + length - 1) <= gameboardArray.length) {
                return true;
            } else {
                return false;
            }
        }
    }

    const openBoard = (x, y, direction, length) => {
        let checkEmptyCell = true;
        if (direction = "horizontal") {
            for (let i = 0; i < length; i++) {
                if (gameboardArray[x + i][y] == "") {
                    return checkEmptyCell;
                } else {
                    return checkEmptyCell = false;
                }
            }
        } else if (direction = "vertical") {
            for (let i = 0; i < length; i++) {
                if (gameboardArray[x][y+i] == "") {
                    return checkEmptyCell;
                } else {
                    return checkEmptyCell = false;
                }
            }
        }
    }

    // const recieveAttack = (x, y, direction) => {
    //     if (direction == "horizontal") {
    //         gameboardArray[x][y].
    //             console.table(gameboardArray)
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
        openBoard
    }
}

export { gameboardFactory }