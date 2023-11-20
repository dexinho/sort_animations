import ALGO_DATA from "./globalVar.js";
import { numberBlocks } from "./getElements.js";
import {
  numbersDiv,
  trackingBar,
  trackingCurrentPosition,
} from "./querySelectors.js";
import { clearIntervals, clearTimeouts } from "./clearAsync.js";
import { pauseBtn, reverseBtn } from "./querySelectors.js";

const startAnimation = async ({ pairMoves, currentMove, direction }) => {
  const { animationSpeedMS, animationIntervals, animationTimeouts } = ALGO_DATA;

  let index = currentMove;
  let blockOne = numberBlocks[pairMoves[index]];
  let blockTwo = numberBlocks[pairMoves[index + 1]];
  pauseBtn.style.display = "block";
  // reverseBtn.style.display = "block"; 

  console.log("current move", index);

  clearIntervals(animationIntervals);
  clearTimeouts(animationTimeouts);
  animateMove(blockOne, blockTwo);
  startTrackingBar(pairMoves.length / 2, index / 2 + 1);

  const currentAlgo =
    ALGO_DATA.algoRunning === "bubble" ? ALGO_DATA.bubble : ALGO_DATA.insert;

  const animateInterval = setInterval(() => {
    index = direction ? index + 2 : index - 2;
    currentAlgo.currentMove = index;

    if (index < pairMoves.length && index > 0) {
      let blockOne = numberBlocks[pairMoves[index]];
      let blockTwo = direction
        ? numberBlocks[pairMoves[index + 1]]
        : numberBlocks[pairMoves[index - 1]];

      animateMove(blockOne, blockTwo);
      startTrackingBar(pairMoves.length / 2, index / 2 + 1);
    } else {
      pauseBtn.style.display = "none";
      // reverseBtn.style.display = "none";
      clearInterval(animateInterval);
    }
  }, animationSpeedMS);

  ALGO_DATA.animationIntervals.push(animateInterval);
};

const animateMove = async (blockOne, blockTwo) => {
  const { animationSpeedMS } = ALGO_DATA;
  highlightMovingBlocks(blockOne, blockTwo);
  await delayMS(animationSpeedMS / 6);
  await moveBlocks(blockOne, blockTwo);
  await delayMS(animationSpeedMS / 6);
  await switchBlocks(blockOne, blockTwo);
};

const startTrackingBar = (length, i) => {
  const { animationSpeedMS } = ALGO_DATA;
  const trackingBarWidth = parseInt(getComputedStyle(trackingBar).width, 10);
  const trackerWidth = parseInt(
    getComputedStyle(trackingCurrentPosition).width,
    10
  );
  trackingCurrentPosition.style.transition = `transform ${
    animationSpeedMS / 1000
  }s linear`;
  trackingCurrentPosition.style.transform = `translate(${
    (trackingBarWidth / length) * i - trackerWidth
  }px, 0)`;
};

const highlightMovingBlocks = (_blockOne, _blockTwo) => {
  _blockOne.classList.add("highlight-blocks");
  _blockTwo.classList.add("highlight-blocks");
};

const delayMS = (ms) => {
  const { animationTimeouts } = ALGO_DATA;
  return new Promise((res) => {
    animationTimeouts.push(
      setTimeout(() => {
        res();
      }, ms)
    );
  });
};

const moveBlocks = (_blockOne, _blockTwo) => {
  const { animationTimeouts, animationSpeedMS } = ALGO_DATA;
  const computeStyleBlock = getComputedStyle(_blockOne);
  const computedStyleDiv = getComputedStyle(numbersDiv);
  const blockWidth = parseInt(computeStyleBlock.width, 10);
  const divGap = parseInt(computedStyleDiv.gap, 10);

  return new Promise((res) => {
    animationTimeouts.push(
      setTimeout(() => {
        _blockOne.classList.add("transform-transition");
        _blockTwo.classList.add("transform-transition");
        _blockOne.style.transform = `translate(-${blockWidth + divGap}px, 0)`;
        _blockTwo.style.transform = `translate(${blockWidth + divGap}px, 0)`;
        res();
      }, animationSpeedMS / 4)
    );
  });
};

const switchBlocks = (_blockOne, _blockTwo) => {
  const { animationTimeouts, animationSpeedMS } = ALGO_DATA;

  return new Promise((res) => {
    animationTimeouts.push(
      setTimeout(() => {
        _blockOne.classList.remove("transform-transition");
        _blockTwo.classList.remove("transform-transition");
        _blockOne.classList.remove("highlight-blocks");
        _blockTwo.classList.remove("highlight-blocks");
        _blockOne.style.transform = "none";
        _blockTwo.style.transform = "none";
        [_blockOne.innerText, _blockTwo.innerText] = [
          _blockTwo.innerText,
          _blockOne.innerText,
        ];

        [_blockOne.style.height, _blockTwo.style.height] = [
          _blockTwo.style.height,
          _blockOne.style.height,
        ];
        res();
      }, animationSpeedMS / 4)
    );
  });
};

export default startAnimation;
