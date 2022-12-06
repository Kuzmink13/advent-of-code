import { readFile } from "fs/promises";
import { getDirName } from "../util/getDirName.js";

const file = await readFile(`${getDirName(import.meta.url)}/data.txt`, "utf8");

const hasDups = (chunk, size) => {
  const chunkSet = new Set(chunk);
  return !(chunkSet.size === size);
};

const getFirstIndex = (size) => {
  for (let index in file) {
    index = Number(index);
    const chunk = file.slice(Math.max(0, index - size), index);

    if (chunk.length < size) {
      continue;
    }

    if (hasDups(chunk, size)) {
      continue;
    }

    return index;
  }
};

const firstIndex = getFirstIndex(4);
const secondIndex = getFirstIndex(14);

console.log(`index: ${firstIndex}`);
console.log(`index: ${secondIndex}`);
