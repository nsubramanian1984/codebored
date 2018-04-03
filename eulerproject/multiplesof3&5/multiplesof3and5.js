(function () {
    'use strict';

    let sum = 0;

    for (let num = 3; num < 1000; num++) {

        let factor = Math.floor((num / 3));
        let remainder = (factor * 3) - num;

        if (remainder === 0) {
            sum += num;
            continue;
        }

        factor = Math.floor((num / 5));
        remainder = (factor * 5) - num;

        if (remainder === 0) {
            sum += num;
        }
    }

    console.log(sum);

})();