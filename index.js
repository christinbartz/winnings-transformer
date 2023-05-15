const fs = require("fs");
const path = require("path");

const jsonsInDir = fs
  .readdirSync("./src")
  .filter(file => path.extname(file) === ".json");

jsonsInDir.forEach(file => {
  const fileData = fs.readFileSync(path.join("./src", file));
  const json = JSON.parse(fileData.toString());
  console.log(json);
});
