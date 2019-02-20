// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  //json is a string type
  // looking at the blogpost provided here: https://medium.com/@Mordoc/a-recursive-descent-parser-for-json-a6d68ab938ac
    
  // if (json[0] === "{") {
  //   parseObj(json);
  // }
  
  if (json[0] === "[" && json[json.length-1] === "]") {
    parseArray(json);
  } 
  
  // parseValue(json);

};


// //helper fct 
  var parseObj = function(json){
    //{}
    //{ members }
    var jsonMinusCurly = json.slice(1,json.length-1);
    if (json === "{}") {
      return {};
    }
    return {parseMembers(jsonMinusCurly)};
  };
  
  var parseMembers = function(members){
    //pair
    //pair, members
    if (Object.keys().length === 1) {
      return parsePair(members);
    }
    for (var key in members) {
      return parsePair(key, members[key]);
    } 
  };
  
  var parsePair = function(key, value){
    //string : value
    //is value a value or an array? call both
    if (Array.isArray(value)) {
      return key +":"+ parseArray(value); 
    }
    return key +":"+ parseValue(value);
  };
  
  var parseArray = function(json){
    //[]
    //[element]
    var jsonMinusBrackets = json.slice(1,json.length-1);
    if (json.length === 0) {
      return [];  
    } 
    return [parseElements(jsonMinusBrackets)];
    
  };
  
  var parseElements = function(minusB){
    //value 
    //value, elements
    var elementsArr = [];
    for (var kk = 0; kk < minusB.length; kk++ ) {
      if (typeof json[kk] === "object") {
        elementsArr.push(parseObj(minusB[kk]));
      }
      elementsArr.push(parseValue(minusB[kk]));
      
    }
    return elementsArr;
  };
  
  var parseValue = function(json){
      var ii = 0;
    if (json[0] === "\"") {
      return json;
    } else if(json[ii+3] && json[ii]==="t" && json[ii+1]==="r" && json[ii+2]==="u" && json[ii+3]==="e") {
      return true;    
    } else if (json[ii+4] && json[ii]==="f" && json[ii+1]==="a" && json[ii+2]==="l" && json[ii+3]==="s" && json[ii+4]==="e") {
      return false;
    } else if (json[ii+3] && json[ii]==="n" && json[ii+1]==="u" && json[ii+2]==="l" && json[ii+3]==="l") {
      return null;
    } else if (typeof json.slice(1, json.length-1) === "number") {
      return json.slice(1, json.length-1);
    }
  };
//   //booleans like true and false
//   //null
//   //undefined -- cannot parse undefined
//   //integers
//   //strings/characters must have \" before and after
//   //arrays
//   //objects, remember that all keys are strings, do not have quotation marks, and cannot be numbers
//   