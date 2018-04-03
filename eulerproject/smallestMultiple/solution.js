(function() {
    'use strict';

    // Find all the primes from 1 to 20, and also the prime factors
    // of the composite numbers between 1 to 20.

    // We multiply all the numbers to find the smallest number that is
    // divisible by 1 to 20.


    function getList(maxValue) {
        let arr = [];

        for (let index = 1; index <= maxValue; index++)
            arr.push(index);

        return arr;
    }

    function isPrime(value) {
        let flag = true;

        for (let min = 2; min <= Math.sqrt(value); min++) {
            let divisor = Math.floor(value / min);

            // temp is not a prime.
            // if it could be divisible by a number within the range 2 to sqrt(number).
            if (divisor * min === value) {
                flag = false;
                break;
            }
        }

        return flag;
    }

    function findPrimes(maxValue) {
        let listofNumbers = getList(maxValue);
        let primes = [];
        let flag = true;

        for (let index = 0; index < listofNumbers.length; index++) {

            let temp = listofNumbers[index];

            if (temp === 2 || temp === 3 || temp === 5) {
                primes.push(temp);
                continue;
            }

            flag = isPrime(temp);

            if (flag)
                primes.push(temp);
        }

        return primes;
    }

    function getFirstPrimeAfter(value) {

        let prime = -1;
        while (true) {
            if (isPrime(++value)) {
                prime = value;
                break;
            }
        }
        return prime;
    }

    function findPrimeFactors(value) {
        // find prime factor of a given number.

        let remainder = -1;
        let divisor = -1;
        let primeFactorsArray = [];

        if (isPrime(value)) {
            primeFactorsArray.push(value);
            return primeFactorsArray;
        }

        let primeFactor = 2;

        let isLastDivisorPrime = false;

        while (!isLastDivisorPrime) {

            divisor = Math.floor(value / primeFactor);
            if (divisor * primeFactor === value) {
                primeFactorsArray.push(primeFactor);
                value = divisor;
            } else {
                if (isPrime(value)) {
                    primeFactorsArray.push(value);
                    isLastDivisorPrime = true;
                    break;
                }

                primeFactor = getFirstPrimeAfter(primeFactor);
            }
        }

        return primeFactorsArray;
    }

    function getNumberOfOccurrences(list, value) {
        let occur = 0;

        list.forEach(elem => {
            if (elem === value)
                ++occur;
        });

        return occur;
    }

    const NUMBER = 20;
    // let primes = findPrimes(NUMBER);

    // console.log(primes);

    let theList = [];

    for (let min = 2; min <= NUMBER; min++) {

        let primeFactorsArray = findPrimeFactors(min);
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