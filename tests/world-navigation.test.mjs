import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findPath, EDGES, SPOTS } from '../scenes/world/navigation.ts';
test('all named spots are reachable through valid deck edges',()=>{
 for(const from of Object.keys(SPOTS))for(const to of Object.keys(SPOTS)){
  if(from===to)continue;const route=findPath(from,to);assert.equal(route.at(-1),to);let at=from;
  for(const next of route){assert.ok(EDGES[at].includes(next));at=next;}
 }
});
test('nearby workbench and radio use a direct route',()=>{assert.deepEqual(findPath('projects','contact'),['contact']);});
test('invalid or identical spots do not create routes',()=>{assert.deepEqual(findPath('missing','home'),[]);assert.deepEqual(findPath('home','home'),[]);});
