import test from 'ava';

import {loadWordList, buildWordList} from '../libwordlist';

test('load from a wordlist', async t => {
  t.deepEqual(await buildWordList('./data/SaanichWordFreq.tsv'),
              await loadWordList('./build/SaanichWordFreq.raw-wordlist.js'));
});
