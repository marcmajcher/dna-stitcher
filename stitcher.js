'use strict';

/* eslint-env node */
/* eslint-disable no-console */

const dnaList = [
  'ATTTGCATTG',
  'GGCGTAAAT',
  'TAATCT',
  'CTCTA',
  'TAACCCCGCA',
  'GAGAGAGA',
  'AAC'
];

const matches = {
  A: 'T',
  C: 'G',
  G: 'C',
  T: 'A'
};

const transpose = str => str.split('').map(e => matches[e]).join('');

function printLadder(ladder) {
  ladder.forEach((side) => {
    let out = '';
    side.forEach((seq) => {
      const spc = seq.pos - out.length;
      out += new Array(spc + 1).join(' ');
      out += seq.dna;
    });
    console.log(out);
    console.log();
  });
}

function matchAt(root, seq, pos) {
  return root.startsWith(transpose(seq.slice(0, root.length - pos)), pos);
}

function pluck(arr, index) {
  const newArr = arr.slice();
  newArr.splice(index, 1);
  return [arr[index], newArr];
}

function buildLadder(data) {
  for (let i = 0; i < data.remaining.length; i++) {
    const seq = data.remaining[i];
    for (let pos = 0; pos < data.currentRoot.length; pos++) {
      if (matchAt(data.currentRoot, seq, pos)) {
        data.ladder[data.currentSide].push({ dna: seq, pos });
        const rest = data.remaining.slice();
        rest.splice(i, 1);

        if (rest.length === 0) {
          // We did it!
          printLadder(data.ladder);
        }
        else {
          // Keep going!
          const hangover = 0; // calculate hangover - root hangover is +, seq is -
          if (hangover > 0) {
            // if there's a hangover on the root side, keep going at pos + seq.length
          }
          else if (hangover < 0) {
            // if there's a hangover on the other side, keep going at
          }
          else { // no hangover, boo
            data.ladder[data.currentSide].pop();
            return;
          }
        }
      }
    }
  }
}

function findLadders(dna) {
  for (let i = 0; i < dna.length; i++) {
    const [root, rest] = pluck(dna, i);
    const data = {
      ladder: [
        [
          {
            dna: root,
            pos: 0
          }
        ],
        []
      ],
      currentSide: 1,
      currentPos: 0,
      currentRoot: root,
      remaining: rest.slice()
    };
    buildLadder(data);
  }
}

findLadders(dnaList);
