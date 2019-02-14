import test from 'ava';
import fs from 'fs';

import simpleArray, {name} from '../algorithms/simple-array';


test(`[${name}]: building`, t => {
  let contents = fs.readFileSync('./build/SaanichWordFreq.raw-wordlist.js', 'UTF-8');
  let dataStructure = simpleArray.build(contents);
  t.truthy(dataStructure); 
});

test.todo(`[${name}]: serialize`);

/* TODO: Test that we can lookup every element in in it */
test.todo(`[${name}]: lookup`);
