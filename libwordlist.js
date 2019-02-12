/*
 * Copyright (c) 2019 Eddie Antonio Santos <easantos@ualberta.ca>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const fs = require('fs');

exports.buildWordList = async function buildWordList(filename) {
  let contents = await fs.promises.readFile(filename, 'UTF-8');
  let totalTokens = 0;
  let list = [];

  // Collect all entries with their raw frequencies
  for (let line of contents.split('\n')) {
    let [word, freqText] = line.split('\t');
    let rawFrequency = parseInt(freqText, 10);
    if (!(rawFrequency >= 1)) {
      console.warn(`Skipping bad line: '${line.trim()}'`);
      continue;
    }
    list.push({ word, rawFrequency });
    totalTokens += rawFrequency;
  }

  // After we know the total weight of everything, we
  // can compute the negative log probability of all the things.
  for (let entry of list) {
    // Neg log prob allows us to add values to get the AND of two independent
    // probabilities.
    //
    // We can sort for most probable branch by visiting the lowest valued
    // branches first.
    entry.negLogProb = -Math.log(entry.rawFrequency / totalTokens);
  }

  return {
    total: totalTokens,
    wordlist: list
  };
};
