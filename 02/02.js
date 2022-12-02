import { readFile } from "fs/promises";
import { getDirName } from "../util/getDirName.js";

const file = await readFile(`${getDirName(import.meta.url)}/data.txt`, "utf8");

const array = file.split("\r\n");

function getScore(game) {
  if (!game) return 0;

  const opponentPlay = game[0];
  const yourPlay = game[2];

  switch (yourPlay) {
    case "X": {
      if (opponentPlay === "A") return 3 + 1;
      if (opponentPlay === "B") return 0 + 1;
      if (opponentPlay === "C") return 6 + 1;
    }
    case "Y": {
      if (opponentPlay === "A") return 6 + 2;
      if (opponentPlay === "B") return 3 + 2;
      if (opponentPlay === "C") return 0 + 2;
    }
    case "Z": {
      if (opponentPlay === "A") return 0 + 3;
      if (opponentPlay === "B") return 6 + 3;
      if (opponentPlay === "C") return 3 + 3;
    }
  }
}

function getScore2(game) {
  if (!game) return 0;

  const opponentPlay = game[0];
  const result = game[2];

  switch (result) {
    case "X": {
      if (opponentPlay === "A") return 0 + 3;
      if (opponentPlay === "B") return 0 + 1;
      if (opponentPlay === "C") return 0 + 2;
    }
    case "Y": {
      if (opponentPlay === "A") return 3 + 1;
      if (opponentPlay === "B") return 3 + 2;
      if (opponentPlay === "C") return 3 + 3;
    }
    case "Z": {
      if (opponentPlay === "A") return 6 + 2;
      if (opponentPlay === "B") return 6 + 3;
      if (opponentPlay === "C") return 6 + 1;
    }
  }
}

const sum = array
  .map((game) => getScore(game))
  .reduce((prev, curr) => prev + curr, 0);

const sum2 = array
  .map((game) => getScore2(game))
  .reduce((prev, curr) => prev + curr, 0);

console.log(`Score 1: ${sum}`);
console.log(`Score 2: ${sum2}`);
