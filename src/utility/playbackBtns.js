import { pauseBtn, reverseBtn } from "./querySelectors.js";
import ALGO_DATA from "./globalVar.js";
import startAnimation from "./startAnimation.js";
import { clearIntervals, clearTimeouts } from "./clearAsync.js";
import { numberBlocks } from "./getElements.js";

const playbackBtns = () => {
  pauseBtn.addEventListener("click", () => {
    if (pauseBtn.innerText === "PAUSE") {
      clearIntervals(ALGO_DATA.animationIntervals);
      clearTimeouts(ALGO_DATA.animationTimeouts);
      pauseBtn.innerText = "RESUME";
    } else if (pauseBtn.innerText === "RESUME") {
      pauseBtn.innerText = "PAUSE";
      const currentAlgo =
        ALGO_DATA.algoRunning === "bubble"
          ? ALGO_DATA.bubble
          : ALGO_DATA.insert;

      startAnimation({
        pairMoves: currentAlgo.pairMoves,
        currentMove: currentAlgo.currentMove,
        direction: true,
      });
    }
  });

  // reverseBtn.addEventListener("click", () => {
  //   const currentAlgo =
  //     ALGO_DATA.algoRunning === "bubble" ? ALGO_DATA.bubble : ALGO_DATA.insert;

  //   [...numberBlocks].forEach((block) =>
  //     block.classList.remove("highlight-blocks")
  //   );
  //   startAnimation({
  //     pairMoves: currentAlgo.pairMoves,
  //     currentMove: currentAlgo.currentMove,
  //     direction: false,
  //   });
  // });
};

export default playbackBtns;
