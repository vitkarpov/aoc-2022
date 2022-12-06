import assert from 'assert';
import fs from 'fs'

function part2() {
  const s = read();
  const w = {};
  for (let i = 0; i < 26; i++) {
    w[String.fromCharCode('a'.charCodeAt(0) + i)] = 0;
  }
  for (let i = 0; i < 14; i++) {
    w[s[i]]++;
  }
  for (let i = 14; i < s.length; i++) {
    w[s[i - 14]]--;
    w[s[i]]++;
    if (Object.values(w).every((v) => v === 1 || v === 0)) {
      return i + 1;
    }
  }
  assert(false, 'No message pack marker');
}

console.log(part2())

function read() {
  return fs.readFileSync('day6.txt', 'utf-8');
}