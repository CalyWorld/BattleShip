import { computerFactory, playerFactory } from "../module/player"
import { shipFactory } from "../module/shipFactory";
import { utils } from "../module/util";

test("Player should be able to play against player 2", ()=>{
    let ship = shipFactory(5);
    let player = playerFactory("leo", 1);
    let player2 = computerFactory("kelvin", 2);

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


test("check for shipSunk", ()=>{

    let util = utils().getCreatedShips();
    let computer = computerFactory("leo", 2);
    let player = playerFactory("rema", 1);
    player.getGameboard().placeShip(0,0,util[0],"horizontal");
    player.getGameboard().placeShip(2,0,util[1],"horizontal");
    player.getGameboard().placeShip(4,5,util[2],"vertical");
    player.getGameboard().placeShip(6,2,util[3],"vertical");
    player.getGameboard().placeShip(4,0,util[4],"horizontal");
    for(let i = 0; i<util.length; i++){
    computer.placeShipRandomly(util[i]);
    }
    computer.sendAttack(player);

    console.table(player.getGameboard().showGameboard());
    console.table(computer.getGameboard().showGameboard());


});



