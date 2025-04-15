import { typeList } from '../../constants/contacts.js';

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

export const parseContactsFilterParams = ({ contactType, isFavourite }) => {
  const parsedContactType = typeList.includes(contactType)
    ? contactType
    : undefined;

  const parsedIsFavourite = parseBoolean(isFavourite);
  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
