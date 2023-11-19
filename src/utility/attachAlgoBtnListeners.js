import { algoBtns } from "./querySelectors.js";
import bubbleSort from "./bubbleSort.js";
import startAnimation from "./startAnimation.js";
import globalVar from "./globalVar.js";

const attachAlgoBtnListeners = () => {
  algoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let moves;
      if (btn.id === "bubble-sort-btn") {
        moves = bubbleSort();
      }
      
      startAnimation(moves)
    });
  });
}

export default attachAlgoBtnListeners