import test from 'ava';
import fs from 'fs';

import {loadWordListFromString} from '../libwordlist';
import simpleArray, {name} from '../algorithms/simple-array';


test(`[${name}]: building`, t => {
  let contents = fs.readFileSync('./build/SaanichWordFreq.raw-wordlist.js', 'UTF-8');
  let wordlist = loadWordListFromString(contents);

  let dataStructure = simpleArray.build(wordlist);
  // Assertions specific to this data structure.
  t.true(Array.isArray(dataStructure));
  t.is(dataStructure.length, wordlist.wordlist.length);
});

test(`[${name}]: serialize`, t => {
  let contents = fs.readFileSync('./build/SaanichWordFreq.raw-wordlist.js', 'UTF-8');
  let wordlist = loadWordListFromString(contents);

  let dataStructure = simpleArray.build(wordlist);
  let serialized = simpleArray.serialize(dataStructure);
  t.true(typeof serialized === 'string');
});

/* TODO: Test that we can lookup every element in in it */
test.todo(`[${name}]: lookup`);
