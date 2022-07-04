import { computerFactory, playerFactory } from "./player";
import { utils } from "./util";
const Game = (() => {

    let player = playerFactory("leo", 1);
    let computer = computerFactory("computer", 2);


    const getPlayer = () => player;
    const getComputerPlayer = () => computer;

    const placePlayerShip = (row,column,ship,direction)=>{
        player.getGameboard().placeShip(row,column,ship,direction);
    };

    for(let i = 0; i<utils().getCreatedShips().length; i++){
        computer.placeShipRandomly(utils().getCreatedShips()[i]);
    };

    // console.table(computer.getGameboard().showGameboard());

    const gameOver = () => {
        if (player.getGameboard().isSunk == true) {
            console.log(`${computer.getComputerAiName()} is the winner`);
        } else if (computer.getGameboard().isSunk == true) {
            console.log(`${player.getPlayerName()} is the winner`);
        } else if (player.getGameboard().isSunk == false && computer.getGameboard().shipSunk == false) {
            return false;
        }
    };

    return {
        gameOver,
        getPlayer,
        getComputerPlayer,
        placePlayerShip,
    }

});
export { Game };
