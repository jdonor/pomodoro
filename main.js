modes = Object.freeze({
  WORK: 0,
  BREAK: 1
});

class Timer {
  constructor() {
    this.worktimeLength = 1500;
    this.breaktimeLength = 300;
    this.mode = modes.WORK;
    this.timeRemaining = 1500;
  }

  reset() {
    this.timeRemaining = this.worktimeLength;
    this.mode = modes.WORK;
  }

  start() {
    this.countdown = setInterval(() => {
      this.timeRemaining--;
      console.log(this.timeRemaining);
    }, 1000);
  }

  switchMode() {
    this.mode = this.mode === modes.WORK ? modes.BREAK : modes.WORK;
  }
}

Number.prototype.pad = function (size = 2) {
  let s = String(this);
  while (s.length < size) {
    s = '0' + s;
  }

  return s;
}

function formatDisplay(seconds) {
  const minutes = Math.trunc(seconds / 60);
  seconds = seconds % 60;
  
  return `${minutes.pad()}:${seconds.pad()}`;
}

module.exports = {
  formatDisplay,
  Timer,
  modes
};
