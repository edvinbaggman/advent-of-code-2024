import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");
const map = input.split("\n").map((line) => line.split(""));
const antinodes = new Set<string>();
const antinodes2 = new Set<string>();

const antennas: Record<string, number[][]> = {};

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    const tile = map[i][j];
    if (tile !== ".") {
      if (!antennas[tile]) {
        antennas[tile] = [];
      }
      antennas[tile].push([i, j]);
    }
  }
}

for (const antenna in antennas) {
  const antennaPositions = antennas[antenna];
  for (let i = 0; i < antennaPositions.length; i++) {
    for (let j = i + 1; j < antennaPositions.length; j++) {
      const antennaPosition1 = antennaPositions[i];
      const antennaPosition2 = antennaPositions[j];

      const xDiff = antennaPosition1[0] - antennaPosition2[0];
      const yDiff = antennaPosition1[1] - antennaPosition2[1];

      for (let i = -map.length; i < map.length; i++) {
        const antinode = [
          antennaPosition1[0] + i * xDiff,
          antennaPosition1[1] + i * yDiff,
        ];
        if (
          antinode[0] >= 0 &&
          antinode[0] < map.length &&
          antinode[1] >= 0 &&
          antinode[1] < map[0].length
        ) {
          // Part 1, only 2 antinodes
          if ([-2, 1].includes(i)) {
            antinodes.add(antinode.toString());
          }
          // Part 2, all antinodes
          antinodes2.add(antinode.toString());
        }
      }
    }
  }
}

console.log("Part 1: ", antinodes.size);
console.log("Part 2: ", antinodes2.size);
