(function() {

    'use strict';

    let utilPrime = require("./../lib/prime.js");
    const VALUE = 600851475143;
    let primeFactors = utilPrime.findPrimeFactors(VALUE);

    console.log(primeFactors[primeFactors.length - 1]);
})();