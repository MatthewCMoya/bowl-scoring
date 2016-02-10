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
  
  
var reportApp = (function(){
    
    
})();


/*global expect jasmine*/

describe('reportApp', function(){
  it('calls the reportFunc with the appropriate string', function(){
    var reportFunc = jasmine.createSpy();
    var string = 'orange';
    
    reportApp.reportFunc(string, reportFunc);
    expect(reportFunc).toHaveBeenCalledWith(null, string + ' Built! Executed! Reported!');
    
  })
})