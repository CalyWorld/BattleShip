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
    let ship = shipFactory();
    let gameboardArray = [["",""],
    ["",""],
    ["",""],
    ["",""],
    ["",""],
    ["",""],
    ["",""],
    ["",""],
    ["",""],
    ["",""]
];
    const showGameboard = () => [...gameboardArray];
  
    const placeShip = (x,y, direction, battleship) =>{
        let ship = shipFactory(5); //passing ship fac function into ship and assigning length as argument
        for(let i = 0; i<ship.getShipLength(); i++){

        }

    }

    return {
        showGameboard,
        placeShip
    }
}


export { shipFactory }
export { gameboardFactory }
