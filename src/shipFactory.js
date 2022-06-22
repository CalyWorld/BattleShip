const shipFactory = ((length) => {

    let shipArray = Array(length).fill("");
    const getShipLength = () => length;
    const getShipArray = () => [...shipArray];

    const hit = () => {
        shipArray.pop();
        return shipArray;
    };

    const isSunk = () => {
        if (shipArray.length == 0) {
            return true;
        } else {
            return false
        }
    };

    return {
        getShipArray,
        getShipLength,
        hit,
        isSunk,
    }
});




export { shipFactory };

