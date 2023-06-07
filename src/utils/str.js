export function stringSplice(str, start, deleteCount, insert) {
  const chars = str.split("");
  const removed = chars.splice(start, deleteCount);

  if (insert) {
    chars.splice(start, 0, insert);
  }

  const result = chars.join("");
  return {
    result: result,
    removed: removed.join(""),
  };
}
