import { ALGO_DATA, ANIMATION_DATA } from "./globalVar.js";
import { numberBlocks } from "./getElements.js";
import {
  numbersDiv,
  trackingBar,
  trackingCurrentPosition,
} from "./querySelectors.js";
import { clearTimeouts } from "./clearAsync.js";
import { pauseBtn, reverseBtn } from "./querySelectors.js";

const animationSetup = async ({ pairMoves, direction }) => {
  const { animationTimeouts } = ANIMATION_DATA;

  let trackingVelocity = direction ? 1 : 0;
  pauseBtn.style.display = "block";
  reverseBtn.style.display = "block";

  console.log(pairMoves.length)

  clearTimeouts(animationTimeouts);

  const startAnimation = async () => {
    let index = ALGO_DATA.currentMove;
    if (index < pairMoves.length && index >= 0) {
      let blockOne = numberBlocks[pairMoves[index].start];
      let blockTwo = numberBlocks[pairMoves[index].end];

      highlightMovingBlocks(blockOne, blockTwo);
      updateTrackingBar(pairMoves.length, index + trackingVelocity);
      await delayMS(500);

      if (pairMoves[index].change) await animateMove(blockOne, blockTwo);
      else removeHighlight(blockOne, blockTwo);

      ALGO_DATA.currentMove = direction ? ++index : --index;
      console.log(ALGO_DATA.currentMove)
      ANIMATION_DATA.animationTimeouts.push(setTimeout(startAnimation, 500));
    } else {
      pauseBtn.style.display = "none";
      reverseBtn.style.display = "none";
    }
  };

  ANIMATION_DATA.animationTimeouts.push(setTimeout(startAnimation, 250));
};

const animateMove = async (blockOne, blockTwo) => {
  const { animationSpeedMS } = ANIMATION_DATA;
  await moveBlocks(blockOne, blockTwo);
  await delayMS(500);
  await switchBlocks(blockOne, blockTwo);
  removeHighlight(blockOne, blockTwo);
};

const updateTrackingBar = (length, i) => {
  const { animationSpeedMS } = ANIMATION_DATA;
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
  const { animationTimeouts } = ANIMATION_DATA;
  return new Promise((res) => {
    animationTimeouts.push(
      setTimeout(() => {
        res();
      }, ms)
    );
  });
};

const moveBlocks = (_blockOne, _blockTwo) => {
  const { animationTimeouts, animationSpeedMS } = ANIMATION_DATA;
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
  const { animationTimeouts, animationSpeedMS } = ANIMATION_DATA;

  return new Promise((res) => {
    animationTimeouts.push(
      setTimeout(() => {
        _blockOne.style.transform = "none";
        _blockTwo.style.transform = "none";
        _blockOne.classList.remove("transform-transition");
        _blockTwo.classList.remove("transform-transition");
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

const removeHighlight = (_blockOne, _blockTwo) => {
  _blockOne.classList.remove("highlight-blocks");
  _blockTwo.classList.remove("highlight-blocks");
};

export default animationSetup;
