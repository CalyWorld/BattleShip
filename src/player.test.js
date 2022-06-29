import { playerFactory, computerFactory } from "./player";
import { shipFactory } from "./shipFactory";

test("player must have a name and number", () => {
    let player = playerFactory("obi", 1);
    expect(player.getPlayerName()).toBe("obi");
    expect(player.getPlayerNum()).toEqual(1);
});

test("player should be able to place ships on Gameboard in any direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let a =9, b = 9, x = 9, y = 9;
    while (player.getGameboard().placeShip(x, y, ship, "horizontal") == false && player.getGameboard().placeShip(a, b, ship, "vertical") == false){
        a = 1;
        b = 1;
        x = 0;
        y = 0;
    }
    player.getGameboard().placeShip(x, y, ship, "horizontal");
    player.getGameboard().placeShip(a, b, ship, "vertical");
    expect(player.getGameboard().showGameboard()[x][y]).toEqual(ship);
    expect(player.getGameboard().showGameboard()[a][b]).toEqual(ship);
});


test("player should be able to send attack on ships in any direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let a = 9, b = 9, x = 9, y = 9;
    
    while (player.getGameboard().placeShip(x, y, ship, "horizontal") == false && player.getGameboard().placeShip(x, y, ship, "vertical") == false){
        a = 1;
        b = 5;
        x = 0;
        y = 0;
    }
    player.getGameboard().placeShip(x, y, ship, "horizontal");
    player.getGameboard().placeShip(a, b, ship, "vertical");
    player.sendAttack(x, y, player);
    player.sendAttack(a, b, player);
    expect(player.getGameboard().showGameboard()[x][y]).toEqual(ship);
    expect(player.getGameboard().showGameboard()[a][b]).toEqual(ship);
    expect(ship.hitCounter()).toBe(2);
});

test("player should be able to recieve attack on ships in any direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let a = 9, b = 9, x = 9, y = 9;
    while (player.getGameboard().placeShip(x, y, ship, "horizontal") == false && player.getGameboard().placeShip(x, y, ship, "vertical") == false){
        a = 1;
        b = 5;
        x = 0;
        y = 0;
    }
    player.getGameboard().placeShip(x, y, ship, "horizontal");
    player.getGameboard().placeShip(a, b, ship, "vertical");
    player.attackRecieved(x, y, player);
    player.attackRecieved(a, b, player);
    expect(player.getGameboard().showGameboard()[x][y]).toEqual(ship);
    expect(player.getGameboard().showGameboard()[a][b]).toEqual(ship);
    expect(ship.hitCounter()).toBe(2);
});

test("player should be able to miss attacks in horizontal direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 9;
    let y = 9;
    while (player.getGameboard().placeShip(x, y, ship, "horizontal") == false && player.getGameboard().recieveAttack(x, y) == false) {
        x = 0;
        y = 0;
    }
    player.getGameboard().placeShip(x, y, ship, "horizontal");
    player.sendAttack(0, 5, player);
    expect(player.getGameboard().showGameboard()[0][5]).toEqual("miss");
    expect(ship.hitCounter()).toEqual(0);
});

test("player should be able to miss attacks in vertical direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 9;
    let y = 9;
    while (player.getGameboard().placeShip(x, y, ship, "vertical") == false && player.getGameboard().recieveAttack(x, y) == false) {
        x = 0;
        y = 0;
    }
    player.getGameboard().placeShip(x, y, ship, "vertical");
    player.sendAttack(0, 5, player);
    expect(player.getGameboard().showGameboard()[0][5]).toEqual("miss");
    expect(ship.hitCounter()).toEqual(0);
});

test("player should be able to sink when ship part have been hit", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 9;
    let y = 9;
    while (player.getGameboard().placeShip(x, y, ship, "vertical") == false && player.getGameboard().recieveAttack(x, y) == false) {
        x = 0;
        y = 0;
    }
    player.getGameboard().placeShip(x, y, ship, "vertical");
    player.sendAttack(x, y, player);
    expect(ship.hitCounter()).toEqual(1);
    expect(ship.isSunk()), toEqual(false);
});




test("Computer must have a name and number", () => {
    let computerAi = computerFactory("computer", 1);
    expect(computerAi.getComputerAiName()).toEqual("computer");
    expect(computerAi.getComputerAiNum()).toEqual(1);
});

test("Computer should be able to place ship randomly on gameboard in horizontal direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9;
    let y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "horizontal") == false) {
        x = Math.floor((Math.random() * 10));
        y = Math.floor((Math.random() * 10));
    };
    computerAi.getGameboard().placeShip(x, y, ship, "horizontal");
    expect(computerAi.getGameboard().showGameboard()[x][y]).toEqual(ship);
});

test("computer should be able to place ship randomly on gameboard in vertical direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9;
    let y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "vertical") == false) {
        x = Math.floor((Math.random() * 10));
        y = Math.floor((Math.random() * 10));
    }
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    expect(computerAi.getGameboard().showGameboard()[x][y]).toEqual(ship);
});

test("Computer should be able to send attack in horizontal direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9;
    let y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "horizontal") == false && computerAi.getGameboard().recieveAttack(x, y) == false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x, y, ship, "horizontal");
    computerAi.sendAttack(x, y, computerAi);
    expect(ship.hitCounter()).toEqual(1);
});

test("Computer should be able to send attack in vertical direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9, y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "vertical") == false && computerAi.getGameboard().recieveAttack(x, y) == false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    computerAi.sendAttack(x, y, computerAi);
    expect(ship.hitCounter()).toEqual(1);
});

test("Computer should be able to recieve attack in horizontal direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9, y = 9;

    while (computerAi.getGameboard().placeShip(x, y, ship, "horizontal") == false && computerAi.getGameboard().recieveAttack(x,y) == false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x, y, ship, "horizontal");
    computerAi.attackRecieved(x, y, computerAi);
    expect(ship.hitCounter()).toEqual(1);
});

test("Computer should be able to recieve attack in vertical direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9, y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "vertical") == false  && computerAi.getGameboard().recieveAttack(x,y) == false){
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    computerAi.attackRecieved(x, y, computerAi);
    expect(ship.hitCounter()).toEqual(1);
});

test("Computer should be able to miss attacks in horizontal direction", () => {
    let ship = shipFactory(2);
    let computerAi = computerFactory()
    let x, y;
    do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    } while (computerAi.getGameboard().placeShip(x, y, ship, "horizontal") == false && computerAi.getGameboard().recieveAttack(x,y));
    computerAi.getGameboard().placeShip(x, y, ship, "horizontal");
    computerAi.getGameboard().placeShip(x, y, ship, "horizontal");
    //values are guessed here because i don't know the random numbers that will be generated
    computerAi.sendAttack(0, 0, computerAi);
    computerAi.sendAttack(0, 4, computerAi);
    expect(computerAi.getGameboard().showGameboard()[0][0]).toEqual("miss");
    expect(computerAi.getGameboard().showGameboard()[0][4]).toEqual("miss");
    expect(ship.hitCounter()).toEqual(0);
});

test("Computer should be able to sink when ship part have been hit", () => {
    let ship = shipFactory(4);
    let computerAi = computerFactory();
    let x = 9;
    let y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "vertical") == false && computerAi.getGameboard().recieveAttack(x, y) == false) {
        x = 0;
        y = 0;
    }
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    computerAi.sendAttack(x, y, computerAi);
    expect(ship.hitCounter()).toEqual(1);
    expect(ship.isSunk()), toEqual(false);
});


