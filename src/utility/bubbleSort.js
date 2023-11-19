import globalVar from "./globalVar.js";

const bubbleSort = () => {
  const { initialArr, bubbleMoves } = globalVar;
  bubbleMoves.length = 0

  for (let i = 0; i < initialArr.length; i++) {
    for (let j = 0; j < initialArr.length - i - 1; j++) {
      if (initialArr[j] > initialArr[j + 1]) {
        bubbleMoves.push(j + 1, j);
        [initialArr[j], initialArr[j + 1]] = [initialArr[j + 1], initialArr[j]];
      }
    }
  }

  return bubbleMoves;
};

export default bubbleSort;
