import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8").split("").map(Number);

function getDiskFromInput(input: number[]) {
  const disk = [];
  for (let i = 0; i < input.length; i++) {
    const number = input[i];
    const fileOrSpace = i % 2 ? "." : i / 2;
    disk.push(...Array(number).fill(fileOrSpace));
  }
  return disk;
}

function diskCompactingPart1(disk: string[]) {
  for (let i = disk.length - 1; 0 <= i; i--) {
    const fileId = disk[i];
    if (fileId != ".") {
      const firstSpaceIndex = disk.findIndex((el) => el === ".");
      if (firstSpaceIndex < i) {
        disk[firstSpaceIndex] = fileId;
        disk[i] = ".";
      } else {
        break;
      }
    }
  }
}

function diskCompactingPart2(disk: string[]) {
  for (let i = disk.length - 1; 0 <= i; i--) {
    const fileId = disk[i];
    if (fileId != ".") {
      const sizeOfFile = input[Number(fileId) * 2];
      for (let j = 0; j <= disk.length - sizeOfFile; j++) {
        if (i < j) {
          break;
        }
        if (disk.slice(j, j + sizeOfFile).every((char) => char === ".")) {
          disk.splice(j, sizeOfFile, ...Array(sizeOfFile).fill(fileId));
          disk.splice(
            i + 1 - sizeOfFile,
            sizeOfFile,
            ...Array(sizeOfFile).fill(".")
          );
          break;
        }
      }
    }
  }
}

function getChecksum(disk: string[]) {
  let checksum = 0;
  disk.forEach((el, i) => {
    if (el !== ".") {
      checksum += Number(el) * i;
    }
  });
  return checksum;
}

const diskPart1 = getDiskFromInput(input);
diskCompactingPart1(diskPart1);
const checksumPart1 = getChecksum(diskPart1);

const diskPart2 = getDiskFromInput(input);
diskCompactingPart2(diskPart2);
const checksumPart2 = getChecksum(diskPart2);

console.log("Part 1: ", checksumPart1);
console.log("Part 2: ", checksumPart2);
