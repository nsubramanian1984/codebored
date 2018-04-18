(function () {

    'use strict';

    const DISTINCT_COUNT = 3;

    let utilPrime = require("./../lib/prime.js");
    let num = [2, 3];

    for (let idx = 0; idx < DISTINCT_COUNT; idx++) {
        num = utilPrime.distinctPrimeFactors(DISTINCT_COUNT, num[1]);
        console.log(num);
    }

})();