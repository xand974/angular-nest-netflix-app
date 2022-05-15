export const checkEmailValid = (email: string): boolean => {
  if (!email || email === '') return false;
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (email.match(pattern)) return true;
  return false;
};
