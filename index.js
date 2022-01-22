var canvas = document.getElementById("playGround");
var ctx = canvas.getContext("2d");
var ballRadius = 5;
//canvas.width/2
var x = ballRadius;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var score = 0;
var lives = 3;

var ballBatHeight = 10;
var ballBatWidth = 75;
var ballBat = (canvas.width-ballBatWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 7;
var brickColumnCount = 3;
var brickWidth = 50;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function start(){
    document.getElementById("start").style.color = "#999999";
    document.getElementById("start").style.backgroundColor = "#eee";
    draw();
}

function quit(){
    document.location.reload();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    ballBat = relativeX - ballBatWidth/2;
  }
}
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}
function drawBallBat() {
  ctx.beginPath();
  ctx.rect(ballBat, canvas.height-ballBatHeight, ballBatWidth, ballBatHeight);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#3b5998";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "22px Heveltica";
  ctx.fillStyle = "#f00fff";
  ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
  ctx.font = "15px Arial";
  ctx.fillStyle = "#f00fff";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawBallBat() ;
  drawScore();
  drawLives();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > ballBat && x < ballBat + ballBatWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        ballBat = (canvas.width-ballBatWidth)/2;
      }
    }
  }

  if(rightPressed && ballBat < canvas.width-ballBatWidth) {
    ballBat += 7;
  }
  else if(leftPressed && ballBat > 0) {
    ballBat -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

