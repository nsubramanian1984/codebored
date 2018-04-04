   (function() {
       'use strict';

       let utilPrime = require("./../lib/prime.js");

       let count = 1;
       let temp = -1;
       let currPrime = 2;

       while (count <= 10001) {
           if (count === 10001)
               console.log(currPrime);

           temp = utilPrime.getFirstPrimeAfter(currPrime);
           currPrime = temp;

           count++;
       }

   })();