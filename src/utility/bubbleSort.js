import { ALGO_DATA } from "./globalVar.js";

const bubbleSort = () => {
  const { initialArr, pairMoves } = ALGO_DATA;
  pairMoves.length = 0;

  for (let i = 0; i < initialArr.length; i++) {
    for (let j = 0; j < initialArr.length - i - 1; j++) {
      let change = false;
      if (initialArr[j] > initialArr[j + 1]) {
        change = true;
        [initialArr[j], initialArr[j + 1]] = [initialArr[j + 1], initialArr[j]];
      }

      pairMoves.push({
        change,
        start: j + 1,
        end: j,
      });
    }
  }

  return pairMoves;
};

export default bubbleSort;
