import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

const combinedLines = [
  ...lines, //Horizontal
  ...lines[0].split("").map((_, i) => lines.map((line) => line[i]).join("")), //Vertical
  //Diagonals to be added
];

for (let i = 0; i < lines.length; i++) {
  let diagonal1 = "";
  let diagonal2 = "";
  let diagonal3 = "";
  let diagonal4 = "";
  for (let j = 0; i + j < lines[i].length; j++) {
    const offset = lines.length - 1 - j;
    diagonal1 += lines[i + j][j];
    diagonal3 += lines[i + j][offset];
    if (i) {
      diagonal2 += lines[j][i + j];
      diagonal4 += lines[j][offset - i];
    }
  }
  combinedLines.push(diagonal1);
  combinedLines.push(diagonal3);
  combinedLines.push(diagonal2);
  combinedLines.push(diagonal4);
}

let xmasCount = 0;
combinedLines.forEach((line) => {
  xmasCount += line.matchAll(/XMAS/g).toArray().length;
  xmasCount += line.matchAll(/SAMX/g).toArray().length;
});

console.log("Number of XMAS:", xmasCount);

// Part 2

let x_masCount = 0;

for (let i = 1; i < lines.length - 1; i++) {
  for (let j = 1; j < lines[i].length - 1; j++) {
    if (lines[i][j] === "A") {
      /*
      lt .. rt
      .. A  ..
      lb .. rb
      */
      const lt = lines[i - 1][j - 1];
      const rt = lines[i - 1][j + 1];
      const lb = lines[i + 1][j - 1];
      const rb = lines[i + 1][j + 1];

      if ("SMS".includes(lt + rb) && "SMS".includes(lb + rt)) {
        x_masCount += 1;
      }
    }
  }
}

console.log("Number of X-MAS:", x_masCount);
