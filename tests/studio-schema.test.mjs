import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULTS, EDITIONS, cleanStudio, encodeEdition, decodeEdition } from '../store/studio-schema.ts';
test('every edition survives a share-link round trip',()=>{
 for(const edition of EDITIONS) assert.deepEqual(decodeEdition(encodeEdition(edition.settings)),edition.settings);
});
test('malformed, oversized, unsupported, and injected editions are ignored',()=>{
 for(const value of [null,'invalid','x'.repeat(1025),btoa(JSON.stringify({v:99})),btoa(JSON.stringify({...DEFAULTS,v:1,ink:'<script>'}))])assert.equal(decodeEdition(value),null);
});
test('invalid saved fields reset without losing valid preferences',()=>{
 assert.deepEqual(cleanStudio({ink:'bad',motion:'off',droneTrail:false}),{...DEFAULTS,motion:'off',droneTrail:false});
 assert.deepEqual(cleanStudio(null),DEFAULTS);
});
