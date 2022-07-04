/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/dom */ \"./src/module/dom.js\");\n\n\n\n(0,_module_dom__WEBPACK_IMPORTED_MODULE_0__.show)();\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/module/dom.js":
/*!***************************!*\
  !*** ./src/module/dom.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"show\": () => (/* binding */ show)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/module/game.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/module/util.js\");\n\n\n\n\n\nconst playerBoard = document.getElementById(\"playerBoard\");\nconst ComputerBoard = document.getElementById(\"computerBoard\");\nconst direction = document.getElementById(\"direction\");\n\nlet currDirection = \"horizontal\";\nlet currCell = [];\nlet game = (0,_game__WEBPACK_IMPORTED_MODULE_0__.Game)();\nlet ships = (0,_util__WEBPACK_IMPORTED_MODULE_1__.utils)().getCreatedShips();\nlet currShip = ships.shift();\n\n\nconst renderPlayerBoard = () => {\n    let gameboard = (0,_game__WEBPACK_IMPORTED_MODULE_0__.Game)().getPlayer().getGameboard().showGameboard();\n    playerBoard.style.setProperty('--grid-rows', gameboard.length);\n    playerBoard.style.setProperty('--grid-cols', gameboard.length);\n    for (let r = 0; r < gameboard.length; r++) {\n        for (let c = 0; c < gameboard.length; c++) {\n            let cell = document.createElement(\"div\");\n            cell.dataset.coord = [r, c];\n            playerBoard.appendChild(cell).className = \"grid-item\";\n        }\n    }\n};\n\nconst renderComputerBoard = () => {\n    let gameboard = (0,_game__WEBPACK_IMPORTED_MODULE_0__.Game)().getComputerPlayer().getGameboard().showGameboard();\n    ComputerBoard.style.setProperty('--grid-rows', gameboard.length);\n    ComputerBoard.style.setProperty('--grid-cols', gameboard.length);\n    for (let r = 0; r < gameboard.length; r++) {\n        for (let c = 0; c < gameboard.length; c++) {\n            let cell = document.createElement(\"div\");\n            cell.classList.add(\"grid-item\");\n            cell.dataset.coord = [r, c];\n            ComputerBoard.appendChild(cell);\n        }\n    }\n\n};\n\n\nconst displayShipOnGameboard = (e, currShip, currCell, nextShip) => {\n    if (currShip === undefined) return;\n    let element = e.target;\n    let row = parseInt(element.getAttribute(\"data-coord\")[0]);\n    let column = parseInt(element.getAttribute(\"data-coord\")[2]);\n    let result = game.placePlayerShip(row, column, currShip, currDirection);\n    if (!result) return;\n    for (const cell of currCell) {\n        cell.classList.remove(\"hovered-cell\");\n        cell.classList.add(\"ship-cell\");\n    }\n    for (let i = 0; i < nextShip.getShipLength(); i++) {\n        currCell[i].classList.add(\"invalid-placement\");\n    }\n    return result;\n};\n\nconst CellsOnHover = (e, currShip, currCell) => {\n    if (currShip === undefined) return;\n    const playerCells = [...playerBoard.children];\n    let element = e.target;\n    let row = parseInt(element.getAttribute(\"data-coord\")[0]);\n    console.log(row);\n    let column = parseInt(element.getAttribute(\"data-coord\")[2]);\n    console.log(column);\n    let cell;\n    console.log(currShip);\n    console.log(currDirection);\n    for (let i = 0; i < currShip.getShipLength(); i++) {\n        if (currDirection == \"vertical\") {\n            cell = findCell(playerCells, row + i, column);\n        } else {\n            cell = findCell(playerCells, row, column + i);\n        }\n        if (cell) {\n            currCell.push(cell);\n            cell.classList.add(\"hovered-cell\");\n        }\n    }\n    for (const cell of currCell) {\n        if (currCell.length !== currShip.getShipLength() || cell.classList.contains(\"ship-cell\")) {\n            cell.classList.add(\"invalid-placement\");\n        }\n    }\n};\n\nconst cellsOfHover = (e) => {\n    const playerCells = [...playerBoard.children];\n    for (const cell of playerCells) {\n        cell.classList.remove(\"hovered-cell\");\n        cell.classList.remove(\"invalid-placement\");\n    }\n};\n\nconst placeCellsController = () => {\n    playerBoard.addEventListener(\"click\", (e) => {\n        let nextShip = ships[0] || 1;\n        const result = displayShipOnGameboard(e, currShip, currCell, nextShip);\n        if (!result) return;\n        currShip = ships.shift();\n        if (currShip == undefined) {\n            enableBoards();\n            ComputerBoard.classList.remove(\"disable-board\");\n        }\n    });\n        playerBoard.addEventListener(\"mouseover\", (e) => {\n            CellsOnHover(e, currShip, currCell);\n        });\n    \n        playerBoard.addEventListener(\"mouseout\", (e) => {\n            cellsOfHover(e)\n            currCell = [];\n        });\n  \n};\n\n\nconst findCell = (cells, row, column) => {\n    return cells.find((cell) =>\n        parseInt(cell.getAttribute(\"data-coord\")[0]) == row && \n        parseInt(cell.getAttribute(\"data-coord\")[2]) == column);\n};\n\nconst changeDirection = (direction) => {\n    if (currDirection == direction) {\n        currDirection = \"Horizontal\";\n    } else {\n        currDirection = \"vertical\"\n    }\n   return currDirection;\n};\n\nconst enableBoards = () => {\n    playerBoard.style.pointerEvents = \"auto\";\n    playerBoard.style.pointerEvents = \"auto\";\n}\n\nconst getDirectionController = () =>{\n    direction.addEventListener(\"click\", (e)=>{\n        let direction = e.target.value;\n        changeDirection(direction);\n    });\n}\n\nconst show = () => {\n    renderPlayerBoard();\n    renderComputerBoard();\n    placeCellsController();\n    getDirectionController();\n}\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/module/dom.js?");

