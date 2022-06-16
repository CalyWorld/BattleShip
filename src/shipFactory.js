function shipFactory(length, name) {
    
    let shipArray = Array(length).fill("");
    const getShipLength = () => length;
    const getShipArray = () => [...shipArray];
    const getShipName = () => name;
    
    const hit = (x) => {
        if (x >= getShipLength()) {
            return;
        }
        shipArray[x] = "hit";
        getShipLength() - 1;
    }

    const isSunk = (sunk) => {
        if (sunk == true) {
            hit();
            return true;
        } else {
            return false;
        }
    }

    return {
        getShipArray,
        getShipLength,
        hit,
        isSunk,
        getShipName,
    }
}




export {shipFactory};

