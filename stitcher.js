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
  });
}

function pluck(arr, index) {
  const newArr = arr.slice();
  newArr.splice(index, 1);
  return [arr[index], newArr];
}

function findLadders(dna) {
  for (let i = 0; i < dna.length; i++) {
    const [root,
      rest] = pluck(dna, i);
    const ladder = [
      [
        {
          dna: root,
          pos: 0
        }
      ],
      []
    ];
    const side = 1;
    for (let j = 0; j < rest.length; j++) {
      const seq = rest[j];
      for (let pos = 0; pos < root.length; pos++) {
        if (root.startsWith(transpose(seq.slice(0, root.length - pos)), pos)) {
          ladder[side] = [
            {
              dna: seq,
              pos
            }
          ];
          printLadder(ladder);
          console.log();
        }
      }
    }
  }
}

// printLadder(ladder);
findLadders(dnaList);
