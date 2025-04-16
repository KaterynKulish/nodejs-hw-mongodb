import { typeList } from '../../constants/contacts.js';

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

export const parseContactsFilterParams = ({ type, isFavourite }) => {
  const parsedContactType = typeList.includes(type) ? type : undefined;

  const parsedIsFavourite = parseBoolean(isFavourite);
  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
