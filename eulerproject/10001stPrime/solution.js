   (function() {
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

        let count = 1;
        let temp = -1;
        let currPrime = 2;

        while(count <= 10001) {
            console.log(currPrime + " " + count);
        
            temp = getFirstPrimeAfter(currPrime);
            currPrime = temp;
             
            count++;
        }
        
   })();