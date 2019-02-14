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

const libwordlist = require('./libwordlist.js');
const fs = require('fs');

main().catch(err => {
  console.error(err);
  process.exit(1);
});

async function main () {
  // ad hoc command line parsing
  let [_node, _scriptName, subcommand, ...options] = process.argv;

  if (subcommand === 'build-raw-wordlist') {
    // Build a dumb wordlist.
    let [flag, outfile, infile] = options;
    if (flag !== '-o' || !outfile || !infile) {
      throw new Error('invalid command line');
    }
    await createWordlist(infile, outfile);

  } else if (subcommand === 'build') {
    // Delegate to an algorithm.
    let [algorithm, flag, outfile, infile] = options;
    if (!algorithm || flag !== '-o' || !outfile || !infile) {
      throw new Error(`invalid command line: ${options.join(' ')}`);
    }

    let {build, serialize} = require(`./algorithms/${algorithm}`);

    let wordlist = await libwordlist.loadWordList(infile);
    let dataStructure = build(wordlist);
    await fs.promises.writeFile(outfile, serialize(dataStructure), 'UTF-8');

  } else {
    throw new Error(`invalid subcommand: '${subcommand}'`);
  }
}

async function createWordlist(infile, outfile) {
  let wordlist = await libwordlist.buildWordList(infile);
  fs.promises.writeFile(outfile, JSON.stringify(wordlist), 'UTF-8');
}

