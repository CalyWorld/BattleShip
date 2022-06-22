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
        return player.attackRecieved(row, column);
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

    const getName = ()=> name;
    const getNum = ()=> number;


    return{
        getName,
        getNum
    }
}

export { playerFactory, computerFactory }