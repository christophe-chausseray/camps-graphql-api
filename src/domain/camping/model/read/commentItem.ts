type CommentItem = {
  id: string;
  title: string;
  description: string;
  author: string;
};

function createCommentItem(
  id: string,
  title: string,
  description: string,
  author: string
): CommentItem {
  if (!id) {
    throw new Error('An id cannot be null when creating a comment item');
  }

  if (!title) {
    throw new Error('A title cannot be null when creating a comment item');
  }

  if (!description) {
    throw new Error(
      'A description cannot be null when creating a comment item'
    );
  }

  if (!author) {
    throw new Error('An author cannot be null when creating a comment item');
  }

  return Object.freeze({ id, title, description, author });
}

export { CommentItem, createCommentItem };
