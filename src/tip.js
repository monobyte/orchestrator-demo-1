import { fileURLToPath } from 'node:url';

const CENTS_PER_UNIT = 100;
const DEFAULT_CURRENCY = 'USD';

export function splitBill(bill, tipPercent, people) {
  const tip = bill * (tipPercent / 100);
  const total = bill + tip;
  const totalCents = Math.round(total * CENTS_PER_UNIT);
  const shareCents = Math.ceil(totalCents / people);

  return shareCents / CENTS_PER_UNIT;
}

export function formatCurrency(amount, currency = DEFAULT_CURRENCY) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

function getArgValue(args, name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const bill = Number(getArgValue(process.argv, '--bill'));
  const tipPercent = Number(getArgValue(process.argv, '--tip'));
  const people = Number(getArgValue(process.argv, '--people'));
  const currency = getArgValue(process.argv, '--currency')?.toUpperCase() ?? DEFAULT_CURRENCY;

  console.log(formatCurrency(splitBill(bill, tipPercent, people), currency));
}
