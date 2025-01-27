import fs from "node:fs";

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

function generateEquations(numbers: number[], operators: string[]) {
  const equations: string[] = [];

  // Base case. only 2 numbers
  if (numbers.length == 2) {
    for (const operator of operators) {
      equations.push(numbers[0] + operator + numbers[1]);
    }
    return equations;
  }

  // Add the current number with all operators to all equations
  const nextEquations = generateEquations(numbers.slice(1), operators);

  for (const equation of nextEquations) {
    for (const operator of operators) {
      equations.push(numbers[0] + operator + equation);
    }
  }

  return equations;
}

function evaluate(equation: string) {
  const equationArr = equation.split(/(\+|\*|\|\|)/);

  let result = Number(equationArr.shift());

  while (equationArr.length) {
    const operator = equationArr.shift();
    const number = equationArr.shift();
    switch (operator) {
      case "+":
        result += Number(number);
        break;
      case "*":
        result *= Number(number);
        break;
      case "||":
        result = Number(String(result) + number);
        break;
    }
  }

  return result;
}

function calibrate(lines: string[], operators: string[]) {
  let calibrationResult = 0;
  lines.forEach((line) => {
    const [value, input] = line.split(":");
    const numbers = input.substring(1).trim().split(" ").map(Number);

    const equations = generateEquations(numbers, operators);

    for (const equation of equations) {
      const result = evaluate(equation);
      if (result == Number(value)) {
        calibrationResult += result;
        break;
      }
    }
  });
  return calibrationResult;
}

console.log("Part 1: ", calibrate(lines, ["*", "+"]));
console.log("Part 2: ", calibrate(lines, ["*", "+", "||"]));
