export function capitalize(text: string) {
  if (typeof text === 'string') {
    return text.substr(0, 1).toUpperCase() + text.substr(1).toLowerCase();
  }

  return text;
}
