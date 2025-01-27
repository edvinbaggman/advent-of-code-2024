import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");
const map = input.split("\n").map((line) => line.split("").map(Number));

function getTrailheads(map: number[][]) {
  const trailheads: [number, number][] = [];
  map.forEach((line, i) =>
    line.forEach((tile, j) => {
      if (tile === 0) {
        trailheads.push([i, j]);
      }
    })
  );
  return trailheads;
}

const reachedTops = new Set<string>();
let distinctHikingTrails = 0;

function traverseMap(currentPosition: [number, number]) {
  const currentTile = map[currentPosition[0]][currentPosition[1]];
  if (currentTile === 9) {
    reachedTops.add(currentPosition.toString());
    distinctHikingTrails++;
    return;
  }

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  for (const direction of directions) {
    const nextPosition: [number, number] = [
      currentPosition[0] + direction[0],
      currentPosition[1] + direction[1],
    ];
    if (
      nextPosition[0] >= 0 &&
      nextPosition[0] < map.length &&
      nextPosition[1] >= 0 &&
      nextPosition[1] < map[0].length
    ) {
      const nextTile = map[nextPosition[0]][nextPosition[1]];
      if (nextTile - currentTile === 1) {
        traverseMap(nextPosition);
      }
    }
  }
}

const trailheads = getTrailheads(map);

let totalScoreOfTrailheads = 0;
trailheads.forEach((trailhead) => {
  traverseMap(trailhead);
  totalScoreOfTrailheads += reachedTops.size;
  reachedTops.clear();
});

console.log("Part 1: ", totalScoreOfTrailheads);
console.log("Part 2: ", distinctHikingTrails);
