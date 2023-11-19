import globalVar from "./globalVar.js";
import { numberBlocks } from "./getElements.js";
import { numbersDiv } from "./querySelectors.js";

const startAnimation = async (pairMoves) => {
  clearAnimationTimeouts();

  for (let i = 0; i < pairMoves.length; i += 2) {
    const blockOne = numberBlocks[pairMoves[i]];
    const blockTwo = numberBlocks[pairMoves[i + 1]];
    await moveBlocks(blockOne, blockTwo);
    await switchBlocks(blockOne, blockTwo);
  }
};

const clearAnimationTimeouts = () => {
  const { animationTimeouts } = globalVar;
  for (const id of animationTimeouts) clearTimeout(id);
  animationTimeouts.length = 0;
};

const moveBlocks = (blockOne, blockTwo) => {
  const { animationTimeouts } = globalVar;
  const computeStyleBlock = getComputedStyle(blockOne);
  const computedStyleDiv = getComputedStyle(numbersDiv)

  const blockWidth = parseInt(computeStyleBlock.width, 10);
  const divGap = parseInt(computedStyleDiv.gap, 10)
  return new Promise((res) => {
    animationTimeouts.push(
      setTimeout(() => {
        blockOne.classList.add("transform-transition");
        blockTwo.classList.add("transform-transition");
        blockOne.style.transform = `translate(-${blockWidth + divGap}px, 0)`;
        blockTwo.style.transform = `translate(${blockWidth + divGap}px, 0)`;
        res();
      }, 500)
    );
  });
};

const switchBlocks = (blockOne, blockTwo) => {
  const { animationTimeouts } = globalVar;
  return new Promise((res) => {
    animationTimeouts.push(
      setTimeout(() => {
        blockOne.classList.remove("transform-transition");
        blockTwo.classList.remove("transform-transition");
        blockOne.style.transform = "translate(0, 0)";
        blockTwo.style.transform = "translate(0, 0)";
        [blockOne.innerText, blockTwo.innerText] = [
          blockTwo.innerText,
          blockOne.innerText,
        ];

        [blockOne.style.height, blockTwo.style.height] = [
          blockTwo.style.height,
          blockOne.style.height,
        ];
        res();
      }, 500)
    );
  });
};

export default startAnimation;
