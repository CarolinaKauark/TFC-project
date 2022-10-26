import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

const checkPassword = (bodyPassword: string, userPassword: string): boolean =>
  compareSync(bodyPassword, userPassword);

const crypto = (bodyPassword: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(bodyPassword, salt);
  return hash;
};

export { checkPassword, crypto };
