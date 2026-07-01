import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import test from 'node:test';

import { formatCurrency, splitBill } from '../src/tip.js';

test('splitBill rounds up to the next cent for uneven splits', () => {
  assert.equal(splitBill(10, 0, 3), 3.34);
});

test('splitBill includes tip before cents-safe rounding', () => {
  assert.equal(splitBill(84.5, 18, 3), 33.24);
});

test('formatCurrency defaults to USD and supports custom currencies', () => {
  assert.equal(formatCurrency(33.24), '$33.24');
  assert.equal(formatCurrency(33.24, 'GBP'), '£33.24');
});

test('CLI formats output with the requested currency', () => {
  const output = execFileSync(process.execPath, [
    'src/tip.js',
    '--bill',
    '84.50',
    '--tip',
    '18',
    '--people',
    '3',
    '--currency',
    'EUR',
  ], { encoding: 'utf8' });

  assert.equal(output.trim(), '€33.24');
});
