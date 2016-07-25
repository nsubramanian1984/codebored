(function() {

    'use strict';
    //Sample code to read in test cases:
    let fs  = require("fs");

    fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
        if (line !== "") {

            let re = /(\d+)\s(\d+)\s(\d+)/;
            line.match(re);

            let fizz = RegExp.$1, buzz = RegExp.$2, n = RegExp.$3;

            let count = 1, fizzbuzz = 0, result = '';

            while(count <= n) {
                if((count - parseInt(count/fizz) * fizz) === 0)
                    fizzbuzz += 1;

                if((count - parseInt(count/buzz) * buzz) === 0)
                    fizzbuzz += 2;

                if(fizzbuzz === 3)
                    result += ' FB';
                else if(fizzbuzz === 2)
                    result += ' B';
                else if(fizzbuzz === 1)
                    result += ' F';
                else
                    result += ' ' + String(count);

                fizzbuzz = 0; // reset

                count++;
            }

            console.log(result.trim());

        }
    });


})();