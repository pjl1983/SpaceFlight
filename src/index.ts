import {SprModel} from './spr.model';

function spaceFlight(): any {
    let meteorImage = new Image();
    meteorImage.src = '../images/meteor.png';

    let ship = new Image();
    ship.src = '../images/rocket_1.png';

    let explosion = new Image();
    explosion.src = '../images/explosion.png';

    let explosionSprite: number[][] = [
        [0, 0], [125, 0], [250, 0], [375, 0],
        [0, 125], [125, 125], [250, 125], [375, 125],
        [0, 250], [125, 250], [250, 250], [375, 250],
        [0, 375], [125, 375], [250, 375], [375, 375]
    ];

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('spaceFlight');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    let canvasWidth: number = canvas.width;
    let canvasHeight: number = canvas.height;

    let gameTimer: number = 4;

    const shipHeight: number = 50;
    const shipWidth: number = 140;

    let shipMoveSpeed: number = 10;
    let shipX: number = 50;
    let shipY: number = (canvasHeight / 2) - shipHeight / 2;

    let count: number = 3;

    let score: number = 0;
    let direction: number = 1;
    let keyCode: number = null;
    let keyPress: boolean = false;

    let startMeteorShower: boolean = false;
    let gameOver: boolean = false;
    let started: boolean = false;
    let crash: boolean = false;
    let restarting: boolean = false;

    let w: number;
    let h: number;
    let radians = Math.PI / 180;

    let iExplode: number = 0;
    let meteorArray: SprModel[] = [];

    function resize() {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
    }

    resize();

    window.addEventListener('resize', resize);

    function random(min?: number, max?: number) {
        return Math.random() * (max ? (max - min) : min) + (max ? min : 0);
    }

    function meteor(count: number, callback: any) {
        while (count--) {
            callback(count);
        }
    }

    function createMeteors() {
        meteor(10, () => {
            let size = random(50, 200);
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

    function shipDraw(): void {
        if (ship.complete && startMeteorShower && !crash) {
            ship.src = gameTimer % 4 === 0 ? '../images/rocket_1.png' : '../images/rocket_2.png';
            ctx.drawImage(ship, shipX, shipY, shipWidth, shipHeight);
        }
    }

    function beginCountdown() {
        if (started === false) {
            started = true;
            let displayCountdown = () => {
                setTimeout(() => {
                    if (count !== 0) {
                        count = count - 1;
                        displayCountdown();
                    } else {
                        startMeteorShower = true;
                    }
                }, 1000);
            };
            displayCountdown();
        }

        if (count !== 0) {
            ctx.font = '100px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(count.toString(), canvas.width / 2, canvas.height / 2);
        }
    }

    document.addEventListener('keydown', (event) => {
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

    document.addEventListener('keyup', (event) => {
        keyPress = false;
    });

    function shipMove(): void {
        if (keyPress && !crash) {
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
        let scoreString = score.toString();

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

        let x1 = canvasWidth - 50;
        let y1 = 35;
        let radius1 = 25;
        let startAngle1 = Math.PI * 0.5;
        let endAngle1 = Math.PI * 1.5;
        let antiClockwise1 = true;

        let x2 = canvasWidth - 190;
        let y2 = 35;
        let radius2 = 25;
        let startAngle2 = Math.PI * 1.5;
        let endAngle2 = Math.PI * 0.5;
        let antiClockwise2 = true;

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

    function restart(): void {
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
        restarting = false;
    }

    function drawMeteor(x: number, y: number, sizeX: number, sizeY: number, offsetX: number, offsetY: number, angle: number) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * radians);
        ctx.drawImage(meteorImage, -sizeX, -sizeY, offsetX, offsetY);
        ctx.translate(-x, -y);
        ctx.restore();
    }

    function explode() {
        if (iExplode < explosionSprite.length) {
            setTimeout(() => {
                iExplode += iExplode + 1;
                explode();
            }, 50);
        }
    }

    function update() {
        gameTimer = gameTimer + 1;
        ctx.clearRect(0, 0, w, h);

        if (meteorImage.complete && startMeteorShower) {
            for (let i = 0; i < meteorArray.length; i++) {
                if (meteorArray[i].x + meteorArray[i].sizeX < 0) {
                    meteorArray.splice(i, 1);
                    let size = random(50, 200);
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

            for (let i = 0; i < meteorArray.length; i++) {
                drawMeteor(meteorArray[i].x, meteorArray[i].y, meteorArray[i].sizeX, meteorArray[i].sizeY, meteorArray[i].offsetX, meteorArray[i].offsetY, meteorArray[i].angle);
                meteorArray[i].angle += meteorArray[i].rotation;
                meteorArray[i].x -= meteorArray[i].speed;
            }
        }

        for (let i = 0; i < meteorArray.length; i++) {
            let shipMin = shipY - shipHeight / 2;
            let shipMax = shipY + shipHeight / 2;
            let shipW = shipX + shipWidth;
            let meteorMax = meteorArray[i].y + meteorArray[i].sizeY / 2;
            let meteorMin = meteorArray[i].y - meteorArray[i].sizeY / 2;
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
                ctx.drawImage(explosion, explosionSprite[iExplode][0], explosionSprite[iExplode][1], 115, 115, shipX, shipY - 100, 200, 200);
            } else {
                startMeteorShower = false;
                gameOver = true;
            }
        }

        if (!gameOver) {
            shipMove();
            shipDraw();
            beginCountdown();
            scoreCounter();
        } else if (!restarting) {
            restarting = true;
            setTimeout(() => {
                restart();
            }, 2000);
        }
        requestAnimationFrame(update);
    }

    createMeteors();
    requestAnimationFrame(update);
}

window.onload = (): void => {
    spaceFlight();
};