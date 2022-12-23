import fs from 'fs'

function read(input) {
  return input.split('\n').map((line, y) => {
    return line.split('').map((v, x) => ({
      v,
      x,
      y,
    }));
  });
}

console.log(read(fs.readFileSync('day22.txt', 'utf-8')));