(function() {
    'use strict';


    function getNumberOfOccurrences(list, value) {
        let occur = 0;

        list.forEach(elem => {
            if (elem === value)
                ++occur;
        });

        return occur;
    }

    // Find all the primes from 1 to 20, and also the prime factors
    // of the composite numbers between 1 to 20.

    // We multiply all the numbers to find the smallest number that is
    // divisible by 1 to 20.

    let utilPrime = require("./../lib/prime.js");

    const NUMBER = 20;

    let theList = [];

    for (let min = 2; min <= NUMBER; min++) {

        let primeFactorsArray = utilPrime.findPrimeFactors(min);
        // console.log(min + " " + primeFactorsArray);

        for (let index = 0; index < primeFactorsArray.length; index++) {
            if (theList !== null && theList.join() === "") {
                primeFactorsArray.forEach((elem) => {
                    theList.push(elem)
                });

                break;
            }

            if (theList.includes(primeFactorsArray[index])) {
                let numOccurPrimeinPrimeFactors = getNumberOfOccurrences(primeFactorsArray, primeFactorsArray[index]);
                let numOccurInTheList = getNumberOfOccurrences(theList, primeFactorsArray[index]);

                if (numOccurInTheList === numOccurPrimeinPrimeFactors)
                    continue;
                else {
                    let diff = numOccurPrimeinPrimeFactors - numOccurInTheList;

                    if (diff > 0) {

                        while (diff > 0) {
                            theList.push(primeFactorsArray[index]);
                            theList = theList.sort();
                            --diff;
                        }

                        // skip to the next prime factor but we dont skip too far.
                        // end of for loop, increments index by 1.
                        index += numOccurPrimeinPrimeFactors - 1;
                    } else
                        continue;
                }

            } else {
                theList.push(primeFactorsArray[index]);
                theList = theList.sort();
            }
        }
    }

    // console.log(theList);

    let smallestNumber = 1;

    theList.forEach((elem) => {
        smallestNumber *= elem;
    });
    console.log(smallestNumber);

})();