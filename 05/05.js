import { readFile } from "fs/promises";
import { stacks } from "./stacks.js";
import { getDirName } from "../util/getDirName.js";

const file = await readFile(`${getDirName(import.meta.url)}/data.txt`, "utf8");

const array = file.split("\r\n");

const deconstruct = (line) => {
  if (!line) return [];

  return line
    .replace("move", "")
    .replace("from", "")
    .replace("to", "")
    .trim()
    .split("  ")
    .map(Number);
};

const execute = (instruction) => {
  if (!instruction.length) return;

  const [moves, stack1, stack2] = instruction;
  const temp = [];

  for (let i = 0; i < moves; i++) {
    const crate = stacks[stack1 - 1].pop();
    temp.push(crate);
  }

  for (let i = 0; i < moves; i++) {
    const crate = temp.pop();
    stacks[stack2 - 1].push(crate);
  }
};

array
  .map((line) => deconstruct(line))
  .forEach((instruction) => execute(instruction));

console.log(stacks.map((stack) => stack.pop()).join(""));
