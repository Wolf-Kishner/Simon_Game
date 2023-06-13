
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedpattern=[];
var level=0;
var hasStarted=false;

$(document).keydown(function(){
    
  if(!hasStarted)
  {
      $("#level-title").text("Level " + level);
      nextsequence();
      hasStarted=true;
  }

})

$(".btn").click(function(event){

  var userChosenColour=event.target.id;
  userClickedpattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Index of the last element
  checkAnswer(userClickedpattern.length-1);

});


function nextsequence()
{   
   userClickedpattern=[];
   level++;
   $("h1").text("Level "+level);
   
   var randomNumber=  Math.floor(4*Math.random());
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
 
   $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   
   var audio=new Audio("sounds/" +randomChosenColour + ".mp3")
   audio.play();
  
   $("h1").text("Level "+level);

}


function playSound(name){

    var audio=new Audio("sounds/" +name + ".mp3")
    audio.play(); 

  }

  
  function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");
    
      setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
     },100)

  }
  
  function checkAnswer(currentLevel){

     if(gamePattern[currentLevel]===userClickedpattern[currentLevel])
     {

      console.log("success");
      if(userClickedpattern.length===gamePattern.length)
      {
       setTimeout(function(){
        nextsequence(); 
       },1000)
      }

     }

    else{
      
      var audio=new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      $("h1").text("Game over, Press any key to restart");

      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      startOver();
     }


  }

  function startOver(){

    hasStarted=false;
    level=0;
    gamePattern=[];

  }