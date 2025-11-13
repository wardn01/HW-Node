// ורד נגאר 325523017
// מוחמד ריאן 327640835

const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "text");

//Random
function getRandomLine() {
  const words = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k"];
  return words[Math.floor(Math.random() * words.length)];
}
for (let i = 1; i <= 3; i++) {
  let content = "";
  const linesCount = Math.floor(Math.random() * 7) + 7;
  for (let j = 0; j < linesCount; j++) {
    content += getRandomLine() + "\n";
  }
  fs.writeFileSync(path.join(dirPath, `input${i}.txt`), content.trim());
}

//Read files
const files = [];
for (let i = 1; i <= 3; i++) {
  const filePath = path.join(dirPath, `input${i}.txt`);
  const content = fs.readFileSync(filePath, "utf-8").split("\n");
  files.push(content);
}

// maxLines contains the number of lines in the longest file.
let maxLines = 0;
for (let i = 0; i < files.length; i++) {
  if (files[i].length > maxLines) {
    maxLines = files[i].length;
  }
}

let finalOutput = [];
let step = 1;
let currentLine = 0;

// 1 -> 2 -> 3 -> 4 .....
while (currentLine < maxLines) {
  for (let n = 0; n < 3; n++) {
    const lines = files[n].slice(currentLine, currentLine + step);
    finalOutput.push(...lines);
  }
  currentLine += step;
  step++;
}

//Output
const outputPath = path.join(dirPath, "output.txt");
fs.writeFileSync(outputPath, finalOutput.join("\n").trim());

console.log("Done!");
