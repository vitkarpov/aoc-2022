import { assert } from 'console';
import fs from 'fs'

const test = `1
2
-3
3
-2
0
4`;

function read(input) {
  return input.split('\n').map(Number);
}

function part2(input) {
  const nums = read(input).map((v) => v * 811589153);
  const head = createList(nums);
  const copy = createList(nums);

  for (let i = 0; i < 10; i++) {
    forEach(copy, nums.length, (v) => {
      let curr = find(head, v);
      let a = curr.prev;
      let b = curr.next;

      // remove current
      curr.prev.next = curr.next;
      curr.next.prev = curr.prev;

      // move
      const steps = curr.val % (nums.length - 1);
      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          a = a.next;
          b = b.next;
        }
      } else {
        for (let i = 0; i < -steps; i++) {
          a = a.prev;
          b = b.prev;
        }
      }

      // insert into new position
      a.next = curr;
      curr.prev = a
      b.prev = curr;
      curr.next = b;
    })
  }

  let curr = head;
  while (curr.val !== 0) {
    curr = curr.next;
  }
  let zero = curr;
  let sum = 0;
  for (let i = 1; i <= 3000; i++) {
    zero = zero.next;
    if (i % 1000 === 0) {
      sum += zero.val;
    }
  }
  return sum;
}

function createList(nums) {
  const head = { next: null, prev: null, val: nums[0], id: `${nums[0]},0` };
  let curr = head;
  for (let i = 1; i < nums.length; i++) {
    curr.next = { next: null, prev: curr, val: nums[i], id: `${nums[i]},${i}` };
    curr = curr.next;
  }
  curr.next = head;
  head.prev = curr;
  return head;
}

function forEach(head, len, callback) {
  let curr = head;
  for (let i = 0; i < len; i++) {
    callback(curr);
    curr = curr.next;
  }
}

function find(head, v) {
  let curr = head;
  while (curr.id !== v.id) {
    curr = curr.next;
  }
  return curr;
}

function print(head, len) {
  let curr = head;
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(curr.val);
    curr = curr.next;
  }
  console.log(result.join(','));
}

assert(part2(test) === 1623178306, 'part2');
console.log(part2(fs.readFileSync('day20.txt', 'utf-8')));