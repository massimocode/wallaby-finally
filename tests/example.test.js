'use strict';

const test = require('tape');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const DIR = process.env.localProjectDir || path.join(__dirname, '../');
const FILE_NAME = path.join(DIR, 'results.txt');

test('Finally not always running...', wrap(function* (t) {
  try {
    yield Promise.all([
      delay(10).then(incrementCount),
      delay(20).then(incrementCount),
      delay(30).then(incrementCount),
      delay(10).then(incrementCount),
      delay(20).then(incrementCount),
      delay(30).then(incrementCount),
      delay(10).then(incrementCount),
      delay(20).then(incrementCount)
    ]);
    t.equal(getCount(), 8);
  } finally {
    yield delay(1000).then(resetCount);
  }
  t.end();
}));

function wrap(test) {
  return function(t) {
    Promise.coroutine(() => test(t))().then(() => {}, error => t.end(error));
  };
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function getCount() {
  return parseInt(fs.readFileSync(FILE_NAME, 'UTF-8'));
}

function incrementCount() {
  fs.writeFileSync(FILE_NAME, getCount() + 1);
}

function resetCount() {
  fs.writeFileSync(FILE_NAME, 0);
}