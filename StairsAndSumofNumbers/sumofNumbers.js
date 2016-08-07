
(function() {
    'use strict';

    function sum(numbers) {
        return numbers.reduce(function(prev, curr, index, array) {
                return prev + curr;
            });
    }

    var fs = require('fs');

    var lineNumber = 1;
    var n = 0;
    var numbers = [];

    fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {

        if(line !== ""  && lineNumber === 1) {
            let re = /^(\d+)$/;
            line.match(re);

            n = Number(RegExp.$1);
        }
        else if(line !== "") {
            let re = /^(\d+)$/;
            line.match(re);

            numbers.push(Number(RegExp.$1));
        }

        lineNumber +=1;

    });

    console.log(sum(numbers));

})();
