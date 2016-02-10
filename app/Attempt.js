var _ = require('lodash');

var Game = (function(_){
  "use strict";
  
  // private member variables.
  var rolls = [];
  var frame = 1;
  var frameFraction = 1/2; // two rolls per frame
  
  // Private methods
  function isWholeNumber(number){
    return number % 1 === 0;
  }
  
  function scoreFromFrame(n){ // a "nil safe" getter method for the score of a given frame.
    return (typeof rolls[n] !== 'undefined' && rolls[n]) ? rolls[n] : 0;
  }
  
  function incrementFrame(pins){ // "Frame" increments by 0.5 per roll, with a math.ceil on strike.
    frame += frameFraction;
    if(pins === 10 && !isWholeNumber(frame)){
      if(frame < 10){ // never do this on the 10th frame!
        frame = Math.ceil(frame); // frame over!
      }
    }
  }
  
  // Public methods
  return {
    roll: function(pins){
      if(frame < 11){ // when game is not over
        rolls.push(pins); //add score to score array
        incrementFrame(pins); // inc "frame" with appropriate fraction.
        return true; // avoid superflous "else" statement
      }
      throw new Error("Game Over"); // You can't roll anymore!
    },
    
    getRolls: function(){ // Getter method for rolls (we use this for testing)
      return rolls;
    },
    
    clearRolls: function(){ // Reset method, used in tests.
      rolls = []; //duplication here. TODO: D.R.Y. this out.
      frame = 1;  //duplication here. TODO: D.R.Y. this out.
    },
    
    getFrame: function(){
      return frame;
    },
    
    
    score: function(){
      var score = 0;
      var scoreFrame = 1; //config? TODO: D.R.Y. this out.
      
      _.forEach(rolls, function(pins, i){
        score += pins; // add score no matter what
        scoreFrame += frameFraction; 
        
        if (pins === 10 && !isWholeNumber(scoreFrame)){ // STRIKE!
          score += scoreFromFrame(i+1); // safely add next frame to score.
          score += scoreFromFrame(i+2); // safely add 2nd frame ahead to score.
          scoreFrame += frameFraction; // frame is over (no spares possible).
        }
        
        if(pins + scoreFromFrame(i+1) === 10  && !isWholeNumber(scoreFrame)){ // SPARE!
          score += scoreFromFrame(i+2); // The "2" here is the unintuitive bit. ;)
        }
      });
      return score;
    }
  };
})(_);

module.exports = Game;