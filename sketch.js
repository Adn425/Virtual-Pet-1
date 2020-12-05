var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
  dogImage = loadImage("Images/dogImg.png");
  happyDogImage = loadImage("Images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImage);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() { 
  background(46,139,87);
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  drawSprites();
  fill(255,255,254);
  textSize(16)
  stroke("black");
  text("Food remaining : "+ foodS, 180, 100);
  textSize(18);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 50, 50);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}