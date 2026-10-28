import test from 'node:test';
import assert from 'node:assert/strict';
import { deleteDiscussionComment } from '../services/github/deleteDiscussionComment.mjs';

test('deletion uses only the signed-in user token and the requested comment ID', async () => {
  let request;
  await deleteDiscussionComment('comment-id', 'test-user-token', async (url, options) => {
    request = { url, ...options };
    return {
      ok: true,
      json: async () => ({ data: { deleteDiscussionComment: { clientMutationId: null } } }),
    };
  });
  assert.equal(request.headers.Authorization, 'Bearer test-user-token');
  assert.deepEqual(JSON.parse(request.body).variables, { id: 'comment-id' });
  assert.match(JSON.parse(request.body).query, /deleteDiscussionComment/);
});

test('anonymous calls and GitHub permission failures cannot report successful deletion', async () => {
  await assert.rejects(() =>
    deleteDiscussionComment('comment-id', '', () => {
      throw Error('must not request');
    }),
  );
  await assert.rejects(() =>
    deleteDiscussionComment('comment-id', 'test-token', async () => ({
      ok: true,
      json: async () => ({ errors: [{ message: 'Forbidden' }] }),
    })),
  );
  await assert.rejects(() =>
    deleteDiscussionComment('comment-id', 'test-token', async () => ({
      ok: false,
      json: async () => ({ message: 'Bad credentials' }),
    })),
  );
});
