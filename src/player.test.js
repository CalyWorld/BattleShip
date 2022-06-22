import { playerFactory } from "./player";
import { shipFactory } from "./shipFactory";

test("player must have a name and number", () => {
    let player = playerFactory("obi", 1);
    expect(player.getPlayerName()).toBe("obi");
    expect(player.getPlayerNum()).toEqual(1);
});

test("player should be able to place ships on Gameboard", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    expect(player.getGameboard().placeShip(0, 0, ship, "horizontal")).toEqual(true);
});


test("player should be able to send and recieve attack on ships", () => {
    let ship = shipFactory(4);
    let player = playerFactory();
    player.getGameboard().placeShip(0, 0, ship, "horizontal");
    player.sendAttack(0, 0, player);
    expect(ship.hitCounter()).toBe(1);
});