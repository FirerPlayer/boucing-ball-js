console.log(" Olá. Esta é a bola pulante !");

const canvas = document.getElementById("GameCanvas");   // seleciona o objeto canvas da pagina HTML
const contexto = canvas.getContext('2d');   // cria o contexto para desenho no canvas
var width = canvas.width = window.innerWidth;   // define o tamanho do canvas
var height = canvas.height = window.innerHeight;    // defina a altura do canvas
const mouse = new Vector(30, 30);   // inicia a posição do mouse
var mouseClicked = false;   // variavel para controle do clique do mouse
var toggleB = document.getElementById("labelToggle")    // inicia botão do ambiente
var mouseOn = true; // variavel para controle do mouse sobre o botão

toggleB.addEventListener('mouseover', () => {
    mouseOn = false;
    toggleB.addEventListener('mouseleave', () => {
        mouseOn = true;
    })
})

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})
addEventListener('click', (e) => {
    if (mouseOn) {
        mouseClicked = true;
    }
})


function updateDisplay() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
function updateBackground(color, random = false) {
    if (random) {
        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        updateBackground(randomColor)
        return
    }
    canvas.style.backgroundColor = color;
}

function ballBorderCollision(ball) {
    const width = canvas.width;
    const height = canvas.height;
    if (ball.position.x < 0 + ball.radius) {
        ball.position.x = 0 + ball.radius;
        ball.velocity.invertX()
        ball.aceleration.invertX()
        updateBackground('', true)
    } else if (ball.position.x > width - ball.radius) {
        ball.position.x = width - ball.radius;
        ball.velocity.invertX()
        ball.aceleration.invertX()
        updateBackground('', true)
    }
    if (ball.position.y < 0 + ball.radius) {
        ball.position.y = 0 + ball.radius;
        ball.velocity.invertY()
        ball.aceleration.invertY()
        updateBackground('', true)
    } else if (ball.position.y > height - ball.radius) {
        ball.position.y = height - ball.radius;
        ball.velocity.invertY()
        ball.aceleration.invertY()
        if (ball.gravity == null) {
            updateBackground('', true)
        }

    }
}

const ball = new Circle('ball', 10, new Vector(width / 2, height / 2))
ball.setFriction(.98)
ball.setVelocity(new Vector(0, 0))
canvas.addEventListener('wheel', (e) => {
    if (ball.radius + e.deltaY / 20 >= 0) {
        ball.radius += e.deltaY / 20;
    }
    if (ball.radius >= 120) {
        ball.radius = 120
    }
    if (ball.radius <= 5) {
        ball.radius = 5
    }
})

function Buttontoggle() {
    if (document.getElementById('toggle').checked) {
        ball.setGravity(new Vector(0, 1))
    } else {
        ball.setGravity(null)
    }
}

var c = 0
function loop() {
    updateDisplay();
    contexto.clearRect(0, 0, width, height);
    if(c < 1){
        contexto.font = '12px Arial'
        contexto.textAlign = 'center'
        contexto.fillText("Use o scroll do mouse para alterar o tamanho da bola", 150, 20)
        contexto.fillText("Clique para movimentar a bola", 89, 40)
        delete c
    }
    ball.draw(contexto);
    ballBorderCollision(ball);

    const ballLine = { x0: ball.position.x, y0: ball.position.y, x1: mouse.x, y1: mouse.y };
    let impulseVector = new Vector(ballLine.x1, ballLine.y1).subtract(new Vector(ballLine.x0, ballLine.y0))
    if (mouseClicked) {
        c+=1
        ball.setVelocity(impulseVector)
        mouseClicked = false;
    }
    ball.drawLine(contexto, ballLine.x0, ballLine.y0, ballLine.x1, ballLine.y1);
    Buttontoggle()
    ball.moveFor()
    requestAnimationFrame(loop);
}

loop();