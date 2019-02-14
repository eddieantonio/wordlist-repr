import test from 'ava';
import fs from 'fs';

import {loadWordList} from '../libwordlist';
import simpleArray, {name} from '../algorithms/simple-array';

test.beforeEach(async t => {
  t.context.wordlist = await loadWordList('./build/SaanichWordFreq.raw-wordlist.js');
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

test(`lookup entire dictionary`, t => {
  let serialized = fs.readFileSync(`./build/SaanichWordFreq.${name}.js`);
  let dataStructure = simpleArray.load(serialized);
  /* Warning: this is O(n²). */
  for (let {word} of t.context.wordlist.wordlist) {
    let results = Array.from(simpleArray.lookup(dataStructure, word));
    t.true(results.includes(word));
  }
});

function first(iterable) {
  let {done, value} = iterable.next();
  if (done) {
    throw new RangeError('Did not produce an item');
  }
  return value;
}
