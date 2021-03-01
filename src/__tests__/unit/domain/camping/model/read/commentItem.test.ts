import { createCommentItem } from '../../../../../../domain/camping/model/read';

test('It creates a comment item from values', () => {
  const commentItem = createCommentItem(
    'f07889de-9eed-4c3a-8ba9-13519eece8c6',
    'An amazing camping',
    'I had a beautiful time in this awesome camping',
    'jean',
    '2021-03-01'
  );

  expect(commentItem).toStrictEqual({
    id: 'f07889de-9eed-4c3a-8ba9-13519eece8c6',
    title: 'An amazing camping',
    description: 'I had a beautiful time in this awesome camping',
    author: 'jean',
    created_at: '2021-03-01',
  });
});

test('It cannot create a comment item with id nullable', () => {
  expect(() => {
    createCommentItem(
      null,
      'An amazing camping',
      'I had a beautiful time in this awesome camping',
      'jean',
      '2021-03-01'
    );
  }).toThrow('An id cannot be null when creating a comment item');
});

test('It cannot create a comment item with title nullable', () => {
  expect(() => {
    createCommentItem(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      null,
      'I had a beautiful time in this awesome camping',
      'jean',
      '2021-03-01'
    );
  }).toThrow('A title cannot be null when creating a comment item');
});

test('It cannot create a comment item with description nullable', () => {
  expect(() => {
    createCommentItem(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      'An amazing camping',
      null,
      'jean',
      '2021-03-01'
    );
  }).toThrow('A description cannot be null when creating a comment item');
});

test('It cannot create a comment item with author nullable', () => {
  expect(() => {
    createCommentItem(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      'An amazing camping',
      'I had a beautiful time in this awesome camping',
      null,
      '2021-03-01'
    );
  }).toThrow('An author cannot be null when creating a comment item');
});

test('It cannot create a comment item with created_at nullable', () => {
  expect(() => {
    createCommentItem(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      'An amazing camping',
      'I had a beautiful time in this awesome camping',
      'jean',
      null
    );
  }).toThrow('A created_at cannot be null when creating a comment item');
});
