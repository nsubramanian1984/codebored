
'use strict';

var fs = require('fs');

var lineNumber = 1;
var arr;

var values;

var n, k, q;
var queries = [];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {

    if(lineNumber === 1) {
        arr = line.split(' ');
        n = Number(arr[0]);
        k = Number(arr[1]);
        q = Number(arr[2]);
        }
    else if(lineNumber === 2) {
        values = line.split(' ');
        values = values.map(Number);
    }
    else {
        queries.push(Number(line));
    }

    lineNumber++;

  });

var count = 0;

while(count < k) {
    // let myshifted = values.shift();
    // values.push(myshifted);

    let shift = values.splice(n - 1, 1);
    values = shift.concat(values);

    count++;
}


count = 0;
while(count < q) {
    console.log(values[queries[count]]);
    count++;
}
