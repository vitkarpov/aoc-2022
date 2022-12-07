import fs from 'fs'

class Node {
  constructor(val) {
    this.val = val;
    this.children = [];
    this.parent = null;
  }
}

function part1() {
  function calcSize(root) {
    if (root.children.length === 0) {
      return root.val.size;
    }
    root.val.size = root.children.reduce((acc, next) => acc + calcSize(next), 0)
    return root.val.size;
  }
  function howManyUnderLimitSize(root, limit) {
    if (root.val.type === 'file') {
      return 0;
    }
    const size = root.val.size <= limit ? root.val.size : 0;
    return size + root.children.reduce((acc, next) => acc + howManyUnderLimitSize(next, limit), 0);
  }

  const root = buildFileTree().children[0];
  calcSize(root);
  return howManyUnderLimitSize(root, 100000);
}

console.log(part1());

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