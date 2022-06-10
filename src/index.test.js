import {shipFactory} from "./index"
import {gameboardFactory} from './index';

test("Should return ship length",()=>{
    let ship = shipFactory(2);
    expect(ship.getShipLength()).toEqual(2);
});

test("returns the position where the ship was hit", ()=>{
    let ship = shipFactory(5);
    ship.hit(2);
    expect(ship.getShipArray().at(2)).toBe("hit");
});

test("should use shipLength and check if all positions have been hit", ()=>{
    let ship = shipFactory(4);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.getShipArray()).toEqual(["hit", "hit", "hit", ""]);  //checks if all positions have been hit
    expect(ship.isSunk(false)).toEqual(false);  // returns false cause shipArray still has index 3 empty
});

test("return the position where ship was placed in Gameboard", ()=>{
    let gameboard = gameboardFactory(5);
    let ship = shipFactory();
    gameboard.placeShipOnGameboard(2);
    expect(gameboard.getGameboardArray().at(2)).toEqual(["","", ship.getShipArray(), "", ""]);
})

