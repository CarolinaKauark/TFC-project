import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

const checkPassword = (bodyPassword: string, userPassword: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(bodyPassword, salt);
  return compareSync(userPassword, hash);
};

export default checkPassword;
