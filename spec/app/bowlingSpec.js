/*global expect*/

describe("Attempt", function() {
  var game;

  beforeEach(function(){
    game = require('../../app/Attempt');
    game.clearRolls();
  });

  describe("roll", function(){
    it("adds roll to rolls array", function() {
      game.roll(10);
      game.roll(2);
      expect(game.getRolls()).toEqual([10, 2]);
    });

    it("dissallow rolling too many times", function() {
      for(var i=0;i<11;i++){
        game.roll(10); // roll 11 strikes
      }
      expect( function(){ game.roll(10); } ).toThrow(new Error("Game Over"))
      expect(game.score()).toEqual(300);
    });
  });


  describe("score", function(){
    it("returns 0 by default", function() {
      expect(game.score()).toEqual(0);
    });

    it("adds basic rolls together", function() {
      game.roll(8);
      game.roll(1);
      expect(game.score()).toEqual(9);
    });

    it("strike adds next two rolls to current roll", function() {
      game.roll(10);
      game.roll(2);
      game.roll(2);
      expect(game.score()).toEqual(18);
    });

    describe("spare", function(){
      it("does not label adjasent frame rolls as spares", function() {
        game.roll(1); //frame 1
        game.roll(2); //frame 1
        game.roll(8); //frame 2<-- NOT A SPARE!
        game.roll(1); // now 12
        expect(game.score()).toEqual(12);
      });

      it("adds ONE next roll", function() {
        game.roll(7);
        game.roll(3); //<-- SPARE!
        game.roll(2); // total should be 14
        game.roll(2); // now 16
        expect(game.score()).toEqual(16);
      });
    });

    it("calculates spares and strikes together", function(){
      game.roll(7);
      game.roll(3); // SPARE
      game.roll(10); // STRIKE (40 at this point)
      game.roll(5);
      game.roll(5); // SPARE (51)
      game.roll(1);
      game.roll(1); // end all streaks
      expect(game.score()).toEqual(53);
    });

    describe("when in the 10th frame", function(){
      beforeEach(function(){
        for(var i=0;i<18;i++){game.roll(0);} // roll 9 frames at Deans skill level.
      });

      it("and we cant make 10 in 2 rolls, we dont get a 3rd attempt", function(){
        game.roll(1);
        game.roll(1);
        expect( function(){ game.roll(1); } ).toThrow(new Error("Game Over"));
      });

      xit("when we DO make 10 in 2 rolls (spare), we DO get a 3rd attempt", function(){
        game.roll(5);
        game.roll(5);
        expect( function(){ game.roll(1); } ).not.toThrow(new Error("Game Over"));
      });

      xit("when we make 10 in 1 roll, we get a 3rd attempt", function(){
        game.roll(10);
        game.roll(5);
        expect( function(){ game.roll(1); } ).not.toThrow(new Error("Game Over"));
      });
    });



    describe("perfect game", function(){
      it('returns 300', function(){
        for(var i=0;i<11;i++){
          game.roll(10); // roll 11 strikes.
        }
        expect(game.score()).toEqual(300);
      });
    });

    describe("worst game possible", function(){
      it('returns 0', function(){
        for(var i=0;i<10;i++){
          game.roll(0); // roll 10 gutters.
        }
        expect(game.score()).toEqual(0);
      });
    });
  });
});
