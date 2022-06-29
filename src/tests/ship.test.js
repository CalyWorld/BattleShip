import { shipFactory } from "../module/shipFactory";

test("Should return ship length", () => {
    let ship = shipFactory(2);
    expect(ship.getShipLength()).toEqual(2);
});

test("returns the position where the ship was hit", () => {
    let ship = shipFactory(2);
    ship.hit();
    ship.hit();
    expect(ship.getShipArray()).toEqual([]);
});

test("should use shipLength and check if all positions have been hit", () => {
    let ship = shipFactory(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toEqual(true);
});