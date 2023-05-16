const fs = require("fs");
const path = require("path");

const jsonsInDir = fs
  .readdirSync("./src")
  .filter(file => path.extname(file) === ".json");

const transform = rawData => {
  const { Sonderauslosung } = rawData[0];
  const date = rawData[0]["Datum der Sonderauslosung"];

  const transformedLoseData = rawData.map(data => {
    const id = data.Seriennummer
      ? data.Seriennummer + "-" + data.Losnummer
      : null;
    return {
      id: id,
      quittungsnummer: data.Quittungsnummer || null,
      preis: data.Preis,
      gewinnabholung: data["Gewinnabholung bis"],
      bundesland: data["Lotterieunternehmen/Bundesland"],
    };
  });

  return {
    [date]: {
      Sonderauslosung: Sonderauslosung,
      Lose: transformedLoseData,
    },
  };
};

const writeFinalJson = () => {
  const transformedJson = jsonsInDir.map(file => {
    const fileData = fs.readFileSync(path.join("./src", file));
    const jsonData = JSON.parse(fileData);
    return transform(jsonData);
  });

  fs.writeFile(
    "dist/sonderauslosung-bundle.json",
    JSON.stringify(transformedJson),
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    }
  );
};

writeFinalJson();
