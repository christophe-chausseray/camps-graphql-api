type CampingIdentifier = {
  id: string;
};

function createCampingIdentifierFromString(
  identifier: string
): CampingIdentifier {
  if (!identifier) {
    throw new Error(
      'An identifier cannot be null when creating a CampingIdentifier'
    );
  }

  return Object.freeze({ id: identifier });
}

export { CampingIdentifier, createCampingIdentifierFromString };
