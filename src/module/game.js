import { computerFactory, playerFactory } from "./player";
import { utils } from "./util";
const Game = (() => {

    let player = playerFactory("leo", 1);
    let computer = computerFactory("computer", 2);
    let ships = utils().getCreatedShips();


    const getPlayer = () => player;
    const getComputerPlayer = () => computer;

    const placePlayerShip = (row, column, ship, direction) => {
        return player.getGameboard().placeShip(row, column, ship, direction);
    };

    for (let i = 0; i < ships.length; i++) {
        computer.placeShipRandomly(ships[i]);
    };


    const playerTurn = (row, column) => {
        let activePlayer = player.sendAttack(row, column, computer);
        if (!activePlayer) return;
        if (computer.getGameboard().shipSunk()) return player;

        computer.sendAttack(player);
        if (player.getGameboard().shipSunk()) return computer;
    };

    const gameOver = (winningPlayer) => {
        console.log(winningPlayer.getPlayerName());
    };

    return {
        gameOver,
        getPlayer,
        getComputerPlayer,
        placePlayerShip,
        playerTurn
    };

});
export { Game };
