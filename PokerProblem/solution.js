(function () {
    "use strict";

    function determineHands(cardsDrawn) {
        function rank(input) {
            if (input === 'T')
                return '10';
            else if (input === 'J')
                return '11';
            else if (input === 'Q')
                return '12';
            else if (input === 'K')
                return '13';
            else if (input === 'A')
                return '14';
            else
                return '0' + input;
        }

        function suit(input) {
            if (input === 'S')
                return '1';
            else if (input === 'C')
                return '2';
            else if (input === 'H')
                return '3';
            else if (input === 'D')
                return '4';
        }

        let resultStr = "";

        for (let i = 0; i < 2; i++) {
            let result = [];
            cardsDrawn[i].map((elm, index) => {
                result.push(rank(elm.substr(0, 1)));
            });


            result = result.sort();
            //create tuple of ranks
            var rankTuple = [];
            result.forEach(function (elem, index) {
                if (!rankTuple.includes(elem))
                    rankTuple.push(elem);
            });

            if (rankTuple.length === 2) {
                // might be a full house or four of a kind
                if (i === 0)
                    resultStr = "Left hand: ";
                else
                    resultStr += ", Right hand: ";

                resultStr += "Full house or four of a kind.";
            } else if (rankTuple.length === 3) {
                // might be a three of a kind or two pairs

                if (i === 0)
                    resultStr = "Left hand: ";
                else
                    resultStr += ", Right hand: ";

                resultStr += "Three of a kind or two pairs";

            } else if (rankTuple.length === 4) {

                if (i === 0)
                    resultStr = "Left hand: ";
                else
                    resultStr += ", Right hand: ";

                    resultStr += "A pair";
            } else {
                // dig thru the cards to see what we have got
                // Royal flush, straight flush, flush, straight, high card
                if (i === 0)
                    resultStr = "Left hand: ";
                else
                    resultStr += ", Right hand: ";

                    resultStr += "Royal flush/Straight flush/Flush/Straight/High card";
            }
        }
        console.log(resultStr);
    }

    //Sample code to read in test cases:
    let fs = require("fs");

    fs.readFileSync("./poker.txt").toString().split('\n').forEach(function (line) {
        if (line !== "") {
            //console.log(line);
            // console.log(line);
            let cardsDrawn = [];
            let list = line.split(" ");
            let leftHand = [], rightHand = [];
            let index = 0;

            for (; index < 5; index++)
                leftHand.push(list[index]);

            for (; index < 10; index++)
                rightHand.push(list[index]);

            cardsDrawn.push(leftHand);
            cardsDrawn.push(rightHand);

            determineHands(cardsDrawn);
        }
    });

})();