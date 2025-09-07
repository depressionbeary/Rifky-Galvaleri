const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let heartsArray = [];

class Heart {
    constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.alpha = 1;
    }

    draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#ff6b6b";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(
        this.x + this.size / 2,
        this.y - this.size / 2,
        this.x + this.size,
        this.y + this.size / 3,
        this.x,
        this.y + this.size
    );
    ctx.bezierCurveTo(
        this.x - this.size,
        this.y + this.size / 3,
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.x,
        this.y
    );
    ctx.fill();
    ctx.restore();
    }

    update() {
    this.y -= this.speed;
    this.alpha -= 0.01;
    if (this.alpha <= 0) {
        this.alpha = 1;
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
    }
    this.draw();
    }
}

function createHeart() {
    const x = Math.random() * canvas.width;
    const size = Math.random() * 20 + 10;
    const speed = Math.random() * 1.5 + 0.5;
    heartsArray.push(new Heart(x, canvas.height, size, speed));
}

setInterval(createHeart, 100);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heartsArray.forEach((heart) => heart.update());
    requestAnimationFrame(animate);
}

animate();