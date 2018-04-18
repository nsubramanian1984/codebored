(function () {

    'use strict';

    let utilPrime = require("./../lib/prime.js");

    let num = utilPrime.distinctPrimeFactors(4);
    console.log(num);
})();