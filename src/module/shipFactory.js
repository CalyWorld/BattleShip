const shipFactory = ((length, name) => {

    let shipArray = Array(length).fill("");
    const getShipLength = () => length;
    const getShipName = ()=> name;
    const getShipArray = () => [...shipArray];

    const hit = () => {
        shipArray.pop();
        return shipArray;
    };

    const hitCounter = () => {
        return length - shipArray.length;
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
        getShipName,
        hit,
        hitCounter,
        isSunk,
    }
});




export { shipFactory }

