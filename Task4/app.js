// ורד נגאר 325523017
// מוחמד ריאן 327640835

const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "text");

//Defines a function getRandomLine() that returns a random letter from the words array.
function getRandomLine() {
  const words = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k"];
  return words[Math.floor(Math.random() * words.length)];
}

// Creates 3 files, each containing 7–13 lines, with each line being a random letter from the words array.
for (let i = 1; i <= 3; i++) {
  let content = "";
  const linesCount = Math.floor(Math.random() * 7) + 7;
  for (let j = 0; j < linesCount; j++) {
    content += getRandomLine() + "\n";
  }
  fs.writeFileSync(path.join(dirPath, `input${i}.txt`), content.trim());
}

//Reads the three input files, splits each into lines, and stores them in the `files` array.
const files = [];
for (let i = 1; i <= 3; i++) {
  const filePath = path.join(dirPath, `input${i}.txt`);
  const content = fs.readFileSync(filePath, "utf-8").split("\n");
  files.push(content);
}

//Finds the longest file (the one with the most lines).
let maxLines = 0;
for (let i = 0; i < files.length; i++) {
  if (files[i].length > maxLines) {
    maxLines = files[i].length;
  }
}

let finalOutput = [];
let step = 1;
let currentLine = 0;

//Merges the files by taking 1 line from each, then 2 lines, then 3 lines, and so on, until all lines are added.
while (currentLine < maxLines) {
  for (let n = 0; n < 3; n++) {
    const lines = files[n].slice(currentLine, currentLine + step);
    finalOutput.push(...lines);
  }
  currentLine += step;
  step++;
}

//Writes all merged lines to output.txt.
const outputPath = path.join(dirPath, "output.txt");
fs.writeFileSync(outputPath, finalOutput.join("\n").trim());

console.log("Done!");

