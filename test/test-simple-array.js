import test from 'ava';

import {name} from '../algorithms/simple-array';

test(`${name}: name`, t => {
  t.truthy(name);
});
