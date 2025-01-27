import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");

// regex for "mul({1-3 digits},{1-3 digits})"
const regex = /mul\(\d{1,3},\d{1,3}\)/g;
const mulMatches = input.matchAll(regex);

const regexDo = /do\(\)/g;
const doMatchesIndexes = input
  .matchAll(regexDo)
  .map((match) => match.index)
  .toArray();

const regexDont = /don't\(\)/g;
const dontMatchesIndexes = input
  .matchAll(regexDont)
  .map((match) => match.index)
  .toArray();

let part1ResultOfMultiplications = 0;
let part2ResultOfMultiplications = 0;

for (const match of mulMatches) {
  const matchIndex = match.index;

  const lastDontIndex = dontMatchesIndexes
    .filter((dontMatchIndex) => dontMatchIndex <= matchIndex)
    .pop();

  const lastDoIndex =
    doMatchesIndexes
      .filter((doMatchIndex) => doMatchIndex <= matchIndex)
      .pop() || 0;

  const [first, second] = match[0]
    .slice(4, -1) // removes "mul(" and ")"
    .split(",")
    .map(Number);

  if (!lastDontIndex || lastDoIndex > lastDontIndex) {
    part2ResultOfMultiplications += first * second;
  }

  part1ResultOfMultiplications += first * second;
}

console.log("Part 1: ", part1ResultOfMultiplications);
console.log("Part 2: ", part2ResultOfMultiplications);
