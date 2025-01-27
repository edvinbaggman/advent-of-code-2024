import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8").split("\n");

const machines = input
  .join("|")
  .split("||")
  .map((sub) => sub.split("|").filter(Boolean));

function extractButton(button: string) {
  return button
    .substring(9)
    .split(",")
    .map((val) => val.substring(3))
    .map(Number);
}

function extractPrize(prize: string) {
  return prize
    .substring(6)
    .split(",")
    .map((val) => val.substring(3))
    .map(Number);
}

function solveUsingCramersRule(
  buttonA: number[],
  buttonB: number[],
  goal: number[]
): number | null {
  // Extract values for readability
  const [a1, a2] = buttonA; // Button A steps [x, y]
  const [b1, b2] = buttonB; // Button B steps [x, y]
  const [g1, g2] = goal; // Goal [xGoal, yGoal]

  // Compute the determinant of the coefficient matrix
  const determinant = a1 * b2 - a2 * b1;
  if (determinant === 0) {
    // If determinant is zero, system of equations is not solvable
    return null;
  }

  // Compute determinants for x and y using Cramer's Rule
  const determinantX = g1 * b2 - g2 * b1;
  const determinantY = a1 * g2 - a2 * g1;

  // Solve for the number of presses of Button A and Button B
  const pressesA = determinantX / determinant;
  const pressesB = determinantY / determinant;

  // Ensure the solution is valid (presses must be non-negative integers)
  if (
    pressesA < 0 ||
    pressesB < 0 ||
    !Number.isInteger(pressesA) ||
    !Number.isInteger(pressesB)
  ) {
    return null; // No valid solution
  }

  return pressesA * 3 + pressesB * 1;
}

const total = machines.reduce((acc, machine) => {
  const buttonA = extractButton(machine[0]);
  const buttonB = extractButton(machine[1]);
  const prize = extractPrize(machine[2]);
  const costIfSolutionFound = solveUsingCramersRule(buttonA, buttonB, prize);
  return acc + (costIfSolutionFound ? costIfSolutionFound : 0);
}, 0);

const total2 = machines.reduce((acc, machine) => {
  const buttonA = extractButton(machine[0]);
  const buttonB = extractButton(machine[1]);
  const prize = extractPrize(machine[2]).map((cord) => cord + 10000000000000);
  const costIfSolutionFound = solveUsingCramersRule(buttonA, buttonB, prize);
  return acc + (costIfSolutionFound ? costIfSolutionFound : 0);
}, 0);

console.log("Part 1:", total);
console.log("Part 2:", total2);
