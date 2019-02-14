import test from 'ava';
import fs from 'fs';

import {loadWordList} from '../libwordlist';
import simpleArray, {name} from '../algorithms/simple-array';

test.beforeEach(async t => {
  t.context.wordlist = await loadWordList('./build/SaanichWordFreq.raw-wordlist.js', 'UTF-8');
});

test(`building`, t => {
  let wordlist = t.context.wordlist;
  let dataStructure = simpleArray.build(wordlist);
  // Assertions specific to this data structure.
  t.true(Array.isArray(dataStructure));
  t.is(dataStructure.length, wordlist.wordlist.length);
});

test(`serializing`, t => {
  let dataStructure = simpleArray.build(t.context.wordlist);
  let serialized = simpleArray.serialize(dataStructure);
  t.true(typeof serialized === 'string');
});

test(`loading`, t => {
  let dataStructure = simpleArray.build(t.context.wordlist);
  let serialized = simpleArray.serialize(dataStructure);
  t.deepEqual(simpleArray.load(serialized), dataStructure);
});

/* TODO: Test that we can lookup every element in in it */
test.todo(`[${name}]: lookup`);
