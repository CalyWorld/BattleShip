import { computerFactory, playerFactory } from "./player"
import { shipFactory } from "./shipFactory";

test("Player should be able to play against each other", ()=>{
    let ship = shipFactory(5);
    let player = playerFactory("leo", 1);
    let player2 = playerFactory("kelvin", 2);

    player2.getGameboard().placeShip(0,0,ship, "horizontal");
    player.sendAttack(0,1, player2);
    player.sendAttack(0,2, player2);
    player.sendAttack(0,3, player2);

    expect(player2.getGameboard().showGameboard()[0][0]).toEqual(ship);
    expect(ship.hitCounter()).toEqual(3);
    
});

test("computer should be send attack against computerAi", ()=>{
    let ship = shipFactory(4);
    let player = playerFactory("leo", 1);
    let computerAi = computerFactory("computer", 2);

    let x = 9;
    let y = 9;

    while(computerAi.getGameboard().placeShip(x,y,ship,"horizontal")==false && computerAi.getGameboard().recieveAttack(x,y)==false){
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }

    computerAi.getGameboard().placeShip(x,y,ship, "horizontal");
    computerAi.sendAttack(x,y,player);
    expect(ship.hitCounter()).toEqual(1);
    console.table(computerAi.getGameboard().showGameboard());
})