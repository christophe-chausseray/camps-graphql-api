import { createCommentItem } from '../../../../../../domain/camping/model/read';

test('It creates a comment item from values', () => {
  const commentItem = createCommentItem(
    'f07889de-9eed-4c3a-8ba9-13519eece8c6',
    'An amazing camping',
    'I had a beautiful time in this awesome camping',
    'jean'
  );

  expect(commentItem).toStrictEqual({
    id: 'f07889de-9eed-4c3a-8ba9-13519eece8c6',
    title: 'An amazing camping',
    description: 'I had a beautiful time in this awesome camping',
    author: 'jean',
  });
});

test('It cannot create a comment item with id nullable', () => {
  expect(() => {
    createCommentItem(
      null,
      'An amazing camping',
      'I had a beautiful time in this awesome camping',
      'jean'
    );
  }).toThrow('An id cannot be null when creating a comment item');
});

test('It cannot create a comment item with title nullable', () => {
  expect(() => {
    createCommentItem(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      null,
      'I had a beautiful time in this awesome camping',
      'jean'
    );
  }).toThrow('A title cannot be null when creating a comment item');
});

test('It cannot create a comment item with description nullable', () => {
  expect(() => {
    createCommentItem(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      'An amazing camping',
      null,
      'jean'
    );
  }).toThrow('A description cannot be null when creating a comment item');
});

test('It cannot create a comment item with author nullable', () => {
  expect(() => {
    createCommentItem(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      'An amazing camping',
      'I had a beautiful time in this awesome camping',
      null
    );
  }).toThrow('An author cannot be null when creating a comment item');
});
