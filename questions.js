// Call each of these functions in sequence.
// call console.log with the manipulated string
var Build = function(string, cb){
      string += ' Built!';
      cb(null, string);
  }

var Execute = function(data, cb){
    data += ' Executed!';
    cb(null, data);
  }
  
var Report = function(data, cb){
    cb(null, data);
  }
  
  
  
  
  
  
// Answer: Dean Shelton - 10min
var myThing = (function(Build, Execute, Report){
  return {
    execute : function(string, reportingFunction){
      Build(string, function(errors, data){
        Execute(data, function(errors, data){
          Report(data, function(errors, data){
            reportingFunction(errors, data);
          });
        });
      });
    }
  };
})(Build, Execute, Report);


/*global describe jasmine expect*/


// Proof: Dean Shelton - 5min
describe('myThing', function(){
  var string = 'banana';
  it('calls callback function with modified data', function(){
    var reportingCallback = jasmine.createSpy();
    myThing.execute(string, reportingCallback);
    expect(reportingCallback).toHaveBeenCalledWith(null, string + ' Built! Executed!');
  });
});