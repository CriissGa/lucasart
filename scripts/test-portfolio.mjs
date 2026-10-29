import assert from 'node:assert/strict';
import {mergeCollections, collectionPath} from '../src/lib/portfolio-content.js';
import {ALL} from '../src/pages/api/contact.js';

const localPhoto = {src: '/local.webp'};
const defaults = ['concerts', 'portraits', 'street'].map((id) => ({id, title: id, cover: localPhoto, photos: [localPhoto]}));
const remotePhoto = {asset: {_ref: 'image-abc-1200x800-jpg'}};
const published = [
  {_id: 'newest', title: 'Events and Nightlife', slug: 'events-and-nightlife', photos: [remotePhoto]},
  {_id: 'legacy', title: 'Concerts', category: 'concerts', photos: [remotePhoto]},
  {_id: 'older', title: 'Old concerts', category: 'concerts', photos: []},
  {_id: 'drafts.hidden', title: 'Hidden draft', slug: 'hidden', photos: [remotePhoto]},
];
const merged = mergeCollections(published, defaults);
assert.equal(merged.length, 4);
assert.equal(merged.find((item) => item.id === 'concerts').title, 'Concerts');
assert.equal(merged.find((item) => item.id === 'events-and-nightlife').photos[0].fallback.src, '/local.webp');
assert.equal(merged.some((item) => item.id === 'hidden'), false);
assert.deepEqual(mergeCollections([], defaults), defaults);
assert.equal(collectionPath({title: 'Events and Nightlife'}), 'events-and-nightlife');
assert.equal(collectionPath({category: 'portraits', title: 'Portraits renamed'}), 'portraits');
assert.equal(collectionPath({slug: 'new-url', category: 'portraits'}), 'new-url');

const methodResponse = await ALL({request: new Request('https://example.com/api/contact')});
assert.equal(methodResponse.status, 405);
assert.equal(methodResponse.headers.get('Allow'), 'POST');
const originResponse = await ALL({request: new Request('https://example.com/api/contact', {method: 'POST', headers: {origin: 'https://other.example', 'content-type': 'application/json'}, body: '{}'})});
assert.equal(originResponse.status, 403);
const honeypotResponse = await ALL({request: new Request('https://example.com/api/contact', {method: 'POST', headers: {origin: 'https://example.com', 'content-type': 'application/json'}, body: '{"website":"spam"}'})});
assert.equal(honeypotResponse.status, 200);
console.log('PASS: dynamic collection URLs, legacy categories, local backups, draft exclusion, deduplication and Astro contact endpoint.');
