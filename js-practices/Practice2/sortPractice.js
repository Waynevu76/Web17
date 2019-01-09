'use strict'

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

module.exports = sort
