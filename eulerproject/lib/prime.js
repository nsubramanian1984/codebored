let libPrime = {
    isPrime: function isPrime(value) {
        let flag = true;

        if (value < 2)
            return false;

        for (let min = 2; min <= Math.sqrt(value); min++) {
            let divisor = Math.floor(value / min);

            if (divisor * min === value) {
                flag = false;
                break;
            }
        }

        return flag;
    },

    isEvenNumber: function (value) {
        let divisor = Math.floor(value / 2);

        if (divisor * 2 === value)
            return true;

        return false;
    },

    getFirstPrimeAfter: function getFirstPrimeAfter(value) {

        let that = this;
        let prime = -1;

        while (true) {
            ++value;

            if (!that.isEvenNumber(value) && that.isPrime(value)) {
                prime = value;
                break;
            }
        }
        return prime;
    },


    findPrimeFactors: function findPrimeFactors(value) {
        // find prime factors of a given number.

        let that = this;

        let remainder = -1;
        let divisor = -1;
        let primeFactorsArray = [];

        if (that.isPrime(value)) {
            primeFactorsArray.push(value);
            return primeFactorsArray;
        }

        let primeFactor = 2;

        let isLastDivisorPrime = false;

        while (!isLastDivisorPrime) {

            divisor = Math.floor(value / primeFactor);

            if (divisor === 1)
                break;

            if (divisor * primeFactor === value) {
                primeFactorsArray.push(primeFactor);
                value = divisor;
            } else {
                if (that.isPrime(value)) {
                    primeFactorsArray.push(value);
                    isLastDivisorPrime = true;
                    break;
                }

                primeFactor = that.getFirstPrimeAfter(primeFactor);
            }
        }

        return primeFactorsArray;
    },

    findPrimes: function findPrimes(maxValue) {

        function getList(maxValue) {
            let arr = [];

            for (let index = 2; index <= maxValue; index++)
                arr.push(index);

            return arr;
        }

        // Entry point

        if (maxValue <= 0)
            return null;

        let that = this;
        // Finds a list of prime numbers less than a given number.
        let listofNumbers = getList(maxValue);
        let primes = [];
        let flag = true;

        for (let index = 0; index < listofNumbers.length; index++) {

            let temp = listofNumbers[index];

            if (temp === 2 || temp === 3 || temp === 5) {
                primes.push(temp);
                continue;
            }

            flag = that.isPrime(temp);

            if (flag)
                primes.push(temp);
        }

        return primes;
    }
};

module.exports = exports = libPrime;

(function () { // test case

    let value = 10;
    let flag = libPrime.isPrime(value);
    console.log("Is " + value + " prime? " + flag);

    let primes = libPrime.findPrimes(10);
    if ([2, 3, 5, 7].join('') === primes.join(''))
        console.log("findPrimes - Pass");
    else
        console.log("findPrimes - Fail");

    let primeFactors = libPrime.findPrimeFactors(144);
    if ([2, 2, 2, 2, 3].join('') === primeFactors.join(''))
        console.log("findPrimeFactors - Pass");
    else
        console.log("findPrimeFactors - Fail");

    let primeNext = libPrime.getFirstPrimeAfter(10000);
    if (libPrime.isPrime(primeNext))
        console.log("getFirstPrimeAfter - Pass");
    else
        console.log("getFirstPrimeAfter - Fail");
})();