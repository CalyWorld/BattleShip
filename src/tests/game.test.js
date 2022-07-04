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
    expect(player2.getGameboard().showGameboard()[0][0].isSunk()).toEqual(false);
    
});


