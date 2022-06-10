function shipFactory(length) {
    let shipArray = Array(length).fill("");
    const getShipLength = ()=> length;
    const getShipArray = ()=> shipArray;
    const hit = (num)=>{ 
        if(num >= getShipLength()){
            return;
        }
        shipArray[num] = "hit";
     }

    const isSunk = (sunk)=>{
        if(sunk == true){
            hit();
            return true;
        }else{
            return false;
        }
    }

    return {
        getShipArray,
        getShipLength,
        hit,
        isSunk,
    }
}

function gameboardFactory(length){
    let gameboardArray = Array(length).fill("");
    const getGameboardLength = ()=> length;
    const getGameboardArray = ()=> gameboardArray;
    
    const placeShipOnGameboard =(num)=>{
        let ship1 = shipFactory();
        if(getGameboardLength >= num){
            return;
        }else{
            getGameboardArray[num] = ship1.getShipArray;
        }
    }

    return{
        getGameboardArray,
        getGameboardLength,
        placeShipOnGameboard,
    }
}


export{shipFactory}
export {gameboardFactory}
