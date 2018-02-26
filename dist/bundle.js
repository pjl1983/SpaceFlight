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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function spaceFlight() {
    var meteorImage = new Image();
    meteorImage.src = '../images/meteor.png';
    var ship = new Image();
    ship.src = '../images/rocket_1.png';
    var explosion = new Image();
    explosion.src = '../images/explosion.png';
    var explosionSprite = [
        [0, 0], [125, 0], [250, 0], [375, 0],
        [0, 125], [125, 125], [250, 125], [375, 125],
        [0, 250], [125, 250], [250, 250], [375, 250],
        [0, 375], [125, 375], [250, 375], [375, 375]
    ];
    var canvas;
    var ctx;
    canvas = document.getElementById('spaceFlight');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var gameTimer = 4;
    var shipHeight = 50;
    var shipWidth = 140;
    var shipMoveSpeed = 10;
    var shipX = 50;
    var shipY = (canvasHeight / 2) - shipHeight / 2;
    var count = 3;
    var score = 0;
    var direction = 1;
    var keyCode = null;
    var keyPress = false;
    var startMeteorShower = false;
    var gameOver = false;
    var started = false;
    var crash = false;
    var w;
    var h;
    var radians = Math.PI / 180;
    var iExplode = 0;
    var meteorArray = [];
    function resize() {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    function random(min, max) {
        return Math.random() * (max ? (max - min) : min) + (max ? min : 0);
    }
    function meteor(count, callback) {
        while (count--) {
            callback(count);
        }
    }
    function createMeteors() {
        meteor(10, function () {
            var size = random(50, 200);
            meteorArray.push({
                x: random(canvas.width, canvas.width + 500),
                y: random(0, canvas.height),
                sizeX: size / 2,
                sizeY: size / 2,
                offsetX: size,
                offsetY: size,
                angle: random(-5, -1),
                speed: random(1, 10),
                rotation: random(-10, -1)
            });
        });
    }
    function shipDraw() {
        if (ship.complete && startMeteorShower && !crash) {
            ship.src = gameTimer % 4 === 0 ? '../images/rocket_1.png' : '../images/rocket_2.png';
            ctx.drawImage(ship, shipX, shipY, shipWidth, shipHeight);
        }
    }
    function beginCountdown() {
        if (started === false) {
            started = true;
            var displayCountdown_1 = function () {
                setTimeout(function () {
                    if (count !== 0) {
                        count = count - 1;
                        displayCountdown_1();
                    }
                    else {
                        startMeteorShower = true;
                    }
                }, 1000);
            };
            displayCountdown_1();
        }
        if (count !== 0) {
            ctx.font = '100px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(count.toString(), canvas.width / 2, canvas.height / 2);
        }
    }
    document.addEventListener('keydown', function (event) {
        keyPress = true;
        keyCode = event.keyCode;
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
    document.addEventListener('keyup', function (event) {
        keyPress = false;
    });
    function shipMove() {
        if (keyPress) {
            switch (keyCode) {
                case 37:
                    // Left
                    if (shipX > 15) {
                        shipX = shipX - shipMoveSpeed;
                        direction = -1;
                    }
                    break;
                case 38:
                    // Up
                    if (shipY > 15) {
                        shipY = shipY - shipMoveSpeed;
                        direction = -1;
                    }
                    break;
                case 39:
                    // Right
                    if (shipX < canvasWidth - (shipWidth + 15)) {
                        shipX = shipX + shipMoveSpeed;
                        direction = 1;
                    }
                    break;
                case 40:
                    // Down
                    if (shipY < canvasHeight - (shipHeight + 15)) {
                        shipY = shipY + shipMoveSpeed;
                        direction = 1;
                    }
                    break;
            }
        }
    }
    function scoreCounter() {
        if (gameTimer % 5 === 0 && startMeteorShower) {
            score = score + 500;
        }
        var scoreString = score.toString();
        switch (scoreString.length) {
            case 3:
                scoreString = '000000' + scoreString;
                break;
            case 4:
                scoreString = '00000' + scoreString;
                break;
            case 5:
                scoreString = '0000' + scoreString;
                break;
            case 6:
                scoreString = '000' + scoreString;
                break;
            case 7:
                scoreString = '00' + scoreString;
                break;
            case 8:
                scoreString = '0' + scoreString;
                break;
            default:
                scoreString = '000000000';
        }
        var x1 = canvasWidth - 50;
        var y1 = 35;
        var radius1 = 25;
        var startAngle1 = Math.PI * 0.5;
        var endAngle1 = Math.PI * 1.5;
        var antiClockwise1 = true;
        var x2 = canvasWidth - 190;
        var y2 = 35;
        var radius2 = 25;
        var startAngle2 = Math.PI * 1.5;
        var endAngle2 = Math.PI * 0.5;
        var antiClockwise2 = true;
        ctx.beginPath();
        ctx.arc(x1, y1, radius1, startAngle1, endAngle1, antiClockwise1);
        ctx.lineTo(100, 10);
        ctx.arc(x2, y2, radius2, startAngle2, endAngle2, antiClockwise2);
        ctx.closePath();
        ctx.fillStyle = '#ed303c';
        ctx.fill();
        x1 = canvasWidth - 50;
        y1 = 35;
        radius1 = 20;
        startAngle1 = Math.PI * 0.5;
        endAngle1 = Math.PI * 1.5;
        antiClockwise1 = true;
        x2 = canvasWidth - 190;
        y2 = 35;
        radius2 = 20;
        startAngle2 = Math.PI * 1.5;
        endAngle2 = Math.PI * 0.5;
        ctx.beginPath();
        ctx.arc(x1, y1, radius1, startAngle1, endAngle1, antiClockwise1);
        ctx.lineTo(canvasWidth - 50, 15);
        ctx.arc(x2, y2, radius2, startAngle2, endAngle2, antiClockwise2);
        ctx.closePath();
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.font = '28px Arial';
        ctx.fillStyle = '#ed303c';
        ctx.textAlign = 'right';
        ctx.fillText(scoreString, canvas.width - 50, 45);
    }
    function restart() {
        // ctx.font = '50px Arial';
        // ctx.fillStyle = '#ffffff';
        // ctx.textAlign = 'center';
        // ctx.fillText('Would You like to play again?', canvas.width / 2, 300);
        // ctx.font = '25px Arial';
        // ctx.fillStyle = '#ffffff';
        // ctx.textAlign = 'center';
        // ctx.fillText('(Press Y to begin)', canvas.width / 2, 400);
        meteorArray = [];
        createMeteors();
        started = false;
        count = 3;
        iExplode = 0;
        crash = false;
        shipX = 50;
        shipY = (canvasHeight / 2) - shipHeight / 2;
        gameOver = false;
        gameTimer = 0;
        score = 0;
    }
    function drawMeteor(x, y, sizeX, sizeY, offsetX, offsetY, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * radians);
        ctx.drawImage(meteorImage, -sizeX, -sizeY, offsetX, offsetY);
        ctx.translate(-x, -y);
        ctx.restore();
    }
    function explode() {
        if (iExplode < explosionSprite.length) {
            setTimeout(function () {
                iExplode += iExplode + 1;
                explode();
            }, 50);
        }
    }
    function update() {
        gameTimer = gameTimer + 1;
        ctx.clearRect(0, 0, w, h);
        if (meteorImage.complete && startMeteorShower) {
            for (var i = 0; i < meteorArray.length; i++) {
                if (meteorArray[i].x + meteorArray[i].sizeX < 0) {
                    meteorArray.splice(i, 1);
                    var size = random(50, 200);
                    meteorArray.push({
                        x: random(canvas.width, canvas.width + 300),
                        y: random(0, canvas.height),
                        sizeX: size / 2,
                        sizeY: size / 2,
                        offsetX: size,
                        offsetY: size,
                        angle: random(-5, -1),
                        speed: random(1, 10),
                        rotation: random(-10, -1)
                    });
                }
            }
            for (var i = 0; i < meteorArray.length; i++) {
                drawMeteor(meteorArray[i].x, meteorArray[i].y, meteorArray[i].sizeX, meteorArray[i].sizeY, meteorArray[i].offsetX, meteorArray[i].offsetY, meteorArray[i].angle);
                meteorArray[i].angle += meteorArray[i].rotation;
                meteorArray[i].x -= meteorArray[i].speed;
            }
        }
        for (var i = 0; i < meteorArray.length; i++) {
            var shipMin = shipY - shipHeight / 2;
            var shipMax = shipY + shipHeight / 2;
            var shipW = shipX + shipWidth;
            var meteorMax = meteorArray[i].y + meteorArray[i].sizeY / 2;
            var meteorMin = meteorArray[i].y - meteorArray[i].sizeY / 2;
            if (meteorArray[i].x - meteorArray[i].sizeX / 2 <= shipW &&
                meteorArray[i].x + meteorArray[i].sizeX / 2 >= shipX &&
                ((shipMax > meteorMin && shipMax <= meteorMax) || (shipMin < meteorMax && shipMin >= meteorMin))) {
                if (!crash) {
                    crash = true;
                    explode();
                    meteorArray.splice(i, 1);
                }
            }
        }
        if (crash) {
            if (iExplode < explosionSprite.length) {
                ctx.drawImage(explosion, explosionSprite[iExplode][0], explosionSprite[iExplode][1], 115, 115, shipX, shipY, 200, 200);
            }
            else {
                startMeteorShower = false;
                gameOver = true;
            }
        }
        if (!gameOver) {
            shipMove();
            shipDraw();
            beginCountdown();
            scoreCounter();
        }
        else {
            setTimeout(function () {
                restart();
            }, 2000);
        }
        requestAnimationFrame(update);
    }
    createMeteors();
    requestAnimationFrame(update);
}
window.onload = function () {
    spaceFlight();
};


/***/ })
/******/ ]);