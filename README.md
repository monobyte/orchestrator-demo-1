# Tip Calculator

A tiny CLI that calculates how to split a restaurant bill and tip across a group.

## Usage

```sh
node src/tip.js --bill 84.50 --tip 18 --people 3 --currency USD
```

The `--currency` flag is optional and defaults to `USD`.

## Status

Early prototype: per-person shares are rounded to cents and CLI output supports currency formatting.
