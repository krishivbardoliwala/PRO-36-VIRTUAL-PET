var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var num =50;
//create feed and lastFed variable here
var feed;
var lastFed;
var feedTime;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  lastFed=database.ref('FeedTime');
  lastFed.on("value",readFeedTime);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  

  //create feed the dog button here
  
  Feedthedog=createButton("Feed the dog");
  Feedthedog.position(800,95);
  Feedthedog.mousePressed(feedtheDogs);


  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);
  

}

function draw() {
  background(46,139,87);

  foodObj.display();

  //write code to read fedtime value from the database 
  lastFed = foodObj.getFedTime()

  //write code to display text lastFed time here
  if(lastFed >= 12){
   //show time in PM format when lastFed is greater than 12
   fill("black")
   text("Last feed : " + lastFed + " PM",350,30)
   
   
  }else if(lastFed == 0){ 
    fill("black")
    text("Last feed : 12 AM",350,30)
    
  }else{
    //show time in AM format when lastFed is greater than 12
    fill("black")
    text("Last feed : " + lastFed + " AM",350,30)
    
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to read feed Time
function readFeedTime(data){
  foodT= data.val();
  foodObj.updateFeedTime(foodT);
}


function feedDog(){
  dog.addImage(happyDog);
 

  //write code here to update food stock and last fed time
  var food_stock_val=foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  //var feed_time=feedtime.getFedTime();
}

//function to add food in stock
function addFoods(){
  if(foodS < 50){
    foodS++;
  
    database.ref('/').update({
      Food:foodS
    })
   
  }
  
}
//function to feed the dog in stock
function feedtheDogs(){
  foodS--;
  database.ref('/').update({
    Food:foodS,
    FeedTime : hour()
  })
    dog.addImage(happyDog);
  
}
