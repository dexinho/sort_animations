import { algoBtns } from "./querySelectors.js";
import bubbleSort from "./bubbleSort.js";
import { animationSetup } from "./animationSetup.js";
import insertSort from "./insertSort.js";
import { clearTimeouts } from "./clearAsync.js";
import { ANIMATION_DATA } from "./globalVar.js";
import { totalAnimationDelay } from "./animationSetup.js";

const attachAlgoBtnListeners = () => {
  algoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let pairMoves;
      ANIMATION_DATA.pause = false;
      if (btn.id === "bubble-sort-btn") {
        pairMoves = bubbleSort();
      } else if (btn.id === "insert-sort-btn") {
        pairMoves = insertSort();
      }

      algoBtns.forEach((button) => (button.style.display = "none"));
      totalAnimationDelay()
      clearTimeouts(ANIMATION_DATA.animationTimeouts);
      animationSetup({ pairMoves, isDirectionForward: true });
    });
  });
};

export default attachAlgoBtnListeners;
