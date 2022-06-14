function shipFactory(length) {
    let shipArray = Array(length).fill("");
    let name = "battleship"
    const getShipLength = () => length;
    const getShipArray = () => shipArray;
    const getShipName = () => name;
    const hit = (num) => {
        if (num >= getShipLength()) {
            return;
        }
        shipArray[num] = "hit";
    }

    const isSunk = (sunk) => {
        if (sunk == true) {
            hit();
            return true;
        } else {
            return false;
        }
    }

    return {
        getShipArray,
        getShipLength,
        hit,
        isSunk,
        getShipName,
    }
}

function gameboardFactory() {
    let gameboardArray = [
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""]
    ];
    const showGameboard = () => [...gameboardArray];
    let ship = shipFactory(5);

    const placeShip = (x, y, direction, battleship) => {
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
    }

    const shipfit = (x, y, direction, length) => {
        if (direction == "horizontal") {
            if (x >= 0 && (x + length - 1) <=gameboardArray.length) {
                return true;
            }else if (x >= 0 && (x + length - 1) >= gameboardArray.length) {
                return false;
            }
        } else if (direction == "vertical") {
            if (y >= 0 && (y + length - 1) <= gameboardArray.length) {
                return true;
            }else if (x >= 0 && (y + length -1) >= gameboardArray.length){
                return false;
            }
        }
    }
    return {
        showGameboard,
        placeShip,
        shipfit,

    }
}



export { shipFactory, gameboardFactory };

