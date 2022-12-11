import fs from 'fs'

class Monkey {
  inspected = 0;

  constructor(items, operationFn, testFn) {
    this.items = items;
    this.operationFn = operationFn;
    this.testFn = testFn;
  }
}

class Parser {
  run(text) {
    return text.split('\n\n').map((t) => {
      const lines = t.split('\n').reverse();
      lines.pop();
      return new Monkey(
        this.parseItems(lines.pop()),
        this.parseOperation(lines.pop()),
        this.parseTest(lines)
      );
    })
  }

  parseItems(line) {
    return line.split(':').pop().split(',').map((v) => parseInt(v, 10));
  }

  parseOperation(line) {
    return new Function('old', `return ${line.split('=').pop()};`);
  }

  parseTest(lines) {
    const by = parseInt(lines[2].split(' ').pop(), 10);
    const ifTrue = parseInt(lines[1].split(' ').pop(), 10);
    const ifFalse = parseInt(lines[0].split(' ').pop(), 10);

    return (v) => v % by === 0 ? ifTrue : ifFalse;
  }
}

function part1() {
  const parser = new Parser();
  const monkeys = parser.run(fs.readFileSync('day11.txt', 'utf-8'));

  for (let round = 1; round <= 20; round++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        const wl = Math.floor(monkey.operationFn(item) / 3);
        monkeys[monkey.testFn(wl)].items.push(wl);
      }
      monkey.inspected += monkey.items.length;
      monkey.items = [];
    }
  }
  const s = monkeys.sort((a, b) => b.inspected - a.inspected);
  return s[0].inspected * s[1].inspected;
}

console.log(part1());