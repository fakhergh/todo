function capitalize(text) {
  if (typeof text === 'string') {
    return text.substr(0, 1).toUpperCase() + text.substr(1).toLowerCase();
  }

  return text;
}

module.exports = { capitalize };
