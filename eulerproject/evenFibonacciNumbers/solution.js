(function () {

    'use strict';

    let sum = 0, fibSum = 1, temp = 0;
    const LIMIT = 4000000; // 4 million

    for (let val = 1; fibSum <= LIMIT;) {
        // find remainder.
        let factor = Math.floor(fibSum / 2);
        if (factor * 2 === fibSum) {
            sum += fibSum;
        }

        temp = fibSum + val;

        val = fibSum;
        fibSum = temp;
    }
    console.log("even sum: " + sum);
})();