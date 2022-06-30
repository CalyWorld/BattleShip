import { computerFactory, playerFactory } from "./player";

export const Game = (() => {

    let player = playerFactory("leo", 1);
    let computer = computerFactory("computer", 2);
    const getPlayer = () => player;
    const getComputerPlayer = () => computer

    let activePlayer = getPlayer();
    let opponentPlayer = getComputerPlayer();

    const shipPlacements = () => {
        activePlayer.getGameboard().placeShip(0, 0, ship, "horizontal");
        activePlayer.getGameboard().placeShip(0, 1, ship, "horizontal");
        activePlayer.getGameboard().placeShip(0, 2, ship, "horizontal");

        opponentPlayer.getGameboard().placeShip(x, y, ship, "horizontal"),
        opponentPlayer.getGameboard().placeShip(x, y, ship, "horizontal");
        opponentPlayer.getGameboard().placeShip(x, y, ship, "horizontal");
    }

    const attackShip = () => {
        activePlayer.sendAttack(x, y, opponentPlayer);
        gameOver();
        activePlayer.sendAttack(x, y, opponentPlayer);
        gameOver();
        activePlayer.sendAttack(x, y, opponentPlayer);
        gameOver();
    }


    const gameOver = () => {
        if (activePlayer.getGameboard().shipSunk == true) {
            console.log(`${computer.getComputerAiName()} is the winner`);
        } else if (opponentPlayer.getGameboard().shipSunk == true) {
            console.log(`${player.getPlayerName()} is the winner`);
        } else if (activePlayer.getGameboard().shipSunk == false && opponentPlayer.getGameboard().shipSunk == false) {
            return false;
        }
    };

    return {
        shipPlacements,
        gameOver,
        attackShip,
        getPlayer,
        getComputerPlayer,
    }

});

