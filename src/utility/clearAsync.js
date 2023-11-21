const clearIntervals = (intervals) => {
  if (intervals.length > 0) {
    for (const id of intervals) clearTimeout(id);
    intervals.length = 0;
  }
};

const clearTimeouts = (timeouts) => {
  if (timeouts.length > 0) {
    for (const id of timeouts) clearInterval(id);
    timeouts.length = 0;
  }
};

export { clearIntervals, clearTimeouts };
