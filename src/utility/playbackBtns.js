import { pauseBtn, reverseBtn } from "./querySelectors.js";
import { ALGO_DATA, ANIMATION_DATA } from "./globalVar.js";
import animationSetup from "./animationSetup.js";
import { clearIntervals, clearTimeouts } from "./clearAsync.js";

const playbackBtns = () => {
  pauseBtn.addEventListener("click", () => {
    if (pauseBtn.innerText === "PAUSE") {
      clearTimeouts(ANIMATION_DATA.animationTimeouts);
      pauseBtn.innerText = "RESUME";
    } else if (pauseBtn.innerText === "RESUME") {
      pauseBtn.innerText = "PAUSE";

      animationSetup({
        pairMoves: ALGO_DATA.pairMoves,
        currentMove: ALGO_DATA.currentMove,
        direction: true,
      });
    }
  });

  reverseBtn.addEventListener("click", () => {
    animationSetup({
      pairMoves: ALGO_DATA.pairMoves,
      direction: false,
    });
  });
};

export default playbackBtns;
