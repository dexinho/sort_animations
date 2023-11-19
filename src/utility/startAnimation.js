import globalVar from "./globalVar.js";
import { numberBlocks } from "./getElements.js";
import { numbersDiv } from "./querySelectors.js";

const startAnimation = async (pairMoves) => {
  clearAnimationTimeouts();

  for (let i = 0; i < pairMoves.length; i += 2) {
    const blockOne = numberBlocks[pairMoves[i]];
    const blockTwo = numberBlocks[pairMoves[i + 1]];
    highlightMovingBlocks(blockOne, blockTwo);
    await delayMS(250);
    await moveBlocks(blockOne, blockTwo);
    await delayMS(250);
    await switchBlocks(blockOne, blockTwo);
    await delayMS(250);
  }
};

const clearAnimationTimeouts = () => {
  const { animationTimeouts } = globalVar;
  for (const id of animationTimeouts) clearTimeout(id);
  animationTimeouts.length = 0;
};

const highlightMovingBlocks = (_blockOne, _blockTwo) => {
  _blockOne.classList.add("highlight-blocks");
  _blockTwo.classList.add("highlight-blocks");
};

const delayMS = (ms) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};

const moveBlocks = (_blockOne, _blockTwo) => {
  const { animationTimeouts } = globalVar;
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
      }, 500)
    );
  });
};

const switchBlocks = (_blockOne, _blockTwo) => {
  const { animationTimeouts } = globalVar;

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
      }, 500)
    );
  });
};

export default startAnimation;
