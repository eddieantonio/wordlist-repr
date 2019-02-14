import fs from 'fs';
import test from 'ava';

import {loadWordList, buildWordList, buildWordListFromString, loadWordListFromString} from '../libwordlist';

test('load a wordlist from a file', async t => {
  t.deepEqual(await buildWordList('./data/SaanichWordFreq.tsv'),
              await loadWordList('./build/SaanichWordFreq.raw-wordlist.js'));
});

test('load a wordlist from a string', async t => {
  let source = await fs.promises.readFile('./data/SaanichWordFreq.tsv', 'UTF-8');
  let built = await fs.promises.readFile('./build/SaanichWordFreq.raw-wordlist.js', 'UTF-8');
  
  t.deepEqual(buildWordListFromString(source),
              loadWordListFromString(built));
});
