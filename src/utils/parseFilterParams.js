const parseFilterType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);
  if (isType(contactType)) return contactType;
};

const parseFilterIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  const favourite = (isFavourite) => ['true', 'false'].includes(isFavourite);
  if (favourite(isFavourite)) return isFavourite;
};
export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseFilterType(contactType);
  const parsedIsFavourite = parseFilterIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
