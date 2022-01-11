var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  //loading all the assets
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  //creating the groups
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  //creating the sprite fo the ghost
  ghost = createSprite(200, 200.5, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw() {
  background(200);
  //setting up PLAY game state
  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300;
    }

    //adding the movility
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY + 0.1;
    //the ghost can rest in climbers
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    spawnDoors();
    drawSprites();
    //adding condition to end the game
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
  }
  if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
}

//creating functions to spawn doors

function spawnDoors() {
  //1 second = 60 frames
  if (frameCount % 240 === 0) {
    //door Sprites
    door = createSprite(200, -50);
    door.addImage(doorImg);
    //climber Sprites
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    //invisible block Sprites
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //adding velocity and position
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;

    climber.x = door.x;
    climber.velocityY = 1;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    //setting lifetime
    door.lifetime = 800;
    climber.lifetime = 800;
    //adding doors to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    //adding depth
    ghost.depth = door.depth;
    ghost.depth += 1;

    //making invisible the blocks
    invisibleBlock.debug = true;
    //adding blocks to the group
    invisibleBlockGroup.add(invisibleBlock);
  }
}
