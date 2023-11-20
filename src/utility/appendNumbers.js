import { numbersDiv } from "./querySelectors.js";
import { ALGO_DATA } from "./globalVar.js";

const appendNumbers = () => {
  const initialArr = [...ALGO_DATA.initialArr];
  for (let i = 0; i < initialArr.length; i++) {
    const number = document.createElement("div");
    number.classList.add("number-blocks");
    number.id = `number-${i}`;
    number.innerText = initialArr[i];
    number.style.height = initialArr[i] * 30 + "px";
    numbersDiv.append(number);
  }
};

export default appendNumbers;
