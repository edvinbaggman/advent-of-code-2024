import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");

const stones = input.split(" ").map(Number);

const cache: Record<string, number> = {};

function countStonesAfterBlinks(stone: number, blinks: number): number {
  if (blinks === 0) return 1;

  const cachedValue = cache[`${stone},${blinks}`];
  if (cachedValue) return cachedValue;

  let stonesCount = 0;
  const numberOfDigits = stone.toString().length;
  // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
  if (stone === 0) {
    stonesCount = countStonesAfterBlinks(1, blinks - 1);
  }
  // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.
  else if (numberOfDigits % 2 === 0) {
    const stone1 = Number(stone.toString().substring(0, numberOfDigits / 2));
    const stone2 = Number(stone.toString().substring(numberOfDigits / 2));
    stonesCount =
      countStonesAfterBlinks(stone1, blinks - 1) +
      countStonesAfterBlinks(stone2, blinks - 1);
  }
  // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024
  else {
    stonesCount = countStonesAfterBlinks(stone * 2024, blinks - 1);
  }
  cache[`${stone},${blinks}`] = stonesCount;
  return stonesCount;
}

let nubmerOfStonesPart1 = 0;
let nubmerOfStonesPart2 = 0;
for (const stone of stones) {
  nubmerOfStonesPart1 += countStonesAfterBlinks(stone, 25);
  nubmerOfStonesPart2 += countStonesAfterBlinks(stone, 75);
}

console.log("Part 1: ", nubmerOfStonesPart1);
console.log("Part 2: ", nubmerOfStonesPart2);
