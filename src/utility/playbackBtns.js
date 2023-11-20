import { pauseBtn, reverseBtn } from "./querySelectors.js";
import { ALGO_DATA, ANIMATION_DATA } from "./globalVar.js";
import startAnimation from "./startAnimation.js";
import { clearIntervals, clearTimeouts } from "./clearAsync.js";
import { numberBlocks } from "./getElements.js";

const playbackBtns = () => {
  pauseBtn.addEventListener("click", () => {
    if (pauseBtn.innerText === "PAUSE") {
      clearIntervals(ANIMATION_DATA.animationIntervals);
      clearTimeouts(ANIMATION_DATA.animationTimeouts);
      pauseBtn.innerText = "RESUME";
    } else if (pauseBtn.innerText === "RESUME") {
      pauseBtn.innerText = "PAUSE";

      startAnimation({
        pairMoves: ALGO_DATA.pairMoves,
        currentMove: ALGO_DATA.currentMove,
        direction: true,
      });
    }
  });

  reverseBtn.addEventListener("click", () => {
    [...numberBlocks].forEach((block) =>
      block.classList.remove("highlight-blocks")
    );
    clearIntervals(ANIMATION_DATA.animationIntervals);
    clearTimeouts(ANIMATION_DATA.animationTimeouts);
    setTimeout(() => {
      startAnimation({
        pairMoves: ALGO_DATA.pairMoves,
        currentMove: ALGO_DATA.currentMove,
        direction: false,
      });
    }, 1500);
  });
};

export default playbackBtns;
