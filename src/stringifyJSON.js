// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
// check if it's an array or object
// integers, booleans, undefined-> undefined, null -> "null", strings, function -> undefined (unless inside an array, then null)
// keys are always strings in objects

var stringifyJSON = function(obj) {
 
  if (typeof obj === "boolean" || typeof obj === "number" || obj === null) {
    return "" + obj;
    
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
    
  } else if (Array.isArray(obj)) {
      var resultArr = [];
      obj.forEach(i => {
        if (typeof i === "function" || i === undefined || typeof i === 'symbol') {
          resultArr.push("null");
        } else {
          resultArr.push(stringifyJSON(i));
        }
      });  
    return '[' + resultArr + ']';
    
  } else if (typeof obj === "object") {
    var resultObj = [];
    for (var key in obj) {
      if (typeof obj[key] === 'boolean' || typeof obj[key] === 'number' || 
          typeof obj[key] === 'string' || typeof obj[key] === 'object') {
        var objKey = '"' + key + '"' + ':';
        resultObj.push(objKey + stringifyJSON(obj[key]));
      } 
    } 
    return "{" + resultObj + "}"; 
  }
  
};
