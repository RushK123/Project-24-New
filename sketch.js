const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope, fruitLink, fruit, fruitOptions;
var backgroundImg, rabbitImg, melonImg, rabbit, sadAnimation, blinkAnimation, eatAnimation;
var cutButton;

function preload(){
  backgroundImg = loadImage("background.png");
  rabbitImg = loadImage("Rabbit-01.png");
  melonImg = loadImage("melon.png");
  sadAnimation = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  blinkAnimation = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eatAnimation = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png");
  blinkAnimation.playing = true;
  sadAnimation.playing = true;
  eatAnimation.playing = true;
  blinkAnimation.framedelay = 20;
  sadAnimation.framedelay = 20;
  eatAnimation.framedelay = 10;
  eatAnimation.looping = false;
  sadAnimation.looping = false;
}



function setup() 
{
  createCanvas(500,700);
  //frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(6,{x:250, y:30})
  textSize(50);

  fruitOptions = {
    density : 0.001 
  }
  fruit = Bodies.circle(300, 300, 15,fruitOptions);
  Composite.add(rope.body,fruit);
  fruitLink = new Link(rope,fruit);

  rabbit = createSprite(250, 640, 10, 10);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.1;

  cutButton = createImg("cut_btn.png");
  cutButton.position(250, 30);
  cutButton.size(50,50);
  cutButton.mouseClicked(drop);

  rabbit.addAnimation("eat", eatAnimation);
  rabbit.addAnimation("sad", sadAnimation);
  rabbit.addAnimation("blink", blinkAnimation);
  rabbit.changeAnimation("blink");




}




function draw() 
{
  background(backgroundImg);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  Engine.update(engine);

  ground.show();
  rope.show();

  if (fruit != null){
    image(melonImg,fruit.position.x, fruit.position.y,60,60);
  }

  

  if (collide(fruit, rabbit)){
    rabbit.changeAnimation("eat"); 
  }
  if (collide(fruit, ground.body)){
    rabbit.changeAnimation("sad");
  }
    
  drawSprites();
 
   
}

function drop(){
  rope.break();
  fruitLink.detached();
  fruitLink = null;
  

}

function collide(body, sprite){
  if (body!==null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80){
      World.remove(world, fruit);
      fruit= null;
      return true;
    }else{
      return false;
    }
  }
}
