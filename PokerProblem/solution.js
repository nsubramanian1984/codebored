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

        function rankLetter(value) {
            if (value == 14)
                return 'A';
            else if (value == 13)
                return 'K';
            else if (value == 12)
                return 'Q';
            else if (value == 11)
                return 'J';
            else
                return '' + value;
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

        function handsDescription(value) {
            if (value === 10)
                return "High Card";
            else if (value === 9)
                return "One Pair";
            else if (value === 8)
                return "Two Pairs";
            else if (value === 7)
                return "Three of a Kind";
            else if (value === 6)
                return "Straight";
            else if (value === 5)
                return "Flush";
            else if (value === 4)
                return "Full House";
            else if (value === 3)
                return "Four of a Kind";
            else if (value === 2)
                return "Straight Flush";
            else
                return "Royal Flush"
        }

        function numberOfOccurrences(value, list) {
            let occur = 0;

            list.forEach(elem => {
                if (elem === value)
                    ++occur;
            });

            return occur;
        }

        function determineTheKind(tuple, list, count) {
            let highRank = -1;

            for (let elem of tuple) {
                let occurrences = numberOfOccurrences(elem, list);

                if (occurrences === count) {

                    highRank = elem;
                    break;
                }
            }

            return highRank;
        }

        function determineFourOfaKind(tuple, list) {
            return determineTheKind(tuple, list, 4);
        }

        function determineThreeOfaKind(tuple, list) {
            return determineTheKind(tuple, list, 3);
        }

        function determineAPair(tuple, list) {
            return determineTheKind(tuple, list, 2);
        }

        function determineTwoPairsHighRank(tuple, list) {
            let highRank = -1;

            for (let elem of tuple) {
                let occurrences = numberOfOccurrences(elem, list);

                if (occurrences === 2) {
                    if (highRank === -1)
                        highRank = elem;
                    else if (parseInt(highRank) < parseInt(elem))
                        highRank = elem;
                }
            }

            return highRank;
        }

        function determineHighValuefromList(list) {

            //Assume that the list is sorted.
            return list !== null ? list[list.length - 1] : "-1";
        }

        function determineHighCardFromTwoHands(left, right) {
            for (let index = left.length - 1; index >= 0; index--) {
                if (left[index] === right[index])
                    continue;

                return parseInt(left[index]) > parseInt(right[index]) ? "left" : "right";
            }
        }

        function determineStraight(list) {
            const DIFF = 1; let flush = true;

            if (list !== null) {
                for (let index = 1; index < list.length; index++) {
                    if (parseInt(list[index]) - parseInt(list[index - 1]) === DIFF)
                        continue;
                    else {
                        flush = false;
                        break;
                    }
                }
            }

            return flush;
        }

        function determineWinner(left, right) {
            if (left.score < right.score)
                return "left";
            else if (left.score === right.score) {
                if (left.highrank === right.highrank && (
                    left.score === 2 || left.score === 5 || left.score === 6 || left.score === 9 || left.score === 10)) {

                    // In case, a pair with same rank
                    // 4D 6S 9H QH QC                   3D 6D 7H QD QS
                    // Pair of Queens                   Pair of Queens
                    // Highest card Nine                Highest card Seven

                    // Need to look for the next highest rank among the cards.

                    //5D 8C 9S JS AC                    2C 5C 7D 8S AH
                    //Highest card Ace                  Highest card Queen
                    return determineHighCardFromTwoHands(left.rest, right.rest);
                }
                else if (left.highrank === right.highrank)
                    return "none";
                else
                    return parseInt(left.highrank) > parseInt(right.highrank) ? "left" : "right";
            }
            else
                return "right";
        }

        let leftHandScore, rightHandScore;

        for (let i = 0; i < 2; i++) {
            let rankList = [];
            cardsDrawn[i].map((elm, index) => {
                rankList.push(rank(elm.substr(0, 1)));
            });

            rankList = rankList.sort();
            //console.log(rankList);

            let suitList = [];
            cardsDrawn[i].map((elm, index) => {
                suitList.push(suit(elm.substr(1, 1)));
            });

            //create tuple of ranks
            let rankTuple = [];
            let suitTuple = [];

            rankList.forEach(function (elem, index) {
                if (!rankTuple.includes(elem))
                    rankTuple.push(elem);
            });

            suitList.forEach((elem) => {
                if (!suitTuple.includes(elem))
                    suitTuple.push(elem);
            });

            // console.log(rankTuple);
            // console.log(suitTuple);

            if (rankTuple.length === 2) {
                // might be a full house or four of a kind
                if (i === 0) {
                    let highRank = determineFourOfaKind(rankTuple, rankList);
                    if (highRank !== -1)
                        leftHandScore = { "highrank": highRank, "score": 3 };
                    else {
                        highRank = determineThreeOfaKind(rankTuple, rankList);
                        if (highRank !== -1)
                            leftHandScore = { "highrank": highRank, "score": 4 };
                    }
                }
                else {
                    let highRank = determineFourOfaKind(rankTuple, rankList);
                    if (highRank !== -1)
                        rightHandScore = { "highrank": highRank, "score": 3 };
                    else {
                        highRank = determineThreeOfaKind(rankTuple, rankList);
                        if (highRank !== -1)
                            rightHandScore = { "highrank": highRank, "score": 4 };
                    }
                }

            } else if (rankTuple.length === 3) {
                // might be a three of a kind or two pairs

                if (i === 0) {

                    let highRank = determineThreeOfaKind(rankTuple, rankList);
                    if (highRank !== -1)
                        leftHandScore = { "highrank": highRank, "score": 7 };
                    else
                        leftHandScore = { "highrank": determineTwoPairsHighRank(rankTuple, rankList), "score": 8 };
                }
                else {

                    let highRank = determineThreeOfaKind(rankTuple, rankList);
                    if (highRank !== -1)
                        rightHandScore = { "highrank": highRank, "score": 7 };
                    else
                        rightHandScore = { "highrank": determineTwoPairsHighRank(rankTuple, rankList), "score": 8 };
                }

            } else if (rankTuple.length === 4) {
                let hiRank = determineAPair(rankTuple, rankList);

                let nextHighRanks = rankTuple.filter((elem) => {
                    if (elem != hiRank)
                        return elem;
                });

                if (i === 0)
                    leftHandScore = { "highrank": hiRank, "score": 9, "rest": nextHighRanks };
                else
                    rightHandScore = { "highrank": hiRank, "score": 9, "rest": nextHighRanks };

            } else {
                // dig thru the cards to see what we have got
                // Royal flush, straight flush, flush, straight, high card

                if (suitTuple.length === 1) {
                    // Royal flush, straight flush, flush

                    let score;

                    let straight = determineStraight(rankTuple);

                    let hiRank = determineHighValuefromList(rankTuple);

                    if (straight && hiRank == "14") {

                        // ACE is the highest card
                        score = 1;
                    }
                    else if (straight)
                        score = 2;
                    else
                        score = 5;

                    let nextHighRanks = rankTuple.filter((elem) => {
                        if (elem != hiRank)
                            return elem;
                    });

                    if (i === 0)
                        leftHandScore = { "highrank": hiRank, "score": score, "rest": nextHighRanks };
                    else
                        rightHandScore = { "highrank": hiRank, "score": score, "rest": nextHighRanks };

                }
                else {
                    // Straight or high card
                    let straight = determineStraight(rankTuple);

                    let hiRank = determineHighValuefromList(rankTuple);

                    let nextHighRanks = rankTuple.filter((elem) => {
                        if (elem != hiRank)
                            return elem;
                    });

                    if (i === 0)
                        leftHandScore = { "highrank": hiRank, "score": straight ? 6 : 10, "rest": nextHighRanks };
                    else
                        rightHandScore = { "highrank": hiRank, "score": straight ? 6 : 10, "rest": nextHighRanks };
                }
            }
        }

        // console.log("Left: " + rankLetter(leftHandScore.highrank) + " " + handsDescription(leftHandScore.score));
        // console.log("Right: " + rankLetter(rightHandScore.highrank) + " " + handsDescription(rightHandScore.score));

        return determineWinner(leftHandScore, rightHandScore);
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

            console.log(determineHands(cardsDrawn));
        }
    });
})();