/***/ }),

/***/ "./src/module/game.js":
/*!****************************!*\
  !*** ./src/module/game.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/module/player.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/module/util.js\");\n\n\nconst Game = (() => {\n\n    let player = (0,_player__WEBPACK_IMPORTED_MODULE_0__.playerFactory)(\"leo\", 1);\n    let computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.computerFactory)(\"computer\", 2);\n\n\n    const getPlayer = () => player;\n    const getComputerPlayer = () => computer;\n\n    const placePlayerShip = (row,column,ship,direction)=>{\n        player.getGameboard().placeShip(row,column,ship,direction);\n    };\n\n    for(let i = 0; i<(0,_util__WEBPACK_IMPORTED_MODULE_1__.utils)().getCreatedShips().length; i++){\n        computer.placeShipRandomly((0,_util__WEBPACK_IMPORTED_MODULE_1__.utils)().getCreatedShips()[i]);\n    };\n\n    // console.table(computer.getGameboard().showGameboard());\n\n    const gameOver = () => {\n        if (player.getGameboard().isSunk == true) {\n            console.log(`${computer.getComputerAiName()} is the winner`);\n        } else if (computer.getGameboard().isSunk == true) {\n            console.log(`${player.getPlayerName()} is the winner`);\n        } else if (player.getGameboard().isSunk == false && computer.getGameboard().shipSunk == false) {\n            return false;\n        }\n    };\n\n    return {\n        gameOver,\n        getPlayer,\n        getComputerPlayer,\n        placePlayerShip,\n    }\n\n});\n\n\n\n//# sourceURL=webpack://battleship/./src/module/game.js?");

/***/ }),

/***/ "./src/module/gameboard.js":
/*!*********************************!*\
  !*** ./src/module/gameboard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameboardFactory\": () => (/* binding */ gameboardFactory)\n/* harmony export */ });\nfunction gameboardFactory() {\n\n    let gameboardArray = new Array(10).fill(\"\").map(() => Array(10).fill(\"\"));\n\n    const showGameboard = () => [...gameboardArray];\n\n    const placeShip = (row, column, ship, direction) => {\n        let shipFit = shipfit(row, column, direction, ship.getShipLength());\n         if (!shipFit) return false;\n        let checkSpace = cellEmpty(row, column, direction, ship.getShipLength());\n        if (!checkSpace) return false;\n        \n        if (direction == \"horizontal\") {\n            for (let i = 0; i < ship.getShipLength(); i++) {\n                gameboardArray[row][column + i] = ship;\n            }\n            return true;\n        }\n        else if (direction == \"vertical\") {\n            for (let i = 0; i < ship.getShipLength(); i++) {\n                gameboardArray[row + i][column] = ship;\n            }\n            return true;\n        }\n    }\n\n    const shipfit = (row, column, direction, length) => {\n        if (direction == \"horizontal\") {\n            if (column >= 0 && ((column + (length - 1)) < gameboardArray.length)) {\n                return true;\n            } else {\n                return false;\n            }\n        } else if (direction == \"vertical\") {\n            if (row >= 0 && ((row + (length - 1)) < gameboardArray.length)) {\n                return true;\n            } else {\n                return false;\n            }\n        }\n    }\n\n    const cellEmpty = (row, column, direction, length) => {\n        if (direction == \"horizontal\") {\n            for (let i = 0; i < length; i++) {\n                if (gameboardArray[row][column + i] !== \"\") {\n                    return false;\n                }\n            }\n            return true;\n        }\n        else if (direction == \"vertical\") {\n            for (let i = 0; i < length; i++) {\n                if (gameboardArray[row + i][column] !== \"\") {\n                    return false;\n                }\n            }\n            return true;\n        }\n    }\n\n    const recieveAttack = (row, column) => {\n        let checkBoardAttack = checkAttack(row, column);\n        if (!checkBoardAttack) return false;\n        let checkHitLegal = checkNotHit(row, column);\n        if (!checkHitLegal) return false;\n        shipAttack(row, column);\n    }\n\n    const shipAttack = (row, column) => {\n        if (gameboardArray[row][column] == \"\") {\n            gameboardArray[row][column] = \"miss\";\n        } else if (gameboardArray[row][column] !== \"\") {\n            gameboardArray[row][column].hit();\n        }\n    }\n\n    const checkAttack = (row, column) => {\n        if ((row >= 0 && column >= 0) && (row <= gameboardArray.length) && (column <= gameboardArray.length)) {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    const checkNotHit = (row, column) => {\n        if (gameboardArray[row][column] != true && gameboardArray[row][column] !== \"miss\") {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n\n    return {\n        showGameboard,\n        placeShip,\n        shipfit,\n        cellEmpty,\n        checkAttack,\n        recieveAttack,\n        checkNotHit,\n        shipAttack,\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/module/gameboard.js?");

/***/ }),

