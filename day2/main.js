let stratGuideText = await Deno.readTextFile("./input.txt");

// Part 1

let totalScoreOne = stratGuideText
    .split("\n")
    .map(calculateScoreOne)
    .reduce(function addScores(partialSum, n) {
        return partialSum + n;
    });

console.log(totalScoreOne);

// Part 2

let totalScoreTwo = stratGuideText
    .split("\n")
    .map(calculateScoreTwo)
    .reduce(function addScores(partialSum, n) {
        return partialSum + n;
    });

console.log(totalScoreTwo);

function calculateScoreOne(turnLineText) {
    if (turnLineText === "") {
        return 0;
    }
    let [opponentTurnLetter, myTurnLetter] = turnLineText.split(" ");

    let mapLetterToTurn = {
        A: "Rock",
        X: "Rock",
        B: "Paper",
        Y: "Paper",
        C: "Scissors",
        Z: "Scissors",
    };

    let mapLetterToShapeScore = {
        X: 1,
        Y: 2,
        Z: 3,
    };

    let myTurn = mapLetterToTurn[myTurnLetter];
    let opponentTurn = mapLetterToTurn[opponentTurnLetter];

    let winDrawLossScore = winDrawLoss(myTurn, opponentTurn);

    function winDrawLoss(myTurn, opponentTurn) {
        if (myTurn == opponentTurn) {
            return 3;
        }
        if (myTurn === "Rock" && opponentTurn === "Paper") {
            return 0;
        } else if (myTurn === "Rock" && opponentTurn === "Scissors") {
            return 6;
        } else if (myTurn === "Paper" && opponentTurn === "Rock") {
            return 6;
        } else if (myTurn === "Paper" && opponentTurn === "Scissors") {
            return 0;
        } else if (myTurn === "Scissors" && opponentTurn === "Rock") {
            return 0;
        } else if (myTurn === "Scissors" && opponentTurn === "Paper") {
            return 6;
        }
    }

    return winDrawLossScore + mapLetterToShapeScore[myTurnLetter];
}

function calculateScoreTwo(turnLineText) {
    if (turnLineText === "") {
        return 0;
    }
    let [opponentTurnLetter, optimalResultLetter] = turnLineText.split(" ");

    let mapLetterToTurn = {
        A: "Rock",
        B: "Paper",
        C: "Scissors",
    };

    let mapLetterToNeededResult = {
        X: "Lose",
        Y: "Draw",
        Z: "Win",
    };

    let mapLetterToShapeScore = {
        Rock: 1,
        Paper: 2,
        Scissors: 3,
    };

    let mapResultToScore = {
        Lose: 0,
        Draw: 3,
        Win: 6,
    };

    function findNeededTurn(opponentTurn, optimalResult) {
        if (optimalResult === "Draw") {
            return opponentTurn;
        } else if (optimalResult === "Lose") {
            if (opponentTurn === "Rock") {
                return "Scissors";
            } else if (opponentTurn === "Paper") {
                return "Rock";
            } else if (opponentTurn === "Scissors") {
                return "Paper";
            }
        } else if (optimalResult === "Win") {
            if (opponentTurn === "Rock") {
                return "Paper";
            } else if (opponentTurn === "Paper") {
                return "Scissors";
            } else if (opponentTurn === "Scissors") {
                return "Rock";
            }
        }
    }

    let opponentTurn = mapLetterToTurn[opponentTurnLetter];
    let optimalResult = mapLetterToNeededResult[optimalResultLetter];

    let myTurn = findNeededTurn(opponentTurn, optimalResult);

    return mapLetterToShapeScore[myTurn] + mapResultToScore[optimalResult];
}
