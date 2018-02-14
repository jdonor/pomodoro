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
  formatDisplay
};
