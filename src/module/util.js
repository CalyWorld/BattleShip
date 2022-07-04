import {shipFactory} from "./shipFactory";

const utils = () =>{
    const createdShips = [];
    let BattleShip = shipFactory(4, "BattleShip");
    let Carrier = shipFactory(5, "Carrier");
    let Destroyer = shipFactory(4, "Destroyer");
    let Submarine = shipFactory(4, "Submarine");
    let PatrolBoat = shipFactory(2, "Patrol-Boat");

    createdShips.push(BattleShip,Carrier,Destroyer,Submarine,PatrolBoat);

    const getCreatedShips = () => [...createdShips]

    return{
        getCreatedShips,
    }
    
}

export{utils}