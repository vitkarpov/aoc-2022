import { assert } from 'console';
import fs from 'fs';

const test = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

function part1(input) {
  const tree = read(input);
  return dfs(tree, 'root');
}

assert(part1(test) === 152, 'part 1');
console.log(part1(fs.readFileSync('day21.txt', 'utf-8')));

function read(input) {
  return input.split('\n').reduce((acc, line) => {
    const [node, rest] = line.split(': ');
    const g = /^(.+) ([+\-*\/]) (.+)$/.exec(rest);
    if (!g) {
      assert(!acc[node]);
      acc[node] = {
        val: parseInt(rest, 10),
      }
    } else {
      acc[node] = {
        left: g[1],
        op: g[2],
        right: g[3]
      }
    }
    return acc;
  }, {});
}

function dfs(tree, id) {
  const root = tree[id];
  if (root.val) {
    return root.val;
  }
  switch (root.op) {
    case '+':
      return dfs(tree, root.left) + dfs(tree, root.right);
    case '-':
      return dfs(tree, root.left) - dfs(tree, root.right);
    case '*':
      return dfs(tree, root.left) * dfs(tree, root.right);
    case '/':
      return dfs(tree, root.left) / dfs(tree, root.right);
    default:
      assert(false, 'unknown op')
  }
}