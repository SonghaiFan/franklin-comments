import test from 'node:test';
import assert from 'node:assert/strict';
import { isSonghaiOrigin, songhai } from '../lib/songhai.ts';

test('only the production sites and explicit local preview origins may receive login sessions', () => {
  for (const url of [
    'https://songhai.site/?lang=zh',
    'https://blog.songhai.site/zh/blog/posts/example#comments',
    'https://comments.songhai.site/',
    'http://127.0.0.1:4174/',
    'http://127.0.0.1:5173/',
    'http://127.0.0.1:4181/',
  ])
    assert.equal(isSonghaiOrigin(url), true, url);
  for (const url of [
    'https://songhai.site.evil.example/',
    'https://songhai.site@evil.example/',
    'https://evil.example@songhai.site/',
    'http://songhai.site/',
    'https://songhai.site:444/',
    'http://127.0.0.1:9999/',
    'javascript:alert(1)',
    'data:text/html,hello',
    '/relative',
    '',
  ])
    assert.equal(isSonghaiOrigin(url), false, url);
});

test('self-hosted service keeps the existing discussion repository and category', () => {
  assert.deepEqual(songhai, {
    repo: 'SonghaiFan/website',
    repoId: 'R_kgDOVYyQ6Q',
    categoryId: 'DIC_kwDOVYyQ6c4DJyNw',
  });
});
