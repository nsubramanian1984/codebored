(function() {

    function sum(numbers) {
        var sum = 0;
        for(var i = 0 ; i < numbers.length; i++)
            sum += numbers[i];

        return sum;
    }


    function StairCase(n) {
        'use strict';

        var str = '';

        for(var k = 1; k <= n; k++) {

            var i = 0;
            for(; i < (n-k); i++)
                str += ' ';

            for(var j = i; j < n; j++)
                str += '#';

            console.log(str);
            str = '';
        }
    }

    var n;
    if(process.argv && process.argv.length > 2)
        n = process.argv[2];
    else
        return;

    StairCase(n);

}) ();