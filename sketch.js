var snowflakes=[]
var timer=60;
var score=0;
var ground,bground,invisibleGround;
var candyGroup,giftGroup;
var gameState ="play"
function preload() {
  bg=loadImage("snowground.png");
  groundImage=loadImage("Images/ground2.png");

  santaImg=loadAnimation("santa1.png","santa2.png","santa3.png","santa4.png");
  candyImg= loadImage("Images/candy.png");
 giftImg= loadImage("gift.png");
 happysantaImg=loadImage("happysanta.png");


}
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bground = createSprite(windowWidth/2, windowHeight, windowWidth, windowHeight);
  bground.addImage("ground", bg);
  //bground.x = bground.width / 2;
  bground.scale=2;
  ground = createSprite(windowWidth/2, windowHeight - 20,width, 20);
  ground.addImage("ground", groundImage);
  ground.visible = false;
  


  //console.log(ground.width / 2);
  ground.x = ground.width / 2;
  invisibleGround = createSprite(
    ground.width / 2,
    windowHeight - 20,
    ground.width,
    10
  );
  invisibleGround.visible = false;
  //edges= createEdgeSprites();
  santa = createSprite(windowWidth/2-300,windowHeight-50,50,50);
  santa.addAnimation("running",santaImg);
  santa.scale=1.2;
  //santa.debug=true;
  santa.setCollider("rectangle",0,0,100,santa.height-35);
  for(var i=0;i<15;i++){
    snowflakes.push(new SnowFlakes())
  }
  candyGroup = new  Group();
  giftGroup= new Group();
}
function draw() {
 //background(bground);
 if(gameState === "play"){
  camera.x = santa.x;
  camera.y = santa.y;
 
  //gameOver.position.x = restart.position.x = camera.x
   bground.velocityX=-2;
   if(bground.x<0){
     bground.x=bground.width/2;
   }
   ground.velocityX=-4;
   if(ground.x<0){
     ground.x=ground.width/2;
   }
   ground.velocityX=-2;
   if(keyDown("space")){
     santa.velocityY=-12;
   }
   santa.velocityY=santa.velocityY+0.5;
   //camera.position.x= santa.x;
   santa.collide(ground);
   spawnCandy();
   spawnGift();
   
     for(var i=0;i<candyGroup.length;i++){ 
       if(santa.isTouching(candyGroup.get(i))){
         score=score+5;
         candyGroup.get(i).remove();
         candyGroup.destroyEach();
       }
     }
     if(giftGroup.isTouching(santa)){
       santa.addImage(happysantaImg);
    // giftGroup.get(j).remove();
     giftGroup.destroyEach();
     score = score+10;
     //santa.scale=1.9;
     
   }
   if(timer< 0 ){
     gameState = "end";
   }
 }
 else if(gameState === "end"){
  ground.velocityX = 0;
  santa.velocityY = 0;
  gameOver.visible = true;
  restart.visible = true;
  
 candyGroup.setVelocityXEach(0);
giftGroup.setVelocityXEach(0);
candyGroup.setLifetimeEach(-1);
giftGroup.setLifetimeEach(-1);
if(mousePressedOver(restart)) {
  reset();
}
 }
 
  
     
 
  drawSprites();
  
  for(var i =0;i<snowflakes.length;i++){
    snowflakes[i].display();
    snowflakes[i].update();
  }
  timer=timer-0.05;
  textSize(30);
  fill("blue");
  text("TIME REMAINING:"+Math.round(timer),width/4-500,350);
  text("SCORE:"+score,width/4-500,300);
  
}
function reset(){
  gameState ="play";
  gameOver.visible = false;
  restart.visible = false;
  
 candyGroup.destroyEach();
 giftGroup.destroyEach();  
  score = 0;
  
}
function spawnCandy(){
  if(frameCount% 180 === 0){
    var candy= createSprite(camera.x+width/2,windowHeight/2,20,20);
    candy.addImage(candyImg);
    candy.velocityX=-3;
    candy.scale=0.1;
    candy.lifetime=700;
    candyGroup.add(candy);
    //candy.debug=true;

  }
}
function spawnGift(){
  if(frameCount% 260 === 0){
    var gift= createSprite(camera.x+width/2,windowHeight-50,20,20);
    gift.addImage(giftImg);
    gift.velocityX=-3;
  gift.scale=0.5;
    gift.lifetime=700;
   giftGroup.add(gift);
    //candy.debug=true;

  }
}
