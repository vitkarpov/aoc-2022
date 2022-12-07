import fs from 'fs'

class Node {
  constructor(val) {
    this.val = val;
    this.children = [];
    this.parent = null;
  }
}

function part2() {
  function calcSize(root) {
    if (root.children.length === 0) {
      return root.val.size;
    }
    root.val.size = root.children.reduce((acc, next) => acc + calcSize(next), 0)
    return root.val.size;
  }
  let minSizeToDelete = Infinity;
  function dfs(root) {
    if (root.val.type === 'file') {
      return;
    }
    if (unusedNow + root.val.size >= unusedRequired) {
      minSizeToDelete = Math.min(minSizeToDelete, root.val.size);
    }
    root.children.forEach(dfs);
  }

  const root = buildFileTree().children[0];
  calcSize(root);
  const total = 70000000;
  const unusedRequired = 30000000;
  const unusedNow = total - root.val.size;
  dfs(root);
  return minSizeToDelete;
}

console.log(part2());

function buildFileTree() {
  const root = new Node();
  let curr = root;
  const lines = fs.readFileSync('day7.txt', 'utf-8').split('\n');
  for (const line of lines) {
    if (line.startsWith('$ cd')) {
      const name = line.split(' ').pop();
      if (name === '..') {
        curr = curr.parent;
      } else {
        const next = new Node({ name, type: 'dir' });
        next.parent = curr;
        curr.children.push(next);
        curr = next;
      }
    } else if (line === '$ ls') {
      continue;
    } else {
      const [size, name] = line.split(' ');
      if (size === 'dir') {
        continue;
      } else {
        const next = new Node({ name, size: Number(size), type: 'file' });
        next.parent = curr;
        curr.children.push(next);
      }
    }
  }
  return root;
}