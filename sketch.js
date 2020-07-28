var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var CloudsGroup,cloudimage;
var ObstaclesGroup,o1, o2, o3,o4,o5,o6;
var count =0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOverImage, restart, restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  groundImage = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png");
  o1= loadImage("obstacle1.png");
  o2= loadImage("obstacle2.png");
  o3= loadImage("obstacle3.png");
  o4= loadImage("obstacle4.png");
  o5= loadImage("obstacle5.png");
  o6= loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,80,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(300,110,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
}


function draw() {
  background(255);
  
  if(gameState === PLAY){
    ground.velocityX = -6;
    //scoring
    count = count + Math.round(getFrameRate()/30);
    if(keyDown("space") && trex.y >= 161.5) {
      trex.velocityY = -10;
    }
    console.log(trex.y);
    trex.velocityY = trex.velocityY + 0.8;

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds();
    spawnObstacles();
    if(trex.isTouching(ObstaclesGroup)){
      gameState = END;
    }
  }
  
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addAnimation(trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
  }
  if(mousePressedOver(restart)){
   reset(); 
  }
   
  text("Score: "+ count, 500, 50);
  
  
  trex.collide(invisibleGround);
  
  drawSprites(); 
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    CloudsGroup.add(cloud);
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
  function spawnObstacles(){
  if (frameCount % 60 === 0){
  var obstacles = createSprite(600,170,20,20);
   obstacles.scale = 0.7;
   obstacles.lifetime = 234;
  var rand=Math.round(random(1,6));
   obstacles.velocity.x = -3;
    switch(rand){
      case 1: obstacles.addImage(o1);
        break;
      case 2: obstacles.addImage(o2);
        break;
      case 3: obstacles.addImage(o3);
        break;
      case 4: obstacles.addImage(o4);
        break;
      case 5: obstacles.addImage(o5);
        break;
      case 6: obstacles.addImage(o6);
        break;
      default:break;
    }
  ObstaclesGroup.add(obstacles);
  } 
  }
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.addAnimation(trex_running);
  
  count = 0;
  
}
  