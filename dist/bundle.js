/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function spaceFlight() {
    var canvas;
    var ctx;
    canvas = document.getElementById('spaceFlight');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var gameTimer = 0;
    var shipMoveSpeed = 15;
    var shipX = 50;
    var shipY = canvasHeight / 2 - 100;
    var shipHeight = 75;
    var shipWidth = 95;
    var count = 3;
    var score = 0;
    var direction = 1;
    var keyCode = null;
    var keyPress = false;
    var gameOver = false;
    var started = false;
    gameLoop();
    document.addEventListener('keydown', function (event) {
        keyCode = event.keyCode;
        keyPress = true;
    }, true);
    document.addEventListener('keyup', function (event) {
        keyPress = false;
    }, true);
    function shipDraw() {
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, shipX, shipY, shipWidth, shipHeight);
        };
        if (gameTimer % 2 === 0) {
            img.src = '../images/ship_1.png';
        }
        else {
            img.src = '../images/ship_2.png';
        }
    }
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 89) {
            shipMoveSpeed = 30;
            shipX = 50;
            shipY = canvasHeight / 2 - 100;
            score = 0;
            keyCode = null;
            keyPress = false;
            gameOver = false;
        }
    }, true);
    function shipMove() {
        if (keyPress) {
            if (keyCode === 38 && shipY > 0) {
                shipY = shipY - shipMoveSpeed;
                direction = -1;
            }
            else if (keyCode === 40 && shipY < canvasHeight - 200) {
                shipY = shipY + shipMoveSpeed;
                direction = 1;
            }
        }
    }
    function beginCountdown() {
        if (started === false) {
            started = true;
            var endCount_1 = false;
            function displayCountdown() {
                if (endCount_1 === false) {
                    setTimeout(function () {
                        if (count !== 0) {
                            count = count - 1;
                            displayCountdown();
                        }
                    }, 1000);
                }
            }
            displayCountdown();
        }
        if (count !== 0) {
            ctx.font = '100px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(count.toString(), canvas.width / 2, canvas.height / 2);
        }
    }
    function restart() {
        ctx.font = '50px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('Would You like to play again?', canvas.width / 2, 300);
        ctx.font = '25px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('(Press Y to begin)', canvas.width / 2, 400);
        started = false;
        count = 3;
    }
    function gameLoop() {
        gameTimer = gameTimer + 1;
        var background = new Image();
        background.src = '../images/background.jpg';
        background.onload = function () {
            ctx.drawImage(background, 0, 0);
        };
        if (!gameOver) {
            shipDraw();
            shipMove();
            beginCountdown();
        }
        else {
            restart();
        }
        requestAnimationFrame(gameLoop);
    }
}
window.onload = function () {
    spaceFlight();
};


/***/ })
/******/ ]);