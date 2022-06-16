import { shipFactory } from "./shipFactory";

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
    expect(ship.getShipArray()).toEqual(["hit", "hit", "hit", ""]);
    expect(ship.isSunk(false)).toEqual(false);
});