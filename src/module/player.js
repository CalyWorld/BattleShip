import { gameboardFactory } from "./gameboard";
const playerFactory = ((name, number) => {
    const getPlayerName = () => name;
    const getPlayerNum = () => number;

    let gameboard = gameboardFactory();

    const getGameboard = () => {
        return gameboard;
    }

    const attackRecieved = (row, column) => {
        if (gameboard.recieveAttack(row, column)) {
            return true;
        } else {
            return false;
        }
    }

    const sendAttack = (row, column, player) => {
        player.attackRecieved(row, column);
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
    const getComputerAiName = () => name;
    const getComputerAiNum = () => number;

    const attackRecieved = (row, column) => {
        if (gameboard.recieveAttack(row, column)) {
            return true;
        } else {
            return false;
        }
    }

    const sendAttack = (row, column, computer) => {
        computer.attackRecieved(row, column);
    }

    return {
        getGameboard,
        getComputerAiName,
        getComputerAiNum,
        attackRecieved,
        sendAttack
    }
}




// let player1 = playerFactory("obinna", 1);
// let player2 = playerFactory("ijeoma", 2);
// let ship = shipFactory(4)
// player2.getGameboard().placeShip(0,5,ship,"horizontal");
// player1.sendAttack(0,5,player2);
// player2.getGameboard().showGameboard()[0][5].hitCounter()
// console.table(player2.getGameboard().showGameboard());

export { playerFactory, computerFactory }