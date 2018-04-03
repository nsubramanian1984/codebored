(function() {

    'use strict';

    const LIMIT = 100;

    let sumOfSquares = 0;

    let squareOftheSum = 0;

    for (let min = 1; min <= 100; min++) {
        sumOfSquares += min*min;

        squareOftheSum += min;
    }


    console.log(Math.abs(sumOfSquares - (squareOftheSum*squareOftheSum)));
})();