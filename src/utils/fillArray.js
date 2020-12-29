export default function fill(requiredSize, initialSize) {
  const emptyProductSpace = requiredSize - initialSize;
  const emptyObject = {};
  const emptyProductArray = new Array(emptyProductSpace).fill(emptyObject);
  return emptyProductArray;
}
