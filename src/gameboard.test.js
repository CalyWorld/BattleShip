import { gameboardFactory } from './gameboard';
test("check if gameboard is empty", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.showGameboard()[0][0]).toEqual("");
});

test("check if ship is placed at gameboard coordinate horizontally", () => {
    let gameboard = gameboardFactory();
    
    gameboard.placeShip(0, 0, "horizontal", "battleship");
    expect(gameboard.showGameboard()[0][0]).toEqual("battleship");
});

test("check if ship is placed at gameboard coordinate vertically", () => {
    let gameboard = gameboardFactory();
    gameboard.placeShip(0, 0, "vertical", "battleship");
    expect(gameboard.showGameboard()[0][0]).toEqual("battleship");
});

test("check if ship length overlaps gameboard horizontally", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.shipfit(0, 0, "horizontal", 4)).toEqual(true);
});

test("check if ship length overlaps gameboard vertically", () => {
    let gameboard = gameboardFactory();
    expect(gameboard.shipfit(0, 0, "vertical", 4)).toEqual(true);
});

test("ships can't stack over each other horizontally", ()=>{
    let gameboard = gameboardFactory();
    gameboard.placeShip(5, 0, "horizontal", 4);
    expect(gameboard.openBoard(5, 0, "horizontal", 4)).toEqual(false);
});

test("ships can't stack over each other vertically", ()=>{
    let gameboard = gameboardFactory();
    gameboard.placeShip(0, 5, "vertical", 4);
    expect(gameboard.openBoard(0, 5, "horizontal", 4)).toEqual(false);
});
// test("gameboard should recieve attack on horizontal coordinate when there is ship", ()=>{
//     let gameboard = gameboardFactory();
//     gameboard.recieveAttack(5, 0, "horizontal", 4);
//     expect(gameboard.showGameboard()[5][0]).toEqual("hit");
// });

// test("gameboard checks for miss when the user misses a ship on horizontal coordinate", ()=>{
//     let gameboard = gameboardFactory();
//     gameboard.checkMiss(4, 0, "horizontal");
//     gameboard.recieveAttack(5, 0, "horizontal", 4);
//     expect(gameboard.showGameboard()[4][0]).toEqual("miss")
// })


