import { readFile } from "fs/promises";
import { getDirName } from "../util/getDirName.js";

const file = await readFile(`${getDirName(import.meta.url)}/data.txt`, "utf8");

const array = file
  .split("\r\n\r\n")
  .map((str) =>
    str.split("\r\n").reduce((prev, curr) => prev + Number(curr), 0)
  );

array.sort((a, b) => b - a);

console.log(`max: ${array[0]}`);
console.log(`max of top three: ${array[0] + array[1] + array[2]}`);
