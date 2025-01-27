import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");
const map = input.split("\n").map((line) => line.split(""));

const regions: Record<string, number> = {};
const fences: Record<string, number> = {};

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const corners: Record<string, number[][]> = {
  NE: [
    [-1, 0],
    [-1, 1],
    [0, 1],
  ],
  SE: [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  SW: [
    [1, 0],
    [1, -1],
    [0, -1],
  ],
  NW: [
    [0, -1],
    [-1, -1],
    [-1, 0],
  ],
};

let regionId = 0;

const inBounds = (x: number, y: number): boolean =>
  x >= 0 && x < map.length && y >= 0 && y < map[0].length;

function checkNumberOfCorners(x: number, y: number) {
  const checkIsCorner = (arr: boolean[]): boolean => {
    const isConcave = arr[0] && !arr[1] && arr[2];
    const isConvex = !arr[0] && !arr[2];
    return isConcave || isConvex;
  };
  const tile = map[x][y];
  const numberOfCorners = Object.keys(corners).reduce((acc, corner) => {
    const cornerIsSameTileArr = corners[corner]
      .map((direction) => [x + direction[0], y + direction[1]])
      .map(([x, y]) => inBounds(x, y) && map[x][y] == tile);
    const isCorner = checkIsCorner(cornerIsSameTileArr);
    return acc + (isCorner ? 1 : 0);
  }, 0);
  return numberOfCorners;
}

function assignRegion(x: number, y: number, tile: string) {
  if (regions[`${x},${y}`] === undefined) {
    regions[`${x},${y}`] = regionId;
    directions
      .map((direction) => [x + direction[0], y + direction[1]])
      .filter(([x, y]) => inBounds(x, y) && tile == map[x][y])
      .forEach(([x, y]) => assignRegion(x, y, tile));
  }
}

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const tile = map[i][j];
    const nearbyTiles = directions
      .map(([dx, dy]) => [i + dx, j + dy])
      .filter(([x, y]) => inBounds(x, y))
      .map(([x, y]) => map[x][y]);

    const numberOfNeighborsWithSameTile = nearbyTiles.filter(
      (t) => t === tile
    ).length;
    const numberOfFences = 4 - numberOfNeighborsWithSameTile;
    fences[`${i},${j}`] = numberOfFences;
    assignRegion(i, j, tile);
    regionId++;
  }
}

const tilesInRegions = Object.keys(regions).reduce((acc, cord) => {
  const region = regions[cord];
  acc[region] = acc[region] || [];
  acc[region].push(cord);
  return acc;
}, {} as Record<number, string[]>);

const total = Object.keys(tilesInRegions).reduce((acc, region) => {
  const tilesInRegion = tilesInRegions[Number(region)];
  const perimeter = tilesInRegion.reduce((acc, tile) => acc + fences[tile], 0);
  return acc + perimeter * tilesInRegion.length;
}, 0);

const totalPart2 = Object.keys(tilesInRegions).reduce((acc, region) => {
  const tilesInRegion = tilesInRegions[Number(region)];
  const corners = tilesInRegion.reduce(
    (acc, tile) =>
      acc +
      checkNumberOfCorners(
        Number(tile.split(",")[0]),
        Number(tile.split(",")[1])
      ),
    0
  );
  return acc + corners * tilesInRegion.length;
}, 0);

console.log("Part 1:", total);
console.log("Part 2:", totalPart2);
