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

exports.name = 'simple-array';
exports.doc = `
  Stores all words in a single array, ordered from most frequent word to least frequent word.
  Lookup is done linearly.

  Benefits:
    Very simple storage.
    Simple to implement.

  Best case lookup:   O(1)
  Worst case lookup:  O(n)
`;

/**
 * Returns an array of words, sorted in descending order of raw frequency.
 * That is, the most common words are first; the least common last.
 */
exports.build = function buildSimpleArray({wordlist}) {
  let sortedList = wordlist.sort((a, b) => {
    let aCount = a.rawFrequency;
    let bCount = b.rawFrequency;
    if (aCount > bCount) {
      return -1;
    } else if (aCount < bCount) {
      return 1;
    } else {
      // Asserting they're equal, because we might have those pesky NaNs.
      console.assert(aCount === bCount);
      return 0;
    }
  });

  return sortedList.map(({word}) => word);
};

/**
 * Serialization is a matter of saving as a JSON array.
 */
exports.serialize = function serializeSimpleArray(sortedArray) {
  return JSON.stringify(sortedArray);
}

/**
 * Loading is a matter of parsing the JSON. 
 */
exports.load = function loadSimpleArray(string) {
  return JSON.parse(string);
}
