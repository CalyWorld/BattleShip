import { shipFactory } from "./index"
import { gameboardFactory } from './index';

test("Should return ship length", () => {
    let ship = shipFactory(2);
    expect(ship.getShipLength()).toEqual(2);
});

test("returns the position where the ship was hit", () => {
    let ship = shipFactory(5);
    ship.hit(2);
    expect(ship.getShipArray().at(2)).toBe("hit");
});

test("should use shipLength and check if all positions have been hit", () => {
    let ship = shipFactory(4);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.getShipArray()).toEqual(["hit", "hit", "hit", ""]);  //checks if all positions have been hit
    expect(ship.isSunk(false)).toEqual(false);  // returns false cause shipArray still has index 3 empty
});

test("check if gameboard is empty", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.showGameboard()[0][0]).toEqual("");
});

test("check if ship is placed at gameboard coordinates horizontally", () => {
    let gameboard = gameboardFactory();
    gameboard.placeShip(0, 0, "horizontal", "battleship");
    expect(gameboard.showGameboard()[0][0]).toEqual("battleship");
});

test("check if ship is placed at gameboard coordinates vertically", () => {
    let gameboard = gameboardFactory();
    gameboard.placeShip(0, 0, "vertical", "battleship");
    expect(gameboard.showGameboard()[0][0]).toEqual("battleship");
});

test("check if ship length overlaps gameboard horizontally", ()=>{
    let gameboard = gameboardFactory();
    expect(gameboard.shipfit(0, 0, "horizontal", 4)).toEqual(true);
})
test("check if ship length overlaps gameboard vertically", ()=>{
    let gameboard = gameboardFactory();
    expect(gameboard.shipfit(0, 0, "vertical", 4)).toEqual(true);
})