/***/ "./src/module/player.js":
/*!******************************!*\
  !*** ./src/module/player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"computerFactory\": () => (/* binding */ computerFactory),\n/* harmony export */   \"playerFactory\": () => (/* binding */ playerFactory)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/module/gameboard.js\");\n\nconst playerFactory = ((name, number) => {\n    const getPlayerName = () => name;\n    const getPlayerNum = () => number;\n\n    let gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)();\n\n    const getGameboard = () => {\n        return gameboard;\n    };\n\n    const attackRecieved = (row, column) => {\n        if (gameboard.recieveAttack(row, column)) {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    const sendAttack = (row, column, playerToAttack) => {\n        playerToAttack.attackRecieved(row, column);\n    }\n\n    return {\n        getGameboard,\n        getPlayerName,\n        getPlayerNum,\n        attackRecieved,\n        sendAttack,\n    }\n});\n\nconst computerFactory = (name, number) => {\n\n    let gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)();\n\n    const getGameboard = () => {\n        return gameboard\n    };\n    const getComputerAiName = () => name;\n    const getComputerAiNum = () => number;\n\n    const placeShipRandomly = (ship) => {\n        let row = 9;\n        let column = 9;\n        let orientation = [\"horizontal\", \"vertical\"];\n        let direction = Math.floor(Math.random() * orientation.length);\n        while (gameboard.placeShip(row, column, ship, orientation[direction]) == false) {\n            row = Math.floor(Math.random() * 10);\n            column = Math.floor(Math.random() * 10);\n        }\n        gameboard.placeShip(row, column, ship, orientation[direction]);\n    }\n\n    const attackRecieved = (row,column) =>{\n        if(gameboard.recieveAttack(row,column)){\n            return true;\n        }else{\n            return false;\n        }\n    }\n\n    const sendAttack = (playerToAttack) => {\n\n        let row = Math.floor(Math.random() * 10);\n        let column = Math.floor(Math.random() * 10);\n    \n        playerToAttack.attackRecieved(row,column);\n    }\n\n\n    return {\n        getGameboard,\n        getComputerAiName,\n        getComputerAiNum,\n        attackRecieved,\n        sendAttack,\n        placeShipRandomly,\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/module/player.js?");

/***/ }),

/***/ "./src/module/shipFactory.js":
/*!***********************************!*\
  !*** ./src/module/shipFactory.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shipFactory\": () => (/* binding */ shipFactory)\n/* harmony export */ });\nconst shipFactory = ((length, name) => {\n\n    let shipArray = Array(length).fill(\"\");\n    const getShipLength = () => length;\n    const getShipName = ()=> name;\n    const getShipArray = () => [...shipArray];\n\n    const hit = () => {\n        shipArray.pop();\n        return shipArray;\n    };\n\n    const hitCounter = () => {\n        return length - shipArray.length;\n    };\n\n    const isSunk = () => {\n        if (shipArray.length == 0) {\n            return true;\n        } else {\n            return false\n        }\n    };\n\n    return {\n        getShipArray,\n        getShipLength,\n        getShipName,\n        hit,\n        hitCounter,\n        isSunk,\n    }\n});\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/module/shipFactory.js?");

/***/ }),

/***/ "./src/module/util.js":
/*!****************************!*\
  !*** ./src/module/util.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"utils\": () => (/* binding */ utils)\n/* harmony export */ });\n/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ \"./src/module/shipFactory.js\");\n\n\nconst utils = () =>{\n    const createdShips = [];\n    let BattleShip = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(4, \"BattleShip\");\n    let Carrier = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(5, \"Carrier\");\n    let Destroyer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(4, \"Destroyer\");\n    let Submarine = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(4, \"Submarine\");\n    let PatrolBoat = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(2, \"Patrol-Boat\");\n\n    createdShips.push(BattleShip,Carrier,Destroyer,Submarine,PatrolBoat);\n\n    const getCreatedShips = () => [...createdShips]\n\n    return{\n        getCreatedShips,\n    }\n    \n}\n\n\n\n//# sourceURL=webpack://battleship/./src/module/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;