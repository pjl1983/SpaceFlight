function spaceFlight(): any {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('spaceFlight');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    let canvasWidth: number = canvas.width;
    let canvasHeight: number = canvas.height;

    let gameTimer: number = 0;

    let shipMoveSpeed: number = 15;
    let shipX: number = 50;
    let shipY: number = canvasHeight / 2 - 100;

    const shipHeight: number = 75;
    const shipWidth: number = 95;

    let count: number = 3;

    let score: number = 0;
    let direction: number = 1;
    let keyCode: number = null;
    let keyPress: boolean = false;

    let gameOver: boolean = false;
    let started: boolean = false;

    let startMeteorShower: boolean = false;

    gameLoop();

    document.addEventListener('keydown', (event) => {
        keyCode = event.keyCode;
        keyPress = true;
    }, true);

    document.addEventListener('keyup', (event) => {
        keyPress = false;
    }, true);


    function shipDraw(): void {
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, shipX, shipY, shipWidth, shipHeight);
        };

        if (gameTimer % 2 === 0) {
            img.src = '../images/ship_1.png';
        } else {
            img.src = '../images/ship_2.png';
        }

    }

    document.addEventListener('keydown', (event) => {
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

    function shipMove(): void {
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

    function meteorShower() {
        if (startMeteorShower) {

        }
    }

    function beginCountdown() {
        if (started === false) {
            started = true;
            let endCount: boolean = false;

            function displayCountdown() {
                setTimeout(function () {
                    if (count !== 0) {
                        count = count - 1;
                        displayCountdown();
                    } else {
                        startMeteorShower = true;
                    }
                }, 1000);
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

    function gameLoop(): void {
        gameTimer = gameTimer + 1;
        let background = new Image();
        background.src = '../images/background.jpg';
        background.onload = function () {
            ctx.drawImage(background, 0, 0);
        };
        if (!gameOver) {
            shipDraw();
            shipMove();
            meteorShower();
            beginCountdown();
        } else {
            restart();
        }
        requestAnimationFrame(gameLoop);
    }
}

window.onload = (): void => {
    spaceFlight();
};