let caloriesText = await Deno.readTextFile("./input.txt");

let caloriesOfAllElvesList = caloriesText.split("\n\n");

let summedCaloriesOfAllElves = caloriesOfAllElvesList.map(
    function addAllCalories(caloriesOneElf) {
        return caloriesOneElf
            .split("\n")
            .map(function convertToNumbers(caloriesString) {
                return Number(caloriesString);
            })
            .reduce(function addTwoCalories(firstCalories, secondCalories) {
                return Number(firstCalories) + Number(secondCalories);
            });
    }
);

// PART 1

let elfWithMostCalories = Math.max(...summedCaloriesOfAllElves);

console.log(elfWithMostCalories);

// PART 2

let topThreeElvesWithMostCalories = summedCaloriesOfAllElves
    .sort(function findLowerNum(a, b) {
        return a - b;
    })
    .slice(-3);

let totalOfTopThreeElves = topThreeElvesWithMostCalories.reduce(
    function addTwoNums(partialSum, n) {
        return partialSum + n;
    },
    0
);

console.log(topThreeElvesWithMostCalories);
console.log(totalOfTopThreeElves);
