type CommentIdentifier = {
  id: string;
};

function createCommentIdentifier(id: string): CommentIdentifier {
  if (!id) {
    throw new Error(
      'An identifier cannot be null when creating a CommentIdentifier'
    );
  }

  return Object.freeze({ id });
}

export { CommentIdentifier, createCommentIdentifier };
