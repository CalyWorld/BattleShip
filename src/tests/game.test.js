import { computerFactory, playerFactory } from "../module/player"
import { shipFactory } from "../module/shipFactory";

test("Player should be able to play against player 2", ()=>{
    let ship = shipFactory(5);
    let player = playerFactory("leo", 1);
    let player2 = playerFactory("kelvin", 2);

    player2.getGameboard().placeShip(0,0,ship, "horizontal");
    player2.getGameboard().placeShip(0,1,ship, "horizontal");
    player2.getGameboard().placeShip(0,2,ship, "horizontal");

    player.sendAttack(0,0, player2);
    player.sendAttack(0,1, player2);
    player.sendAttack(0,2, player2);

    expect(player2.getGameboard().showGameboard()[0][0]).toEqual(ship);
    expect(player2.getGameboard().showGameboard()[0][1]).toEqual(ship);
    expect(player2.getGameboard().showGameboard()[0][2]).toEqual(ship);
    
    expect(player2.getGameboard().showGameboard()[0][0].hitCounter()).toEqual(3);
    
});

test("player should send attack against computerAi", ()=>{
    let ship = shipFactory(4);
    let player = playerFactory("leo", 1);
    let computerAi = computerFactory("computer", 2);

    let x = 9;
    let y = 9;

    while(computerAi.getGameboard().placeShip(x,y,ship,"horizontal")==false){
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x,y,ship, "horizontal");
    player.sendAttack(x,y,computerAi);
    expect(computerAi.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(1);
});

