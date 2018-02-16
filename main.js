modes = Object.freeze({
  WORK: 0,
  BREAK: 1
});

class Timer {
  constructor() {
    this.worktimeLength = 1500;
    this.breaktimeLength = 300;
    this.mode = modes.WORK;
    this._timeRemaining = 1500;
    this._paused = true;
    this._message = 'Start';
    this.timeUpdated = () => {};
    this.messageUpdated = () => {};
  }

  get timeRemaining() {
    return this._timeRemaining;
  }

  set timeRemaining(time) {
    this._timeRemaining = time;
    this.timeUpdated();
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;
    this.messageUpdated();
  }

  reset() {
    this.timeRemaining = this.worktimeLength;
    this.mode = modes.WORK;
  }

  start() {
    if (!this._paused) return;

    this._paused = false;
    this.message = 'Pause';

    this.countdown = setInterval(() => {
      this.timeRemaining = this.timeRemaining - 1;

      if (this.timeRemaining <= 0) {
        clearInterval(this.countdown);
      }
    }, 1000);
  }

  pause() {
    if (this._paused) return;

    this._paused = true;
    clearInterval(this.countdown);
    this.message = 'Start'
  }

  togglePause() {
    if (this._paused) {
      this.start();
    } else {
      this.pause();
    }
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

// Node-only code
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    formatDisplay,
    Timer,
    modes
  };
} else { // Browser-only code
  function startTimer() {
    timer.start();
  }

  // Wire up to the DOM
  const timerDiv = document.querySelector('#timer');
  const time = document.querySelector('#time');
  const timer = new Timer();

  function updateTime() {
    time.textContent = formatDisplay(timer.timeRemaining);
  }

  timer.timeUpdated = updateTime;
  timerDiv.addEventListener('click', startTimer);
}
