import { ALGO_DATA } from "./globalVar.js";

const bubbleSort = () => {
  const { initialArr, pairMoves } = ALGO_DATA;
  pairMoves.length = 0;

  for (let i = 0; i < initialArr.length; i++) {
    for (let j = 0; j < initialArr.length - i - 1; j++) {
      if (initialArr[j] > initialArr[j + 1]) {
        pairMoves.push(j + 1, j);
        [initialArr[j], initialArr[j + 1]] = [initialArr[j + 1], initialArr[j]];
      }
    }
  }

  return pairMoves;
};

export default bubbleSort;
