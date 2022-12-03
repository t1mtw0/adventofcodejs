let allRucksackItemsText = await Deno.readTextFile("./input.txt");

// Part 1

let sumOfPrios = allRucksackItemsText
    .split("\n")
    .filter(function removeEmptyStrings(rucksackItems) {
        if (rucksackItems === "") {
            return false;
        }
        return true;
    })
    .map(findDuplicateFromSack)
    .map(toPrioNum)
    .reduce(function addPrio(partialSum, n) {
        return partialSum + n;
    });

console.log(sumOfPrios);

// Part 2

let sumOfPriosGroups = allRucksackItemsText
    .split("\n")
    .filter(function removeEmptyStrings(rucksackItems) {
        if (rucksackItems === "") {
            return false;
        }
        return true;
    })
    .reduce(function splitIntoGroupsOfThree(accumulator, rucksack) {
        if (accumulator[accumulator.length - 1].length === 3) {
            accumulator.push([])
        }
        accumulator[accumulator.length - 1].push(rucksack);
        return accumulator;
    }, [[]])
    .map(function findDuplicateFromGroups([group1, group2, group3]) {
        return group1
            .split("")
            .map(function findDupItem(item) {
                if (group2.indexOf(item) > -1 && group3.indexOf(item) > -1) {
                    return item;
                }
                return "";
            })
            .join("")[0];
    })
    .map(toPrioNum)
    .reduce(function addPrio(partialSum, n) {
        return partialSum + n;
    });

console.log(sumOfPriosGroups);

function findDuplicateFromSack(rucksackItems) {
    function splitInHalf(rucksackItems) {
        let middleIndex = Math.floor(rucksackItems.length / 2);

        return [
            rucksackItems.slice(0, middleIndex),
            rucksackItems.slice(middleIndex),
        ];
    }

    let [itemsCompartment1, itemsCompartment2] = splitInHalf(rucksackItems);

    return itemsCompartment1
        .split("")
        .map(function checkIfItemInOtherCompartment(item) {
            if (itemsCompartment2.indexOf(item) > -1) {
                return item;
            }
            return "";
        })
        .filter(function getItemFromArr(item) {
            if (item != "") {
                return true;
            }
            return false;
        })[0];
}

function toPrioNum(itemString) {
    if (itemString === itemString.toUpperCase()) {
        return itemString.charCodeAt(0) - 38;
    } else if (itemString === itemString.toLowerCase()) {
        return itemString.charCodeAt(0) - 96;
    }
}
