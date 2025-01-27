import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");
const reports = input.split("\n");

let safeReports = 0;
let semiSafeReports = 0;

function checkIsSafe(report: number[]) {
  let ascending = true;
  let descending = true;

  for (let i = 1; i < report.length; i++) {
    const diff = report[i - 1] - report[i];

    if (Math.abs(diff) > 3) return false;

    if (diff >= 0) descending = false;
    if (diff <= 0) ascending = false;
  }
  return ascending || descending;
}

for (const report of reports) {
  const reportAsNumbersArray = report
    .split(" ")
    .map((strOfNumber) => Number(strOfNumber));
  const isSafe = checkIsSafe(reportAsNumbersArray);
  if (isSafe) safeReports++;
  else {
    for (let i = 0; i < reportAsNumbersArray.length; i++) {
      const isSafe = checkIsSafe(
        reportAsNumbersArray
          .slice(0, i)
          .concat(reportAsNumbersArray.slice(i + 1))
      );
      if (isSafe) {
        semiSafeReports++;
        break;
      }
    }
  }
}

console.log("Number of safe reports: ", safeReports);
console.log(
  "Number of safe reports with Problem Dampener: ",
  safeReports + semiSafeReports
);
