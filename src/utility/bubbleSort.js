import globalVar from "./globalVar.js";

const bubbleSort = () => {
  const arrToSort = [...globalVar.initialArr];
  const bubbleMoves = globalVar.bubbleMoves;

  for (let i = 0; i < arrToSort.length; i++) {
    for (let j = 0; j < arrToSort.length - i - 1; j++) {
      if (arrToSort[j] > arrToSort[j + 1]) {
        bubbleMoves.push(j + 1, j);
        [arrToSort[j], arrToSort[j + 1]] = [arrToSort[j + 1], arrToSort[j]];
      }
    }
  }

  return bubbleMoves;
};

export default bubbleSort;
