import { gameboardFactory } from "./gameboard";
import { computerFactory, playerFactory } from "./player";

const Game = (()=>{

    let ship = shipFactory(5);
    let player = playerFactory("leo", 1);
    let computer = computerFactory("computer", 2);

    let activePlayer = player;
    let opponentPlayer = computer.getGameboard();

    const shipPlacements = () =>{
        activePlayer.getGameboard().placeShip(0,0,ship,"horizontal");
        activePlayer.getGameboard().placeShip(0,0,ship,"horizontal");
        activePlayer.getGameboard().placeShip(0,0,ship,"horizontal");

        opponentPlayer.getGameboard().placeShip(x,y,ship,"horizontal"),
        opponentPlayer.getGameboard().placeShip(x,y,ship,"horizontal");
        opponentPlayer.getGameboard().placeShip(x,y,ship,"horizontal");
    }

    const attackShip = () =>{
        activePlayer.sendAttack(x,y,ship);
    }

    const gameOver = () =>{
        if(activePlayer.getGameboard().shipSunk == true){
            console.log(`${computer.getComputerAiName()} is the winner`);
        }else if(opponentPlayer.getGameboard().shipSunk == true){
            console.log(`${player.getPlayerName()} is the winner`);
        }else if(activePlayer.getGameboard().shipSunk == false && opponentPlayer.getGameboard().shipSunk == false){
            return false;
        }
    };

    return{
        shipPlacements,
        gameOver
    }

});

export {Game};