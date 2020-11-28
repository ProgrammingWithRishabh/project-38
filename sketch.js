//Global Variables
var PLAY = 0;
var LOST = 1;
var WIN = 2;
var gameState = PLAY;
var wall;
var monkey;
var player_running;
var bananaImage, banana, bananaGroup;
var bg, bgImage;
var jungle, jungleImage;
var score = 0;
var invisible;
var stone, stoneImage, stoneGroup;

function preload() {

  bananaImage = loadImage("Banana.png");
  jungleImage = loadImage("jungle2.jpg");
  stoneImage = loadImage("stone.png");
  player_running = loadAnimation(
    "Monkey_01.png", "Monkey_02.png",
    "Monkey_03.png", "Monkey_04.png",
    "Monkey_05.png", "Monkey_06.png",
    "Monkey_07.png", "Monkey_08.png",
    "Monkey_09.png", "Monkey_10.png");
}


function setup() {
  createCanvas(500, 500);

  bg = createSprite(200, 220, 500, 500);
  bg.addImage(jungleImage);
  bg.scale = 0.7

  monkey = createSprite(100, 350, 600, 500);
  monkey.addAnimation("running", player_running);
  monkey.velocityX = 2;
  monkey.scale = 0.1;

  invisible = createSprite(350, 400, 1000000, 20);
  invisible.scale = 0.1;
  invisible.visible = false;

  bananaGroup = createGroup();
  stoneGroup = createGroup();
}


function draw() {
  background(0);

  camera.position.x = monkey.x;


  if (bg.x < camera.position.x - 50) {
    bg.x = camera.position.x;
  }

  if (invisible.x < 0) {
    invisible.x = 200;
  }
  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y >= 345) {
      monkey.velocityY = -15;
    }

    //spawning the bananas and the stones
    spawnBanana();
    spawnStone();


    if (keyDown(RIGHT_ARROW)) {
      monkey.x = monkey.x + 10;
      bg.velocityX = -1
    }

    //making a scrolling background 
    if (bg.x < 100) {
      bg.x = 20;
    }

    if (monkey.isTouching(bananaGroup)) {

      //making the bananas disappear
      bananaGroup.destroyEach();

      //increasing score by a random value
      score += floor(map(random(), 0, 1, 5, 15));

      //winning the game
      if (score > 50) gameState = WIN;
      //making the monkey bigger in size based on the score
      else monkey.scale = map(score, 0, 50, 0.1, 0.18);
    }

    //applying gravity to the monkey
    monkey.velocityY++;

    monkey.collide(invisible);
  }

  //losing the game
  if (stoneGroup.isTouching(monkey)) {
    gameState = LOST;
  }

  //condition for losing the game
  if (gameState === LOST) {
    textSize(30);
    fill(255);
    text("Game Over", camera.position.x - 50, 200);
    text("Reload your page to play again", camera.position.x - 250, 250);
    end();
  }

  //condition for winning the game
  if (gameState === WIN) {
    textSize(30);
    fill(255);
    text("YOU WIN!!", camera.position.x - 50, 200);
    text("Reload your page to play again", camera.position.x - 250, 250);
    end();
  }

  drawSprites();

  //writeing some text on the screen
  stroke("white");
  fill("white");
  textSize(24);
  text("Press right arrow to move faster", monkey.x- 100, 100);
  //displaying score
  textSize(40);
  text("Score : " + score, monkey.x, 50);

}

//funciton for ending the game
function end() {
  bg.visible = false;
  monkey.visible = false;

  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
}

//function for spawning bananas
function spawnBanana() {
  if (frameCount % 100 === 0) {
    banana = createSprite(monkey.x + 200, 250, 600, 500);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 1000;
    bananaGroup.add(banana);

  }
}

//function for spawning stones
function spawnStone() {
  if (frameCount % 150 === 0) {
    stone = createSprite(monkey.x + 200, 420);
    stone.addImage(stoneImage);
    stone.scale = 0.2;
    stone.lifetime = 1000;
    stoneGroup.add(stone);
  }
}

