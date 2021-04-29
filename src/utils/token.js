const { sign, verify } = require('jsonwebtoken');

const options = { expiresIn: '7days' };

const generateToken = (payload) => sign(payload, process.env.JWT_KEY, options);

const ensureToken = (token) => verify(token, process.env.JWT_KEY);

module.exports = { generateToken, ensureToken };
