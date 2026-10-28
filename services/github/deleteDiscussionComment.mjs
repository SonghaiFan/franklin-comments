export async function deleteDiscussionComment(id, token, request = fetch) {
  if (!token || typeof id !== 'string' || !id)
    throw new Error('A signed-in user and comment ID are required.');
  const response = await request('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query:
        'mutation($id: ID!) { deleteDiscussionComment(input: {id: $id}) { clientMutationId } }',
      variables: { id },
    }),
  });
  const result = await response.json();
  if (!response.ok || result.errors?.length || !result.data?.deleteDiscussionComment)
    throw new Error('GitHub could not delete this comment.');
}
