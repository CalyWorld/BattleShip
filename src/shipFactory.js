const shipFactory = ((length)=> {

    const shipArray = Array(length).fill("");
    const getShipLength = () => length;
    const getShipArray = () => [...shipArray];

    const hit = ((hitPosition) => {
        for (let i = 0; i <length; i++){
            if (i == hitPosition) {
                shipArray[i] = true;
            }
        }
    });

    const isSunk = ((sunk) => {
            for(let i = 0; i<length; i++){
                if(shipArray[i] == false){
                    sunk = false;
                }
            return sunk;
    }
});

    return {
        getShipArray,
        getShipLength,
        hit,
        isSunk,
    }
});




export { shipFactory };

