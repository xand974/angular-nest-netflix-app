export const checkEmailValid = (email: string): boolean => {
  if (!email || email === '') return false;
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (email.match(pattern)) return true;
  return false;
};

export const capitalize = (str: string) => {
  const firstLetter = str[0].toUpperCase();
  return ` ${firstLetter}${str.slice(1)}`;
};

export const formatGenres = (arr: string[]): string => {
  const genres = [...arr];
  let array = [];
  if (!genres || genres.length === 0) return '';
  for (const genre of genres) {
    const value = capitalize(genre);
    array.push(value);
  }
  return array.join(',');
};
