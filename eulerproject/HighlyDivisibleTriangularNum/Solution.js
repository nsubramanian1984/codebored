(function() {
    'use strict';

    // Load prime.js for checking primality.
    let utilPrime = require("./../lib/prime.js");

    //use memoization
    let sum = {};
    function summation(n) {
        let value;

        if (n in sum)
            value = sum[n];
        else {
            if (n == 0 || n == 1)
                value = n;
            else
                value = n + summation(n - 1);

            sum[n] = value;
        }

        return value;
    }

    function findFactors(value) {
        let findPrimeFactors = utilPrime.findPrimeFactors(value);

        let allFactors = [1];
        findPrimeFactors.forEach((elm) => {
            if (!allFactors.includes(elm))
                allFactors.push(elm);
        });


        return allFactors;
    }

    let start = 1;

    while(true) {
    	let value = summation(start);
    	let factors = findFactors(value);
    	console.log("(" + start + ") " + value + ": " + factors);

    	if(factors.length > 500) {
    		break;
    	}

    	start++;
    }

})();