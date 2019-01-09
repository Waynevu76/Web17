'use strict' 
function search(input, target) {
    for(var i=0; i<input.length; i++) {
        if (target == input[i]) {
            return i;
        }
    }
    return -1;
  }
  
function sort(input) {
    if (input.length < 1) {
        return input;
    }
    else {
        var left = [];
        var right = [];
        var newInput = [];
        var pivot = input.pop();
        var length = input.length;

        for (var i = 0; i < length; i++) {
            if (input[i] < pivot) {
                left.push(input[i]);
            } else {
                right.push(input[i]);
            }
        }
        return newInput.concat(sort(left), pivot, sort(right));
    }
}

function creatInput(value) {
    var array = [];
    for(var i = 0; i < value; i++){
      array[i] = Math.floor(Math.random()*20000) - 10000;
    }
    sort(array);
    return array;
  }
function generate(testArray){
    var testCase = [];
    for(var i = 0; i < testArray.length; i++){
        let randomNum = Math.floor(Math.random()*20000) - 10000;
        var array = creatInput(testArray[i]);
        var x = {
            input: array,
            target: randomNum, 
            output: search(array, randomNum)
      }
        testCase.push(x);
    }
}
module.exports = generate