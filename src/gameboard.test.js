import { gameboardFactory } from './gameboard';
import {shipFactory} from "./shipFactory";

test("check if gameboard is empty", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.showGameboard()[0][0]).toEqual("");
});

test("check if ship is placed at gameboard coordinate horizontally", () => {
    let gameboard = gameboardFactory();
    let ship = shipFactory(4);
    expect(gameboard.placeShip(0, 0, ship, "horizontal")).toEqual(true);
    expect(gameboard.placeShip(0, 5, ship, "horizontal")).toEqual(true);
    expect(gameboard.placeShip(0, 6, ship, "horizontal")).toEqual(true);
    expect(gameboard.placeShip(0, 7, ship, "horizontal")).toEqual(true);
});

test("check if ship is placed at gameboard coordinate vertically", () => {
    let gameboard = gameboardFactory();
    let ship = shipFactory(2);
    expect(gameboard.placeShip(5, 0, ship, "vertical")).toEqual(true);
    expect(gameboard.placeShip(6, 0, ship, "vertical")).toEqual(true);
    expect(gameboard.placeShip(7, 0, ship, "vertical")).toEqual(true);
    expect(gameboard.placeShip(8, 0, ship, "vertical")).toEqual(true);
});

test("check if ship length overlaps gameboard horizontally", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.shipfit(0, 0, "horizontal", 4)).toEqual(true);
    expect(gameboard.shipfit(6, 0, "horizontal", 4)).toEqual(true);
    expect(gameboard.shipfit(-8, 0, "horizontal", 4)).toEqual(false);
    expect(gameboard.shipfit(10, 0, "horizontal", 4)).toEqual(false);
});

test("check if ship length overlaps gameboard vertically", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.shipfit(0, 6, "vertical", 4)).toEqual(true);
    expect(gameboard.shipfit(0, 6, "vertical", 5)).toEqual(false);
    expect(gameboard.shipfit(0, 0, "vertical", 4)).toEqual(true);
});

test("ships can't stack over each other horizontally", () => {
    let gameboard = gameboardFactory();
    let ship = shipFactory(4);
    gameboard.showGameboard()[0][5] = ship;
    expect(gameboard.cellEmpty(5, 0, "horizontal", 4)).toEqual(false);
    expect(gameboard.cellEmpty(4, 0, "horizontal", 4)).toEqual(true);
    expect(gameboard.cellEmpty(6, 0, "horizontal", 4)).toEqual(true);
    expect(gameboard.cellEmpty(0, 0, "horizontal", 4)).toEqual(true);
});

test("ships can't stack over each other vertically", () => {
    let gameboard = gameboardFactory();
    let ship = shipFactory(4);
    gameboard.showGameboard()[5][0] = ship;
    expect(gameboard.cellEmpty(0, 5, "vertical", 4)).toEqual(false);
    expect(gameboard.cellEmpty(0, 4, "vertical", 4)).toEqual(true);
    expect(gameboard.cellEmpty(0, 0, "vertical", 4)).toEqual(true);
    expect(gameboard.cellEmpty(0, 8, "vertical", 4)).toEqual(true);
});


test("gameboard should recieve attack on horizontal coordinate when there is ship", ()=>{
    let gameboard = gameboardFactory();
    let ship = shipFactory(4);
    gameboard.showGameboard()[0][5] = ship;
    gameboard.recieveAttack(5, 0, "horizontal");
    expect(gameboard.showGameboard()[0][5]).toEqual(true);
});

// test("gameboard should recieve attack on vertical coordinate when there is ship", ()=>{
//     let gameboard = gameboardFactory();
//     gameboard.recieveAttack(0, 5, "vertical", 4);
//     expect(gameboard.showGameboard()[0][5]).toEqual("hit");
// });


// test("gameboard checks for miss when the user misses a ship on horizontal coordinate", ()=>{
//     let gameboard = gameboardFactory();
//     gameboard.checkMiss(4, 0, "horizontal");
//     gameboard.recieveAttack(5, 0, "horizontal", 4);
//     expect(gameboard.showGameboard()[4][0]).toEqual("miss")
// })


