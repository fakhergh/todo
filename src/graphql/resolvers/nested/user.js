const { capitalize } = require('../../../utils/formatter');

module.exports = {
  displayName: (user) =>
    capitalize(user.firstName) + ' ' + capitalize(user.lastName),
};
