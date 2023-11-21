import { algoBtns } from "./querySelectors.js";
import bubbleSort from "./bubbleSort.js";
import animationSetup from "./animationSetup.js";
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
      animationSetup({ pairMoves, direction: true });
    });
  });
};

export default attachAlgoBtnListeners;
