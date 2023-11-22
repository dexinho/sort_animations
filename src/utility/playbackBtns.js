import { pauseBtn, reverseBtn } from "./querySelectors.js";
import { ALGO_DATA, ANIMATION_DATA } from "./globalVar.js";
import { animationSetup } from "./animationSetup.js";
import { clearTimeouts } from "./clearAsync.js";

const playbackBtns = () => {
  pauseBtn.addEventListener("click", () => {
    if (pauseBtn.innerText === "PAUSE") {
      pauseBtn.innerText = "RESUME";
      ANIMATION_DATA.isAnimationPaused = true;
    } else if (pauseBtn.innerText === "RESUME") {
      pauseBtn.innerText = "PAUSE";
      ANIMATION_DATA.isAnimationPaused = false;
      animationSetup({
        pairMoves: ALGO_DATA.pairMoves,
        isDirectionForward: true,
      });
    }
  });

  reverseBtn.addEventListener("click", () => {
    let isDirectionForward = false;
    ANIMATION_DATA.isAnimationPaused = false;
    if (reverseBtn.innerText === "REVERSE") {
      pauseBtn.innerText = "PAUSE";
      reverseBtn.innerText = "FORWARD";
    } else if (reverseBtn.innerText === "FORWARD") {
      isDirectionForward = true;
      reverseBtn.innerText = "REVERSE";
    }

    ANIMATION_DATA.isAnimationPaused = true;

    const reverseDirection = () => {
      if (ANIMATION_DATA.isAnimationInProgress) {
        clearInterval(directionInterval);
        clearTimeouts(ANIMATION_DATA.animationTimeouts);
        ANIMATION_DATA.isAnimationPaused = false;
        ALGO_DATA.currentMove = isDirectionForward
          ? ++ALGO_DATA.currentMove
          : --ALGO_DATA.currentMove;
        animationSetup({
          pairMoves: ALGO_DATA.pairMoves,
          isDirectionForward,
        });
      }
    };
    const directionInterval = setInterval(reverseDirection, 1);
  });
};

export default playbackBtns;
