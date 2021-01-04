import { createComment } from '../../../../../../domain/camping/model/write';

test('It creates a comment', () => {
  const comment = createComment(
    'f07889de-9eed-4c3a-8ba9-13519eece8c6',
    'An amazing camping',
    'I had a beautiful time in this awesome camping',
    'jean',
    '89a87075-977c-4905-8864-296ca8a458f1'
  );

  expect(comment).toEqual({
    id: 'f07889de-9eed-4c3a-8ba9-13519eece8c6',
    title: 'An amazing camping',
    description: 'I had a beautiful time in this awesome camping',
    author: 'jean',
    campingId: '89a87075-977c-4905-8864-296ca8a458f1',
  });
});

test('It cannot create a comment with the id nullable', () => {
  expect(() => {
    createComment(
      null,
      'An amazing camping',
      'I had a beautiful time in this awesome camping',
      'jean',
      '89a87075-977c-4905-8864-296ca8a458f1'
    );
  }).toThrow('An id cannot be null when creating a comment');
});

test('It cannot create a comment with the title nullable', () => {
  expect(() => {
    createComment(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      null,
      'I had a beautiful time in this awesome camping',
      'jean',
      '89a87075-977c-4905-8864-296ca8a458f1'
    );
  }).toThrow('A title cannot be null when creating a comment');
});

test('It cannot create a comment with the description nullable', () => {
  expect(() => {
    createComment(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      'An amazing camping',
      null,
      'jean',
      '89a87075-977c-4905-8864-296ca8a458f1'
    );
  }).toThrow('A description cannot be null when creating a comment');
});

test('It cannot create a comment with the author nullable', () => {
  expect(() => {
    createComment(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      'An amazing camping',
      'I had a beautiful time in this awesome camping',
      null,
      '89a87075-977c-4905-8864-296ca8a458f1'
    );
  }).toThrow('An author cannot be null when creating a comment');
});

test('It cannot create a comment with the campingId nullable', () => {
  expect(() => {
    createComment(
      'f07889de-9eed-4c3a-8ba9-13519eece8c6',
      'An amazing camping',
      'I had a beautiful time in this awesome camping',
      'jean',
      null
    );
  }).toThrow('A campingId cannot be null when creating a comment');
});
