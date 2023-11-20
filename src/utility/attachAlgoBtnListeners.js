import { algoBtns } from "./querySelectors.js";
import bubbleSort from "./bubbleSort.js";
import startAnimation from "./startAnimation.js";
import ALGO_DATA from "./globalVar.js";
import insertSort from "./insertSort.js";

const attachAlgoBtnListeners = () => {
  algoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let pairMoves;
      let currentMove;
      if (btn.id === "bubble-sort-btn") {
        pairMoves = bubbleSort();
        currentMove = ALGO_DATA.bubble.currentMove;
        ALGO_DATA.algoRunning = 'bubble'
      } else if (btn.id === "insert-sort-btn") {
        pairMoves = insertSort();
        currentMove = ALGO_DATA.insert.currentMove;
        ALGO_DATA.algoRunning = 'insert'
      }

      startAnimation({ pairMoves, currentMove, direction: true });
    });
  });
};

export default attachAlgoBtnListeners;
