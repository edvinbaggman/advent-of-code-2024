import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n").map((line) => line.split(""));

const startingIndex: [number, number] = [-1, -1];

lines.forEach((line, i) => {
  if (line.includes("^")) {
    startingIndex[0] = i;
    startingIndex[1] = line.indexOf("^");
  }
});

const nextDirection: Record<string, string> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};
const directions: Record<string, [number, number]> = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};

let totalSteps = 0;
let loops = 0;

function walkMap(map: string[][]) {
  let currentIndex = startingIndex;
  let currentDirection = "up";
  let turnsWithoutNewTile = 0;
  while (
    currentIndex[0] > 0 &&
    currentIndex[0] < map.length - 1 &&
    currentIndex[1] > 0 &&
    currentIndex[1] < map[0].length - 1
  ) {
    const nextIndex: [number, number] = [
      currentIndex[0] + directions[currentDirection][0],
      currentIndex[1] + directions[currentDirection][1],
    ];
    const currentTile = map[currentIndex[0]][currentIndex[1]];
    const nextTile = map[nextIndex[0]][nextIndex[1]];
    if (nextTile === "#") {
      turnsWithoutNewTile++;
      currentDirection = nextDirection[currentDirection];
    } else {
      if (currentTile !== "X") {
        map[currentIndex[0]][currentIndex[1]] = "X";
        totalSteps++;
        turnsWithoutNewTile = 0;
      }
      currentIndex = nextIndex;
    }
    if (turnsWithoutNewTile === 4) {
      loops++;
      break;
    }
  }
}

const linesCopy = lines.map((line) => [...line]);

walkMap(linesCopy);

console.log("Part 1, total steps: ", totalSteps);

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    const linesCopy = lines.map((line) => [...line]);
    linesCopy[i][j] = "#";
    walkMap(linesCopy);
  }
}

console.log("Part 2, number of loops: ", loops);
