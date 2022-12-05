import { readFile } from "fs/promises";
import { getDirName } from "../util/getDirName.js";

const file = await readFile(`${getDirName(import.meta.url)}/data.txt`, "utf8");

const array = file.split("\r\n");

const hasFullOverlap = (pair) => {
  if (!pair) return false;

  const [range1, range2] = pair.split(",").map((el) => getRange(el));

  return full(range1, range2) || full(range2, range1);
};

const hasPartialOverlap = (pair) => {
  if (!pair) return false;

  const [range1, range2] = pair.split(",").map((el) => getRange(el));

  return partial(range1, range2);
};

const getRange = (str) => {
  const [min, max] = str.split("-");

  return { min: Number(min), max: Number(max) };
};

const full = (range1, range2) => {
  return range1.min <= range2.min && range1.max >= range2.max;
};

const partial = (range1, range2) => {
  return !(range1.max < range2.min || range1.min > range2.max);
};

const fullyOverlappedPairs = array
  .map((pair) => hasFullOverlap(pair))
  .filter(Boolean).length;

const partialOverlappedPairs = array
  .map((pair) => hasPartialOverlap(pair))
  .filter(Boolean).length;

console.log(`fully overlapped pairs: ${fullyOverlappedPairs}`);
console.log(`partially overlapped pairs: ${partialOverlappedPairs}`);
