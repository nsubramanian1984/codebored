(function() {
    'use strict';

    let utilPrime = require("./../lib/prime.js");

    const VALUE = 2000000; // 2 million

    let primeNumbers = utilPrime.findPrimes(VALUE);

    const reducer = (prev, curr) => prev + curr;
    if (primeNumbers !== null) {
        console.log(primeNumbers.reduce(reducer));
    }

})();