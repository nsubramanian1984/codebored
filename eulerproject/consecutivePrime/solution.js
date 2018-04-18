(function() {
    'use strict';

    const LIMIT = 1000000;

    let utilPrime = require("../lib/prime.js");
    let primeList = utilPrime.findPrimes(LIMIT);

    let sum = 0;
    let maxPrimeWithinLimit = -1;
    let maxLastKey = -1;

    for(let idx = 0; idx < primeList.length - 1; idx++)  {
        sum = primeList[idx];
        for(let jdx = idx + 1; jdx < primeList.length; jdx++) {

            sum += primeList[jdx];

            if(sum > LIMIT) {
                break;
            }

            if(utilPrime.isPrime(sum)) {
                if(sum > maxPrimeWithinLimit && (jdx - idx + 1) > maxLastKey) {
                    maxPrimeWithinLimit = sum;
                    maxLastKey = jdx - idx + 1;
                }
            }
        }
    }

    console.log(maxPrimeWithinLimit, maxLastKey);

})();