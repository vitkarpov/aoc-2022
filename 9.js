import fs from 'fs';

function read() {
  return fs.readFileSync('day9.txt', 'utf-8').split('\n').map((s) => {
    const [dir, move] = s.split(' ');
    return { dir, move };
  });
}

function part2() {
  const v = new Set();
  const H = { x: 0, y: 0 };
  const knots = new Array(9).fill(0).map(() => ({ x: 0, y: 0 }));
  knots.push(H);
  for (const { dir, move } of read()) {
    for (let i = 0; i < move; i++) {
      moveHead(knots[knots.length - 1], dir);
      for (let j = knots.length - 1; j > 0; j--) {
        const H = knots[j];
        const T = knots[j - 1];
        if (Math.abs(H.x - T.x) > 1 || Math.abs(H.y - T.y) > 1) {
          moveTail(H, T, dir);
        }
      }
      v.add(k(knots[0]));
    }
  }
  return v.size;
}
console.log(part2());


function moveHead(H, dir) {
  if (dir === 'R') {
    H.x++;
  } else if (dir === 'L') {
    H.x--;
  } else if (dir === 'U') {
    H.y++;
  } else if (dir === 'D') {
    H.y--;
  }
}

function moveTail(H, T) {
  if (T.y > H.y + 1) {
    T.y -= 1;

    if (T.x > H.x) {
      T.x -= 1;
    } else {
      if (T.x < H.x) {
        T.x += 1;
      }
    }
  } else {
    if (T.y < H.y - 1) {
      T.y += 1;

      if (T.x > H.x) {
        T.x -= 1;
      } else {
        if (T.x < H.x) {
          T.x += 1;
        }
      }
    } else {
      if (T.x > H.x + 1) {
        T.x -= 1;

        if (T.y > H.y) {
          T.y -= 1;
        } else {
          if (T.y < H.y) {
            T.y += 1;
          }
        }
      } else {
        if (T.x < H.x - 1) {
          T.x += 1;

          if (T.y > H.y) {
            T.y -= 1;
          } else {
            if (T.y < H.y) {
              T.y += 1;
            }
          }
        }
      }
    }
  }
}

function k(T) {
  return `${T.x},${T.y}`;
}