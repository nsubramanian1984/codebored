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

        function count(value, list) {
            let occur = 0;

            list.forEach(elem => {
                if (elem === value)
                    ++occur;
            });

            return occur;
        }

        function determineThreeOfaKind(tuple, list) {

            let highRank = -1;

            for (let elem of tuple) {
                let occurrences = count(elem, list);

                if (occurrences === 3) {

                    highRank = elem;
                    break;
                }
            }

            return highRank;

        }

        function determineAPair(tuple, list) {
            let highRank = -1;

            for (let elem of tuple) {
                let occurrences = count(elem, list);

                if (occurrences === 2) {
                    highRank = elem;
                    break;
                }
            }

            return highRank;
        }

        function determineTwoPairsHighRank(tuple, list) {
            let highRank = -1;

            for (let elem of tuple) {
                let occurrences = count(elem, list);

                if (occurrences === 2) {
                    if (highRank === -1)
                        highRank = elem;
                    else if (parseInt(highRank) < parseInt(elem))
                        highRank = elem;
                }
            }

            return highRank;
        }

        function determineWinner(left, right) {
            if (left.score < right.score)
                return "left";
            else if (left.score === right.score) {
                if (left.highrank === right.highrank)
                    return "none";
                else
                    return parseInt(left.highrank) > parseInt(right.highrank) ? "left" : "right";
            }
            else
                return "right";
        }


        let leftHandScore, rightHandScore;

        for (let i = 0; i < 2; i++) {
            let result = [];
            cardsDrawn[i].map((elm, index) => {
                result.push(rank(elm.substr(0, 1)));
            });

            result = result.sort();
            //console.log(result);

            //create tuple of ranks
            let rankTuple = [];
            result.forEach(function (elem, index) {
                if (!rankTuple.includes(elem))
                    rankTuple.push(elem);
            });

            //console.log(rankTuple);

            if (rankTuple.length === 2) {
                // might be a full house or four of a kind
                // there is a chance for three of a kind and a pair.
                // e.g: 8C 8S KC KH 8D

                if (i === 0)
                    leftHandScore = 4;
                else
                    rightHandScore = 4;

            } else if (rankTuple.length === 3) {
                // might be a three of a kind or two pairs

                if (i === 0) {

                    let highRank = determineThreeOfaKind(rankTuple, result);
                    if (highRank !== -1)
                        leftHandScore = { "highrank": highRank, "score": 7 };
                    else
                        leftHandScore = { "highrank": determineTwoPairsHighRank(rankTuple, result), "score": 8 };
                }
                else {

                    let highRank = determineThreeOfaKind(rankTuple, result);
                    if (highRank !== -1)
                        rightHandScore = { "highrank": highRank, "score": 7 };
                    else
                        rightHandScore = { "highrank": determineTwoPairsHighRank(rankTuple, result), "score": 8 };
                }

            } else if (rankTuple.length === 4) {

                if (i === 0)
                    leftHandScore = { "highrank": determineAPair(rankTuple, result), "score": 9 };
                else
                    rightHandScore = { "highrank": determineAPair(rankTuple, result), "score": 9 };

            } else {
                // dig thru the cards to see what we have got
                // Royal flush, straight flush, flush, straight, high card

                if (i === 0)
                    leftHandScore = 10;
                else
                    rightHandScore = 10;
            }
        }

        //console.log("Left: " + leftHandScore.highrank + " " + leftHandScore.score);
        //console.log("Right: " + rightHandScore.highrank + " " + rightHandScore.score);

        console.log(determineWinner(leftHandScore, rightHandScore));
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