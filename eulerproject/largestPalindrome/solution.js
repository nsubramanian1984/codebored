(function() {

    'use strict';

    function evenOrOdd(num) {
        let rem = Math.floor(num / 2);

        if (rem * 2 === num)
            return "even";
        return "odd";
    }

    function reverse(v) {
        let firstHalf = v.substr(0, v.length / 2);
        let tempSecondHalf = v.substr(-(v.length / 2));
        let secondHalf = tempSecondHalf.split("").reverse().join("");


        if (firstHalf === secondHalf)
            return true;
        else
            return false;
    }


    const LIMIT = 100; // 4 million

    let maxPalin = 0;


    for (let num1 = 999; num1 >= 100; num1--) {

        for (let num2 = 999; num2 >= 100; num2--) {
            let prod = num1 * num2;

            let prodStr = String(prod);

            if (reverse(prodStr)) {
                
                if (prod > maxPalin)
                    maxPalin = prod;
            }

        }
    }

    console.log("maxPalin: " + maxPalin);
})();