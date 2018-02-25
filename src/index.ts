import {SprModel} from './spr.model';

function spaceFlight(): any {
    let image = new Image;
    image.src = '../images/rock.png';

    let ship = new Image();
    ship.src = '../images/rocket_1.png';

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('spaceFlight');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    let canvasWidth: number = canvas.width;
    let canvasHeight: number = canvas.height;

    let gameTimer: number = 4;

    let shipMoveSpeed: number = 10;
    let shipX: number = 50;
    let shipY: number = canvasHeight / 2 - 100;

    const shipHeight: number = 50;
    const shipWidth: number = 140;

    let count: number = 3;

    let score: number = 0;
    let direction: number = 1;
    let keyCode: number = null;
    let keyPress: boolean = false;

    let startMeteorShower: boolean = false;
    let gameOver: boolean = false;
    let started: boolean = false;

    let w: number;
    let h: number;

    const sprites: SprModel[] = [];

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

    meteor(30, () => {
        sprites.push({
            x: random(w - 500, w + 500), // Horizontal position
            y: random(0, h + 100), // Vertical position
            xr: 0,
            yr: 0,
            r: random(Math.PI * 2), // Rotation speed
            scale: random(0.1, 0.5), // Meteor Size
            dx: random(-8, -2), // Horizontal Meteor Speed
            dy: random(0, 0), // Vertical Meteor Speed
            dr: random(-0.2, 0.2)
        });
    });

    function shipDraw(): void {
        if (ship.complete && startMeteorShower) {
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

    function drawImage(image: HTMLImageElement, spr: SprModel) {
        ctx.setTransform(spr.scale, 0, 0, spr.scale, spr.xr, spr.yr); // sets scales and origin
        ctx.rotate(spr.r);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }

    function update() {
        gameTimer = gameTimer + 1;
        let ihM, iwM;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, w, h);
        if (image.complete && startMeteorShower) {
            let iw = image.width;
            let ih = image.height;

            for (let i = 0; i < sprites.length; i++) {
                if (sprites[i].x < 0) {
                    sprites.splice(i, 1);
                    sprites.push({
                        x: w + 200, // Horizontal position
                        y: random(0, h + 100), // Vertical position
                        xr: 0,
                        yr: 0,
                        r: random(Math.PI * 2), // Rotation speed 
                        scale: random(0.1, 0.5), // Meteor Size
                        dx: random(-8, -2), // Horizontal Meteor Speed
                        dy: random(0, 0), // Vertical Meteor Speed
                        dr: random(-0.2, 0.2)
                    });
                }
            }

            for (let i = 0; i < sprites.length; i++) {
                let spr = sprites[i];
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

        console.log(sprites[0].x);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.rotate(0);

        if (!gameOver) {
            shipMove();
            shipDraw();
            beginCountdown();
            scoreCounter();
        } else {
            restart();
        }
        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

window.onload = (): void => {
    spaceFlight();
};
