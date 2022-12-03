import { readFile } from "fs/promises";
import { getDirName } from "../util/getDirName.js";

const file = await readFile(`${getDirName(import.meta.url)}/data.txt`, "utf8");

const array = file.split("\r\n");

function getScores(backpack) {
  if (!backpack) return 0;

  const [firstCompartment, secondCompartment] = splitBackpack(backpack).map(
    (compartment) => new Set(compartment)
  );

  let commonItem;

  firstCompartment.forEach((item) => {
    if (secondCompartment.has(item)) {
      commonItem = item;
    }
  });

  return scoreItem(commonItem);
}

function getBadgeScores(backpack, i, arr) {
  if (!backpack) return 0;

  if (i % 3) return 0;

  const [backpack1, backpack2, backpack3] = [
    arr[i],
    arr[i + 1],
    arr[i + 2],
  ].map((backpack) => new Set(backpack));

  let commonItem;

  backpack1.forEach((item) => {
    if (backpack2.has(item) && backpack3.has(item)) {
      commonItem = item;
    }
  });

  return scoreItem(commonItem);
}

function splitBackpack(backpack) {
  const length = backpack.length;
  return [backpack.slice(0, length / 2), backpack.slice(length / 2)];
}

function scoreItem(item) {
  const scoredItem = item.charCodeAt(0) - 96;
  if (scoredItem > 0) return scoredItem;
  return scoredItem + 58;
}

const scores = array.map(getScores);
const badgeScores = array.map(getBadgeScores);

const finalScore = scores.reduce((prev, curr) => prev + curr, 0);
const finalBadgeScore = badgeScores.reduce((prev, curr) => prev + curr, 0);

console.log(`final score: ${finalScore}`);
console.log(`final badge score: ${finalBadgeScore}`);
