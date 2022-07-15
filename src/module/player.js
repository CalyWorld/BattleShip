import { gameboardFactory } from "./gameboard";
const playerFactory = ((name, number) => {
    const getPlayerName = () => name;
    const getPlayerNum = () => number;

    let gameboard = gameboardFactory();

    const getGameboard = () => {
        return gameboard;
    };

    const attackRecieved = (row, column) => {
        if (gameboard.recieveAttack(row, column)) {
            return true;
        } else {
            return false;
        }
    }

    const sendAttack = (row, column, playerToAttack) => {
        playerToAttack.attackRecieved(row, column);
    }

    return {
        getGameboard,
        getPlayerName,
        getPlayerNum,
        attackRecieved,
        sendAttack,
    }
});

const computerFactory = (name, number) => {

    let gameboard = gameboardFactory();

    const getGameboard = () => {
        return gameboard
    };
    const getPlayerName = () => name;
    const getPlayerNum = () => number;

    const placeShipRandomly = (ship) => {
        let row = 9;
        let column = 9;
        let orientation = ["horizontal", "vertical"];
        let direction = Math.floor(Math.random() * orientation.length);
        while (gameboard.placeShip(row, column, ship, orientation[direction]) == false) {
            row = Math.floor(Math.random() * 10);
            column = Math.floor(Math.random() * 10);
        }
        return gameboard.placeShip(row, column, ship, orientation[direction]);
    }

    const attackRecieved = (row, column) => {
        if (gameboard.recieveAttack(row, column)) {
            return true;
        } else {
            return false;
        }
    }

    const sendAttack = (playerToAttack) => {

        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        return playerToAttack.attackRecieved(row, column);
    }


    return {
        getGameboard,
        getPlayerName,
        getPlayerNum,
        attackRecieved,
        sendAttack,
        placeShipRandomly,
    }
}

export { playerFactory, computerFactory }