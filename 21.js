import { assert } from 'console';
import fs from 'fs';

function part2(input) {
  const tree = read(input);
  let l = 1e12
  let r = 1e13
  while (l < r) {
    const m = l / 2 + r / 2;
    const v = dfs(tree, 'root', m);
    if (v < 0) {
      r = m;
    } else if (v > 0) {
      l = m;
    } else {
      return m;
    }
  }
  assert(false);
}

console.log(part2(fs.readFileSync('day21.txt', 'utf-8')));

function read(input) {
  return input.split('\n').reduce((acc, line) => {
    const [node, rest] = line.split(': ');
    const g = /^(.+) ([+\-*\/=]) (.+)$/.exec(rest);
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

function dfs(tree, id, humn) {
  const root = tree[id];
  if (id === 'root') {
    const l = dfs(tree, root.left, humn);
    const r = dfs(tree, root.right, humn);
    if (l > r) return 1;
    if (l < r) return -1;
    if (l === r) return 0;
  }
  if (id === 'humn') {
    return humn;
  }
  if (root.val) {
    return root.val;
  }
  switch (root.op) {
    case '+':
      return dfs(tree, root.left, humn) + dfs(tree, root.right, humn);
    case '-':
      return dfs(tree, root.left, humn) - dfs(tree, root.right, humn);
    case '*':
      return dfs(tree, root.left, humn) * dfs(tree, root.right, humn);
    case '/':
      return dfs(tree, root.left, humn) / dfs(tree, root.right, humn);
    default:
      assert(false, `unknown op: ${root.op}`)
  }
}