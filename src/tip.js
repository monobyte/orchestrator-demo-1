// TODO: rounding is naive and can drop a cent on odd splits (see issues/002).
import { fileURLToPath } from 'node:url';

export function splitBill(bill, tipPercent, people) {
  const tip = bill * (tipPercent / 100);
  const total = bill + tip;
  return total / people;
}

function getArgValue(args, name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const bill = Number(getArgValue(process.argv, '--bill'));
  const tipPercent = Number(getArgValue(process.argv, '--tip'));
  const people = Number(getArgValue(process.argv, '--people'));

  console.log(splitBill(bill, tipPercent, people));
}
