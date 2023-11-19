import { algoBtns } from "./querySelectors.js";
import bubbleSort from "./bubbleSort.js";
import startAnimation from "./startAnimation.js";
import globalVar from "./globalVar.js";

const attachAlgoBtnListeners = () => {
  algoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "bubble-sort-btn") {
        globalVar.bubbleMoves = bubbleSort();
      }
      
      startAnimation(globalVar.bubbleMoves)
    });
  });
}

export default attachAlgoBtnListeners