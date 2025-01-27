import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

const column1: number[] = [];
const column2: number[] = [];

lines.forEach((line) => {
  const numbers = line.split("   ");

  column1.push(parseInt(numbers[0]));
  column2.push(parseInt(numbers[1]));
});

const sortedColumn1 = column1.sort();
const sortedColumn2 = column2.sort();

let totalDistance = 0;

for (let index = 0; index < sortedColumn1.length; index++) {
  const distance = Math.abs(sortedColumn1[index] - sortedColumn2[index]);
  totalDistance += distance;
}

console.log("Total distance between lists: ", totalDistance);

const repeating: Record<number, number> = {};

let similarityScore = 0;

sortedColumn2.forEach((location) => {
  if (!repeating[location]) {
    repeating[location] = 0;
  }
  repeating[location]++;
});

sortedColumn1.forEach((location) => {
  if (repeating[location]) {
    similarityScore += location * repeating[location];
  }
});

console.log("Similarity scort: ", similarityScore);
