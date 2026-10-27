import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isNightWatch } from '../utils/watch.ts';
test('shared atlas and world night schedule runs from 18:00 to 06:00',()=>{
 for(const hour of [0,5,5.99,18,23])assert.equal(isNightWatch(hour),true);
 for(const hour of [6,12,17,17.99])assert.equal(isNightWatch(hour),false);
});
