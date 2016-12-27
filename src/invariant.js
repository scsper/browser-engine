export default function invariant(condition, errorMessage) {
  if (!condition) {
    throw new Error(errorMessage);
  }
}
