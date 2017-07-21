'use strict';

/* eslint-env node */

const dna = [
  'ATTTGCATTG',
  'GGCGTAAAT',
  'TAATCT',
  'CTCTA',
  'TAACCCCGCA',
  'GAGAGAGA',
  'AAC'
];

const ladder = [
  [
    {dna: 'ATTTGCATTG', pos: 0},
    {dna: 'GGCGTAAAT', pos: 12},
    {dna: 'GAGAGAGA', pos: 22}
  ],
  [
    {dna: 'AAC', pos: 2},
    {dna: 'TAACCCCGCA', pos: 6},
    {dna: 'TAATCT', pos: 18},
    {dna: 'CTCTA', pos: 28}
  ]
];

function printLadder(ladder) {
  ladder.forEach((side) => {
    let out = '';
    side.forEach((seq) => {
      const spc = seq.pos - out.length;
      out += new Array(spc+1).join(' ');
      out += seq.dna;
    });
    console.log(out);
  });
}

printLadder(ladder);
