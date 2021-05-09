export function encode(text: string) {
  return Buffer.from(text).toString('base64');
}

export function decode(cursor: string) {
  return Buffer.from(cursor, 'base64').toString('ascii');
}
