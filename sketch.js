var dogimg,dog,happydog,database,foods,foodstock;
function preload()
{
	dogimg = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  //Dog
  dog = createSprite(width/2,height/2,50,50);
  dog.addImage(dogimg);
  dog.scale=0.3;
  
  foodstock = database.ref('food');
  foodstock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)&&foods > 1){
     writeStock(foods);
     dog.addImage(happydog);
  }
  drawSprites();
  textSize(20);
  fill(0,0,255);
  stroke(0);
  text("Press UP_ARROW key to feed milk",50,50);
  text("food remaining :"+foods,50,100);
}
// read values from DB
function readStock(data){
  foods = data.val();
}
// write values in DB
function writeStock(x){
  database.ref('/').update({
    food:x-1
  })
}

