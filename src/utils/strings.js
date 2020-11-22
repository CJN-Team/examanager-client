export function capitalize(str) {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } catch (error) {
    return str;
  }
}
