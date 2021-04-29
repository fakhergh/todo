const comment = require('./comment');
const task = require('./task');
const user = require('./user');

module.exports = { ...comment, ...task, ...user };
