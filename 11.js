import fs from 'fs'

class Monkey {
  inspected = 0;

  constructor(items, operationFn, test) {
    this.items = items;
    this.operationFn = operationFn;
    this.test = test;
  }

  testFn(v) {
    return v % this.test[0] === 0 ? this.test[1] : this.test[2];
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

    return [by, ifTrue, ifFalse];
  }
}

function part1() {
  const parser = new Parser();
  const monkeys = parser.run(fs.readFileSync('day11.txt', 'utf-8'));
  const N = monkeys.reduce((acc, m) => acc * m.test[0], 1);

  for (let round = 1; round <= 10000; round++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        const wl = monkey.operationFn(item) % N;
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