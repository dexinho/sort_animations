import { algoBtns } from "./querySelectors.js";
import bubbleSort from "./bubbleSort.js";
import startAnimation from "./startAnimation.js";
import insertSort from "./insertSort.js";

const attachAlgoBtnListeners = () => {
  algoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let pairMoves;
      if (btn.id === "bubble-sort-btn") {
        pairMoves = bubbleSort();
      } else if (btn.id === "insert-sort-btn") {
        pairMoves = insertSort();
      }

      algoBtns.forEach(button => button.style.display = 'none')
      startAnimation({ pairMoves, direction: true });
    });
  });
};

export default attachAlgoBtnListeners;
