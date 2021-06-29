var PLAY = 1;
var END =0;
var gameState = PLAY;

var boy,boy_running,boy_collided;
var background, invisiblebackGround, backgroundImage;

var birdGroup, birdImage;
var cactusGroup, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;

var score;
var gameOverImg,restartImg

var score;

function preload(){
 boy_running = loadAnimation("boy.jpg");
 boy_collided = loadAnimation("boy_collided.jpg");
 backgroundImage = loadImage("background.jpg");
            
 birdImage = loadImage("bird.png");
            
 cactus1 = loadImage("cactus1.jpg");
 cactus2 = loadImage("cactus2.jpg");
 cactus3 = loadImage("cactus3.jpg");
 cactus4 = loadImage("cactus4.jpg");
 cactus5 = loadImage("cactus5.jpg");
 cactus6 = loadImage("cactus6.jpg");
            
 restartImg = loadImage("restart.png")
 gameOverImg = loadImage("gameOver.png")
            
}

function setup() {
    createCanvas(600, 200);

    var message = "This is a message";
   console.log(message)
    
    boy = createSprite(50,160,20,50);
    boy.addAnimation("running", boy_running);
    boy.addAnimation("collided", boy_collided);
    
  
    boy.scale = 0.5;
    
    background = createSprite(200,180,400,20);
    background.addImage("background",backgroundImage);
    background.x = background.width /2;
    
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    
   
    gameOver.scale = 0.5;
    restart.scale = 0.5;
    
    background = createSprite(200,190,400,10);
    background.visible = false;
    
    //create Obstacle and Cloud Groups
    backgroundGroup = createGroup();
    birdGroup = createGroup();
  
    
    boy.setCollider("rectangle",0,0,trex.width,trex.height);
    boy.debug = true
    
    score = 0;
    
 
}

function draw() {
    background(180);
    //displaying score
    text("Score: "+ score, 500,50);
    
    
    if(gameState === PLAY){
  
      gameOver.visible = false;
      restart.visible = false;
      
      background.velocityX = -(4 + 3* score/100)
      //scoring
      score = score + Math.round(getFrameRate()/60);
      
      
      
      if (background.x < 0){
        background.x = background.width/2;
      }
      
      //jump when the space key is pressed
      if(keyDown("space")&& trex.y >= 100) {
          boy.velocityY = -12;
          
      }
      
      //add gravity
      boy.velocityY = boy.velocityY + 0.8
    
      //spawn the birds
      spawnClouds();
    
      //spawn cactus on the background
      spawncactus();
      
      if(cactusGroup.isTouching(boy)){
          //trex.velocityY = -12;
          
        
      }
      console.log("frameCount",frameCount)
      console.log("frameRate",getFrameRate())
    }
     else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       
       //change the trex animation
        boy.changeAnimation("collided", boy_collided);
      
       
       
        background.velocityX = 0;
        boy.velocityY = 0
        
       
        //set lifetime of the game objects so that they are never destroyed
      cactusgroup.setLifetimeEach(-1);
      birdgroup.setLifetimeEach(-1);
       
       cactusgroup.setVelocityXEach(0);
       birdgroup.setVelocityXEach(0);    
     }
    
   
    //stop boy from falling down
    boy.collide(invisibleGround);
    
    if(mousePressedOver(restart)) {
        reset();
      }
  
  
    drawSprites();
  }
  
  function reset(){
    gameState=PLAY
    gameOver.visible=false;
    restart.visible=false;
    cactusGroup.destroyEach();
    birdGroup.destroyEach();
    score=0;
    boy.changeAnimation("running",boy_running);
  
  }
  
  
  function spawncactus(){
   if (frameCount % 60 === 0){
     var cactus = createSprite(600,165,10,40);
     cactus.velocityX = -(6 + score/100);
     
      //generate random obstacles
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: cactuys.addImage(cactus1);
                break;
        case 2: cactus.addImage(cactus2);
                break;
        case 3: cactus.addImage(cactus3);
                break;
        case 4: cactus.addImage(cactus4);
                break;
        case 5: cactus.addImage(cactus5);
                break;
        case 6: cactus.addImage(cactus6);
                break;
        default: break;
      }
     
      //assign scale and lifetime to the obstacle           
      cactus.scale = 0.5;
      cactus.lifetime = 300;
     
     //add each obstacle to the group
      cactusGroup.add(cactus);
   }
  }
  
  function spawnbird() {
    //write code here to spawn the birds
    if (frameCount % 60 === 0) {
      var bird = createSprite(600,120,40,10);
      bird.y = Math.round(random(80,120));
      bird.addImage(birdImage);
      bird.scale = 0.5;
      bird.velocityX = -3;
      
      //assign lifetime to the variable
      bird.lifetime = 200;
     
      //adjust the depth
      bird.depth = boy.depth;
      boy.depth = boy.depth + 1;
      
      //add each cloud to the group
      birdGroup.add(bird);
    }
}