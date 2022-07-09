import { playerFactory, computerFactory } from "../module/player";
import { shipFactory } from "../module/shipFactory";
import { utils } from "../module/util";

test("player must have a name and number", () => {
    let player = playerFactory("obi", 1);
    expect(player.getPlayerName()).toBe("obi");
    expect(player.getPlayerNum()).toEqual(1);
});

test("player should be able to place ships on Gameboard in horizontal direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 0, y = 0;
    player.getGameboard().placeShip(x, y, ship, "horizontal");
    expect(player.getGameboard().showGameboard()[x][y]).toEqual(ship);
});

test("player should be able to place ships on Gameboard in vertical direction", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    let x = 0, y = 0;
    player.getGameboard().placeShip(x, y, ship, "vertical");
    expect(player.getGameboard().showGameboard()[x][y]).toEqual(ship);
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
    expect(player.getGameboard().showGameboard()[x][y].isSunk()).toEqual(false);
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
    expect(computerAi.getPlayerName()).toEqual("computer");
    expect(computerAi.getPlayerNum()).toEqual(1);
});

test("computer should be able to placeShips randomly in an direction", () => {
    let computerAi = computerFactory();
    let computerShips = utils().getCreatedShips();
    let computerGameboard = computerAi.getGameboard().showGameboard();
    let shipCellCount = 0;

    for(let i = 0; i<computerShips.length; i++){
        computerAi.placeShipRandomly(computerShips[i]);
    };
    
    let currshipCellCount = computerShips.reduce((prev,next)=>{
        return prev + next.getShipLength();
    },0);

    for(let x = 0; x<computerGameboard.length; x++){
        for(let y = 0; y<computerGameboard.length; y++){
            if(computerGameboard[x][y] != ""){
                shipCellCount++;
            }
        }
    }
    expect(shipCellCount).toEqual(currshipCellCount);
});




