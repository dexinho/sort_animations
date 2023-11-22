const ALGO_DATA = {
  initialArr: [5, 6, 1, 4, 2, 9, 8, 3, 7],
  currentMove: 0,
  pairMoves: [],
};

const ANIMATION_DATA = {
  isAnimationInProgress: true,
  isAnimationPaused: false,
  animationTimeouts: [],
  animationIntervals: [],
  animationSpeedMS: 2000,
  delay: 500,
  totalDelay: 0,
};

export { ALGO_DATA, ANIMATION_DATA };
