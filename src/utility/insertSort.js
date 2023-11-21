import { ALGO_DATA } from "./globalVar.js";

const insertSort = () => {
  const { initialArr, pairMoves } = ALGO_DATA;

  for (let i = 1; i < initialArr.length; i++) {
    let moveCounter = 0;
    let currentElement = initialArr[i];
    let j = i - 1;

    if (initialArr[j] <= currentElement) {
      pairMoves.push({
        change: false,
        start: i,
        end: j,
      });
    }

    while (j >= 0 && initialArr[j] > currentElement) {
      initialArr[j + 1] = initialArr[j];
      pairMoves.push({
        change: true,
        start: i - moveCounter,
        end: j,
      });

      j--;
      moveCounter++;
    }

    initialArr[j + 1] = currentElement;
  }

  console.log(initialArr);

  return pairMoves;
};

export default insertSort;
