import { genSaltSync, hashSync } from 'bcrypt';

export function hashPassword(password: string) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}
