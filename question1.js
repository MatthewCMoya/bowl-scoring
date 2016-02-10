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
    data += ' Reported!';
    cb(null, data);
  }
  
var myBuildApp = (function(Build, Execute, Report){

    //run in correct order
    //console.log the result of running all three
    return {
      runReport : function(string, reportingFunc){
        
        Build(string, function(errors, builtString){
          
          Execute(builtString, function(errors, executedString){
            
            Report(executedString, function(errors, reportString){
              
              reportingFunc(errors, reportString);
              
            });
          })
        })
      }
    }
    
})(Build, Execute, Report);

/*global expect jasmine */


describe('myBuildApp', function(){
    it('should call reporting callback with correct string', function(){
        var reportingFunc = jasmine.createSpy();
        var string = 'apple';
        myBuildApp.runReport(string, reportingFunc);
        expect(reportingFunc).toHaveBeenCalledWith(null, string + ' Built! Executed! Reported!');
    });
});

