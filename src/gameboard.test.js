import { gameboardFactory } from './gameboard';
import { shipFactory } from "./shipFactory";

test("check if gameboard is empty", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.showGameboard()[0][0]).toEqual("");
});

test("check if ship is placed at gameboard coordinate horizontally", () => {
    let gameboard = gameboardFactory();
    let ship = shipFactory(4);
    expect(gameboard.placeShip(0, 0, ship, "horizontal")).toEqual(true);
    expect(gameboard.placeShip(0, 5, ship, "horizontal")).toEqual(true);
    expect(gameboard.placeShip(0, 6, ship, "horizontal")).toEqual(false);
    expect(gameboard.placeShip(0, 7, ship, "horizontal")).toEqual(false);
});

test("check if ship is placed at gameboard coordinate vertically", () => {
    let gameboard = gameboardFactory();
    let ship = shipFactory(2);
    expect(gameboard.placeShip(5, 0, ship, "vertical")).toEqual(true);
    expect(gameboard.placeShip(6, 0, ship, "vertical")).toEqual(false);
    expect(gameboard.placeShip(7, 0, ship, "vertical")).toEqual(true);
    expect(gameboard.placeShip(8, 0, ship, "vertical")).toEqual(false);
});

test("check if ship length overlaps gameboard horizontally", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.shipfit(0, 0, "horizontal", 4)).toEqual(true);
    expect(gameboard.shipfit(0, 6, "horizontal", 4)).toEqual(true);
    expect(gameboard.shipfit(0, 8, "horizontal", 4)).toEqual(false);
    expect(gameboard.shipfit(0, 10, "horizontal", 4)).toEqual(false);
});

test("check if ship length overlaps gameboard vertically", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.shipfit(6, 0, "vertical", 4)).toEqual(true);
    expect(gameboard.shipfit(0, 0, "vertical", 5)).toEqual(true);
    expect(gameboard.shipfit(5, 0, "vertical", 4)).toEqual(true);
    expect(gameboard.shipfit(10, 0, "vertical", 4)).toEqual(false);
});

test("ships can't stack over each other horizontally", () => {
    let gameboard = gameboardFactory();
    let ship = shipFactory(4)
    gameboard.placeShip(0, 5, ship, "horizontal");
    expect(gameboard.cellEmpty(0, 5, "horizontal", 4)).toEqual(false);
    expect(gameboard.cellEmpty(0, 4, "horizontal", 4)).toEqual(false);
    expect(gameboard.cellEmpty(0, 6, "horizontal", 4)).toEqual(false);
    expect(gameboard.cellEmpty(0, 0, "horizontal", 4)).toEqual(true);
});

test("ships can't stack over each other vertically", () => {
    let gameboard = gameboardFactory();
    let ship = shipFactory(4);
    gameboard.placeShip(5, 0, ship, "vertical");
    expect(gameboard.cellEmpty(5, 0, "vertical", 4)).toEqual(false);
    expect(gameboard.cellEmpty(4, 0, "vertical", 4)).toEqual(false);
    expect(gameboard.cellEmpty(0, 0, "vertical", 4)).toEqual(true);
    expect(gameboard.cellEmpty(8, 0, "vertical", 4)).toEqual(false);
});


test("check if attack is legal", () => {
    let gameboard = gameboardFactory();
    gameboard.recieveAttack(0, -1);
    gameboard.recieveAttack(0, 0);
    gameboard.recieveAttack(6, 0);
    gameboard.recieveAttack(0, 4);
    expect(gameboard.checkAttack(0, -1)).toEqual(false);
    expect(gameboard.checkAttack(0, 0)).toEqual(true)
    expect(gameboard.checkAttack(6, 0)).toEqual(true);
    expect(gameboard.checkAttack(0, 4)).toEqual(true);
    expect(gameboard.checkAttack(0, -500)).toEqual(false)
});

test("check if player attacks same place twice", () => {
    let gameboard = gameboardFactory();
    gameboard.recieveAttack(0, 0);
    gameboard.recieveAttack(4, 4);
    gameboard.recieveAttack(0, 7);
    expect(gameboard.checkNotHit(0, 0)).toEqual(false);
    expect(gameboard.checkNotHit(5, 0)).toEqual(true);
    expect(gameboard.checkNotHit(0, 7)).toEqual(false);
    expect(gameboard.checkNotHit(4, 4)).toEqual(false);
});


test("gameboard misses attack", () => {
    let ship = shipFactory(4);
    let gameboard = gameboardFactory()
    gameboard.placeShip(0, 0, ship, "horizontal");
    gameboard.placeShip(0, 1, ship, "horizontal");
    gameboard.placeShip(1, 0, ship, "vertical");
    gameboard.placeShip(2, 0, ship, "vertical");
    gameboard.shipAttack(0, 5)
    gameboard.shipAttack(0, 7);
    gameboard.shipAttack(7, 0);
    expect(gameboard.showGameboard()[0][5]).toBe("miss");
    expect(gameboard.showGameboard()[0][7]).toBe("miss");
    expect(gameboard.showGameboard()[7][0]).toBe("miss");
});

test("gameboard doesn't miss attack", () => {
    let ship = shipFactory(4);
    let gameboard = gameboardFactory();
    gameboard.placeShip(0, 0, ship, "horizontal");
    gameboard.placeShip(0, 1, ship, "horizontal");
    gameboard.placeShip(0, 2, ship, "horizonntal");
    gameboard.placeShip(0, 3, ship, "horizontal");
    gameboard.recieveAttack(0, 0);
    gameboard.recieveAttack(0, 1);
    expect(ship.hitCounter()).toEqual(2);
});

test("ship sinks when not all ship parts have been attack", () => {
    let ship = shipFactory(4);
    let gameboard = gameboardFactory();
    gameboard.placeShip(0, 0, ship, "horizontal");
    gameboard.placeShip(0, 1, ship, "horizontal");
    gameboard.placeShip(0, 2, ship, "horizonntal");
    gameboard.placeShip(0, 3, ship, "horizontal");
    gameboard.recieveAttack(0, 0);
    gameboard.recieveAttack(0, 1);
    gameboard.recieveAttack(0, 2);
    expect(ship.isSunk()).toEqual(false);
})

test("ship sinks when ship parts have been attack", () => {
    let ship = shipFactory(4);
    let gameboard = gameboardFactory();
    gameboard.placeShip(0, 0, ship, "horizontal");
    gameboard.placeShip(0, 1, ship, "horizontal");
    gameboard.placeShip(0, 2, ship, "horizonntal");
    gameboard.placeShip(0, 3, ship, "horizontal");
    gameboard.recieveAttack(0, 0);
    gameboard.recieveAttack(0, 1);
    gameboard.recieveAttack(0, 2);
    gameboard.recieveAttack(0, 3);
    expect(ship.isSunk()).toEqual(true);
})


