const encode = (text) => Buffer.from(text).toString('base64');

const decode = (cursor) => Buffer.from(cursor, 'base64').toString('ascii');

module.exports = { encode, decode };
