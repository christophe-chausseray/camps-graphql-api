type Comment = {
  id: string;
  title: string;
  description: string;
  author: string;
  campingId: string;
};

function createComment(
  id: string,
  title: string,
  description: string,
  author: string,
  campingId: string
): Comment {
  if (!id) {
    throw new Error('An id cannot be null when creating a comment');
  }

  if (!title) {
    throw new Error('A title cannot be null when creating a comment');
  }

  if (!description) {
    throw new Error('A description cannot be null when creating a comment');
  }

  if (!author) {
    throw new Error('An author cannot be null when creating a comment');
  }

  if (!campingId) {
    throw new Error('A campingId cannot be null when creating a comment');
  }

  return Object.freeze({ id, title, description, author, campingId });
}

export { createComment };
