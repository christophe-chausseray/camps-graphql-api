import { createCommentIdentifier } from '../../../../../domain/camping/valueObject';

test('It creates a CommentIdentifier from a string', () => {
  const commentIdentifier = createCommentIdentifier(
    'f07889de-9eed-4c3a-8ba9-13519eece8c6'
  );

  expect(commentIdentifier).toEqual({
    id: 'f07889de-9eed-4c3a-8ba9-13519eece8c6',
  });
});

test('It cannot create a CommentIdentifier with an identifier nullable', () => {
  expect(() => {
    createCommentIdentifier(null);
  }).toThrow('An identifier cannot be null when creating a CommentIdentifier');
});
