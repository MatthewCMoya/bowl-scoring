// var _ = require('lodash');

// var Game = (function(_){
//   var currentFrame = 0;
//   var runningScore = 0;
//   var frames = [10, 10, 5];
//   var scoreFrames = [20, 15, 5];

//   return {
//     roll: function(pins){
//       frames.push(pins);
//     },
//     score: function(){
//       _.forEach(frames, function(i, frame){
        
//         // If it's a strike, take into account next 2 rolls in frames array
//         var isStrike = (frame === 10);
        
//         // If it's a spare, take into account next roll in the frames array
//         var isSpare = (frame + frames[i+1] === 10);
        
//         if (isStrike){
//           scoreFrames
          
//         }
//         if (isSpare){
//           streak += 1
//         }
        
        
//         //Everything else just increments score
//       })
//     }
//   } 
// })(_);