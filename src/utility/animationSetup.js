import { ALGO_DATA, ANIMATION_DATA } from "./globalVar.js";
import { numberBlocks } from "./getElements.js";
import {
  numbersDiv,
  trackingBar,
  trackingCurrentPosition,
} from "./querySelectors.js";
import { pauseBtn, reverseBtn } from "./querySelectors.js";

const animationSetup = async ({ pairMoves, isDirectionForward }) => {
  const { delay, totalDelay } = ANIMATION_DATA;
  let trackingDirection = isDirectionForward ? 1 : 0;
  pauseBtn.style.display = "block";
  reverseBtn.style.display = "block";

  // setInterval(() => {
  //   console.log(ANIMATION_DATA.isDirectionReversable);
  // }, 10);

  const startAnimation = async () => {
    try {
      ANIMATION_DATA.isAnimationInProgress = false;
      let index = ALGO_DATA.currentMove;
      if (index < pairMoves.length && index >= 0 && !ANIMATION_DATA.isAnimationPaused) {
        let blockOne = numberBlocks[pairMoves[index].start];
        let blockTwo = numberBlocks[pairMoves[index].end];

        updateTrackingBar({
          totalElements: pairMoves.length,
          index: index + trackingDirection,
          delay: totalDelay / pairMoves.length,
        });
        highlightMovingBlocks(blockOne, blockTwo);
        await delayMS(delay);
        if (pairMoves[index].change) {
          await animateMove(blockOne, blockTwo);
        } else removeHighlight(blockOne, blockTwo);

        ALGO_DATA.currentMove = isDirectionForward ? ++index : --index;
        ANIMATION_DATA.animationTimeouts.push(
          setTimeout(startAnimation, delay)
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      ANIMATION_DATA.isAnimationInProgress = true;
    }
  };
  startAnimation();
};

const totalAnimationDelay = () => {
  const { pairMoves } = ALGO_DATA;
  pairMoves.forEach((move) => {
    if (move.change) ANIMATION_DATA.totalDelay += ANIMATION_DATA.delay * 4;
    else ANIMATION_DATA.totalDelay += ANIMATION_DATA.delay;
  });
};

const animateMove = async (blockOne, blockTwo) => {
  const { delay } = ANIMATION_DATA;
  await moveBlocks(blockOne, blockTwo);
  await delayMS(delay);
  await switchBlocks(blockOne, blockTwo);
  removeHighlight(blockOne, blockTwo);
};

const updateTrackingBar = ({ totalElements, index, delay }) => {
  const trackingBarWidth = parseInt(getComputedStyle(trackingBar).width, 10);
  const trackerWidth = parseInt(
    getComputedStyle(trackingCurrentPosition).width,
    10
  );
  let moveBy = Math.floor((trackingBarWidth / totalElements) * index);
  if (moveBy < 0 || moveBy + trackerWidth > trackingBarWidth)
    moveBy = index ? trackingBarWidth - trackerWidth : 0;

  trackingCurrentPosition.style.transition = `transform ${delay}ms linear`;
  trackingCurrentPosition.style.transform = `translate(${moveBy}px, 0)`;
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
        ANIMATION_DATA.totalDelay += ms;
        res();
      }, ms)
    );
  });
};

const moveBlocks = (_blockOne, _blockTwo) => {
  const { animationTimeouts, delay } = ANIMATION_DATA;
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
        ANIMATION_DATA.totalDelay += delay;
        res();
      }, delay)
    );
  });
};

const switchBlocks = (_blockOne, _blockTwo) => {
  const { animationTimeouts, delay } = ANIMATION_DATA;

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
        ANIMATION_DATA.totalDelay += delay;
        res();
      }, delay)
    );
  });
};

const removeHighlight = (_blockOne, _blockTwo) => {
  _blockOne.classList.remove("highlight-blocks");
  _blockTwo.classList.remove("highlight-blocks");
};

export { animationSetup, totalAnimationDelay };
