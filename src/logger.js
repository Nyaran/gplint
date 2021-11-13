/* eslint-disable no-console */

export function boldError(msg) {
  console.error(`\x1b[31m\x1b[1m${msg}\x1b[0m`);
}

export function error(msg) {
  console.error(`\x1b[31m${msg}\x1b[0m`);
}
