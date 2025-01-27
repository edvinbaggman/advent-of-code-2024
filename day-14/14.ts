import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8").split("\n");

const mapHeight = 103;
const mapWidth = 101;
const xMiddle = Math.floor(mapHeight / 2);
const yMiddle = Math.floor(mapWidth / 2);

const robots = input.map((robot) => {
  const [p, v] = robot.split(" ");
  const [py, px] = p
    .split(",")
    .map((val, i) => (i === 0 ? val.substring(2) : val))
    .map(Number);
  const [vy, vx] = v
    .split(",")
    .map((val, i) => (i === 0 ? val.substring(2) : val))
    .map(Number);
  return { px, py, vx, vy };
});

for (let seconds = 0; seconds < 10000; seconds++) {
  const map = Array.from({ length: mapHeight }, () =>
    Array(mapWidth).fill(".")
  );

  const robotsInQuadrants = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };

  robots.forEach((robot) => {
    const xEndPosition =
      (((robot.px + seconds * robot.vx) % mapHeight) + mapHeight) % mapHeight;

    const yEndPosition =
      (((robot.py + seconds * robot.vy) % mapWidth) + mapWidth) % mapWidth;

    map[xEndPosition][yEndPosition] = "x";

    if (xEndPosition < xMiddle && yEndPosition < yMiddle) {
      robotsInQuadrants[1]++;
    }
    if (xEndPosition < xMiddle && yEndPosition > yMiddle) {
      robotsInQuadrants[2]++;
    }
    if (xEndPosition > xMiddle && yEndPosition < yMiddle) {
      robotsInQuadrants[3]++;
    }
    if (xEndPosition > xMiddle && yEndPosition > yMiddle) {
      robotsInQuadrants[4]++;
    }
  });

  const stringMap = map.map((line) => line.join("")).join("\n");

  if (seconds === 100) {
    const safetyFactor = Object.values(robotsInQuadrants).reduce(
      (acc, curr) => acc * curr,
      1
    );
    console.log("Part 1:", safetyFactor);
  }

  if (stringMap.includes("xxxxxxxxxx")) {
    console.log("Part 2:", seconds);
    console.log(stringMap);
  }
}
