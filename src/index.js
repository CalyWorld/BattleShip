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
    let gameboardArray = [["", ""],
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

    const placeShip = (x, y, direction, battleship) => {
        let ship = shipFactory(4);
        if (direction == "horizontal") {
            for (let i = 0; i < ship.getShipLength(); i++) {
                gameboardArray[x + i][y] = battleship;
            }
            return gameboardArray;
        } else if (direction == "vertical") {
            for (let i = 0; i < ship.getShipLength(); i++) {
                gameboardArray[x][y + i] = battleship;
            }
            return gameboardArray;
        }
    }
    return {
        showGameboard,
        placeShip,
    }
}


export { shipFactory, gameboardFactory }

