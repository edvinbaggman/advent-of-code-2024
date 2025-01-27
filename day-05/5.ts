import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

const dividerIndex = lines.indexOf("");
const rulesSection = lines.slice(0, dividerIndex);
const updates = lines
  .slice(dividerIndex + 1)
  .map((update) => update.split(",").map(Number));

const rules: Record<number, number[]> = {};

rulesSection.forEach((rule) => {
  const ruleArr = rule.split("|").map(Number);
  if (!rules[ruleArr[0]]) {
    rules[ruleArr[0]] = [];
  }
  if (!rules[ruleArr[0]].includes(ruleArr[1])) {
    rules[ruleArr[0]].push(ruleArr[1]);
  }
});

function checkIsCorrect(update: number[]) {
  let isCorrect = true;
  for (let i = update.length - 1; 0 <= i; i--) {
    // For every element, check that none of the elements before it is prohibited.
    const isRulesBroken = update
      .slice(0, i)
      .some((el) => rules[update[i]].includes(el));
    if (isRulesBroken) {
      isCorrect = false;
      break;
    }
  }
  return isCorrect;
}

function getMiddleValue(arr: number[]) {
  if (!(arr.length % 2))
    throw new Error("Array contains an even amount of elements");
  return arr[Math.floor(arr.length / 2)];
}

function fixUpdate(update: number[]) {
  let fixed = false;
  while (!fixed) {
    for (let i = update.length - 1; 0 <= i; i--) {
      // For every element, if an elements breaks the rules, put it first
      const isRulesBroken = update
        .slice(0, i)
        .some((el) => rules[update[i]].includes(el));
      if (isRulesBroken) {
        const [element] = update.splice(i, 1);
        update.unshift(element);
        break;
      }
    }
    fixed = checkIsCorrect(update);
  }
}

let totalOfCorrectlyOrderedUpdates = 0;
let totalOfIncorrectButFixedUpdates = 0;

updates.forEach((update) => {
  if (checkIsCorrect(update)) {
    totalOfCorrectlyOrderedUpdates += getMiddleValue(update);
  } else {
    fixUpdate(update);
    totalOfIncorrectButFixedUpdates += getMiddleValue(update);
  }
});

console.log("Part 1: ", totalOfCorrectlyOrderedUpdates);
console.log("Part 2: ", totalOfIncorrectButFixedUpdates);
