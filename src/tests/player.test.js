import { playerFactory, computerFactory } from "../module/player";
import { shipFactory } from "../module/shipFactory";

test("player must have a name and number", () => {
    let player = playerFactory("obi", 1);
    expect(player.getPlayerName()).toBe("obi");
    expect(player.getPlayerNum()).toEqual(1);
});

test("player should be able to place ships on Gameboard in any direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let a = 9, b = 9, x = 9, y = 9;
    while (player.getGameboard().placeShip(x, y, ship, "horizontal") == false && player.getGameboard().placeShip(a, b, ship, "vertical") == false) {
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


test("player should be able to send attack on ships in any horizontal direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 0, y = 0;
    player.getGameboard().placeShip(x, y, ship, "horizontal");
    player.sendAttack(x, y, player);
    expect(player.getGameboard().showGameboard()[x][y]).toEqual(ship);
    expect(player.getGameboard().showGameboard()[x][y].hitCounter()).toBe(1);
});

test("player should be able to send attack on ships in any vertical direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 0, y = 0;
    player.getGameboard().placeShip(x, y, ship, "vertical");
    player.sendAttack(x, y, player);
    expect(player.getGameboard().showGameboard()[x][y]).toEqual(ship);
    expect(player.getGameboard().showGameboard()[x][y].hitCounter()).toBe(1);
});

test("player should be able to recieve attack on ships in horizontal direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 0, y = 0;
    player.getGameboard().placeShip(x, y, ship, "horizontal");
    player.attackRecieved(x, y, player);
    expect(player.getGameboard().showGameboard()[x][y]).toEqual(ship);
    expect(player.getGameboard().showGameboard()[x][y].hitCounter()).toBe(1);
});

test("player should be able to recieve attack on ships in vertical direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 0, y = 0;
    player.getGameboard().placeShip(x, y, ship, "vertical");
    player.attackRecieved(x, y, player);
    expect(player.getGameboard().showGameboard()[x][y]).toEqual(ship);
    expect(player.getGameboard().showGameboard()[x][y].hitCounter()).toBe(1);
});

test("player should be able to miss attacks in horizontal direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 0;
    let y = 0;
    player.getGameboard().placeShip(x, y, ship, "horizontal");
    player.sendAttack(0, 5, player);
    expect(player.getGameboard().showGameboard()[0][5]).toEqual("miss");
    expect(player.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(0);
});

test("player should be able to miss attacks in vertical direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 0;
    let y = 0;
    player.getGameboard().placeShip(x, y, ship, "vertical");
    player.sendAttack(0, 5, player);
    expect(player.getGameboard().showGameboard()[0][5]).toEqual("miss");
    expect(player.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(0);
});

test("player should be able to sink when ship part have been hit", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 0;
    let y = 0;
    player.getGameboard().placeShip(x, y, ship, "vertical")
    player.getGameboard().recieveAttack(x, y);
    player.sendAttack(x, y, player);
    expect(player.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(2);
    expect(ship.isSunk()).toEqual(false);
});

test("player should be able to send attack and shink all ship parts", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    player.getGameboard().placeShip(0, 0, ship, "vertical")
    player.getGameboard().placeShip(1, 0, ship, "vertical")
    player.getGameboard().placeShip(2, 0, ship, "vertical")
    player.getGameboard().placeShip(3, 0, ship, "vertical")
    player.sendAttack(0, 0, player);
    player.sendAttack(1, 0, player);
    player.sendAttack(2, 0, player);
    player.sendAttack(3, 0, player);
    expect(player.getGameboard().showGameboard()[0][0].hitCounter()).toEqual(4);
    expect(player.getGameboard().showGameboard()[0][0].isSunk()).toEqual(true);
    expect(player.getGameboard().showGameboard()[1][0].isSunk()).toEqual(true); 
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
    console.log(x);
    console.log(y);
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    expect(computerAi.getGameboard().showGameboard()[x][y]).toEqual(ship);
});

test("Computer should be able to send attack in horizontal direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9;
    let y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "horizontal") == false) {
        x = Math.floor((Math.random() * 10));
        y = Math.floor((Math.random() * 10));
    }

    computerAi.getGameboard().placeShip(x, y, ship, "horizontal");
    console.table(computerAi.getGameboard().showGameboard());
    computerAi.sendAttack(x, y, computerAi);
    expect(computerAi.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(1);
});

test("Computer should be able to send attack in vertical direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9, y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "vertical") == false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    computerAi.sendAttack(x, y, computerAi);
    expect(computerAi.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(1);
});

test("Computer should be able to recieve attack in horizontal direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9, y = 9;

    while (computerAi.getGameboard().placeShip(x, y, ship, "horizontal") == false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x, y, ship, "horizontal");
    computerAi.attackRecieved(x, y, computerAi);
    expect(computerAi.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(1);
});

test("Computer should be able to recieve attack in vertical direction", () => {
    let computerAi = computerFactory();
    let ship = shipFactory(4);
    let x = 9, y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "vertical") == false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    computerAi.attackRecieved(x, y, computerAi);
    expect(computerAi.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(1);
});

test("Computer should be able to miss attacks in horizontal direction", () => {
    let ship = shipFactory(2);
    let computerAi = computerFactory()
    let x = 9, y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "horizontal") == false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x, y, ship, "horizontal");
    computerAi.getGameboard().placeShip(x, y, ship, "horizontal");
    //values are guessed here because i don't know the random numbers that will be generated
    computerAi.sendAttack(0, 0, computerAi);
    computerAi.sendAttack(0, 4, computerAi);
    expect(computerAi.getGameboard().showGameboard()[0][0]).toEqual("miss");
    expect(computerAi.getGameboard().showGameboard()[0][4]).toEqual("miss");
    expect(computerAi.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(0);
});

test("Computer should be able to miss attacks in vertical direction", () => {
    let ship = shipFactory(2);
    let computerAi = computerFactory()
    let x = 9, y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "vertical") == false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    //values are guessed here because i don't know the random numbers that will be generated
    computerAi.sendAttack(0, 0, computerAi);
    computerAi.sendAttack(0, 4, computerAi);
    expect(computerAi.getGameboard().showGameboard()[0][0]).toEqual("miss");
    expect(computerAi.getGameboard().showGameboard()[0][4]).toEqual("miss");
    expect(computerAi.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(0);
});

test("Computer should be able to sink when ship part have been hit", () => {
    let ship = shipFactory(4);
    let computerAi = computerFactory();
    let x = 9;
    let y = 9;
    while (computerAi.getGameboard().placeShip(x, y, ship, "vertical") == false){
        x = 0;
        y = 0;
    }
    computerAi.getGameboard().placeShip(x, y, ship, "vertical");
    computerAi.sendAttack(x, y, computerAi);
    expect(computerAi.getGameboard().showGameboard()[x][y].hitCounter()).toEqual(1);
    expect(computerAi.getGameboard().showGameboard()[x][y].isSunk()).toEqual(false);
});


