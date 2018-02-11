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
    var image = new Image;
    image.src = '../images/rock.png';
    var ship = new Image();
    ship.src = '../images/ship_1.png';
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
    var startMeteorShower = false;
    var gameOver = false;
    var started = false;
    var w;
    var h;
    var sprites = [];
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
    meteor(30, function () {
        sprites.push({
            x: random(w, 2000),
            y: random(h),
            xr: 0,
            yr: 0,
            r: random(Math.PI * 2),
            scale: random(0.1, 0.5),
            dx: random(-2, 0),
            dy: random(0, 0),
            dr: random(-0.2, 0.2),
        });
    });
    function shipDraw() {
        ctx.drawImage(ship, shipX, shipY, shipWidth, shipHeight);
        gameTimer % 3 === 0 ? ship.src = '../images/ship_1.png' : ship.src = '../images/ship_2.png';
    }
    function beginCountdown() {
        if (started === false) {
            started = true;
            var endCount = false;
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
    function drawImage(image, spr) {
        ctx.setTransform(spr.scale, 0, 0, spr.scale, spr.xr, spr.yr); // sets scales and origin
        ctx.rotate(spr.r);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }
    function update() {
        gameTimer = gameTimer + 1;
        var ihM, iwM;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, w, h);
        if (image.complete && startMeteorShower) {
            var iw = image.width;
            var ih = image.height;
            for (var i = 0; i < sprites.length; i++) {
                var spr = sprites[i];
                spr.x += spr.dx;
                spr.y += spr.dy;
                spr.r += spr.dr;
                iwM = iw * spr.scale * 2 + w;
                ihM = ih * spr.scale * 2 + h;
                spr.xr = ((spr.x % iwM) + iwM) % iwM - iw * spr.scale;
                spr.yr = ((spr.y % ihM) + ihM) % ihM - ih * spr.scale;
                drawImage(image, spr);
            }
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.rotate(0);
        if (!gameOver) {
            shipDraw();
            shipMove();
            beginCountdown();
            scoreCounter();
        }
        else {
            restart();
        }
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
window.onload = function () {
    spaceFlight();
};


/***/ })
/******/ ]);