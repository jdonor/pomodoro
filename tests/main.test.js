const main = require('../main');
const {formatDisplay, Timer, modes} = main;

jest.useFakeTimers(); // Mock setTimeout and other timer functions

describe('formatDisplay', () => {
  test('should exist', () => {
    expect(formatDisplay).toBeDefined();
  });
  
  test('should return a value', () => {
    expect(formatDisplay(30)).toBeTruthy();
  });

  test('should format a small value correctly', () => {
    expect(formatDisplay(30)).toEqual('00:30');
  });

  test('should format a medium value correctly', () => {
    expect(formatDisplay(95)).toEqual('01:35');
  });

  test('should format a large value correctly', () => {
    expect(formatDisplay(1500)).toEqual('25:00');
  });
});

describe('Timer class', () => {
  let timer = new Timer();
  
  describe('Initial properties', () => {
    test('should exist', () => {
      expect(timer).toBeDefined();
    });

    test('should have a worktime length == 25:00', () => {
      expect(timer.worktimeLength).toEqual(1500);
    });

    test('should have a breaktime length == 5:00', () => {
      expect(timer.breaktimeLength).toEqual(300);
    });

    test('should have a mode of work', () => {
      expect(timer.mode).toEqual(modes.WORK);
    });

    test('should have a time remaining == worktime', () => {
      expect(timer.timeRemaining).toEqual(timer.worktimeLength);
    });
  });

  describe('Methods and operations', () => {
    test('should change the worktime', () => {
      timer.worktimeLength = 500;

      expect(timer.worktimeLength).toEqual(500);
    });

    test('should change the breaktime', () => {
      timer.breaktimeLength = 500;

      expect(timer.breaktimeLength).toEqual(500);
    });

    describe('reset', () => {
      test('should reset the time', () => {
        timer.timeRemaining = 3;
        timer.reset();
  
        expect(timer.timeRemaining).toEqual(timer.worktimeLength);
      });
      
      test('should reset the mode', () => {
        timer.mode = modes.BREAK;
        timer.reset();

        expect(timer.mode).toEqual(modes.WORK);
      });
    });

    describe('start', () => {
      test('should have the right time after one second', () => {
        timer = new Timer();
        const timeBefore = timer.timeRemaining;
        timer.start();
        jest.advanceTimersByTime(1000);

        expect(timer.timeRemaining).toEqual(timeBefore - 1);
      });

      test('should have the right time after a minute', () => {
        timer = new Timer();
        const timeBefore = timer.timeRemaining;
        timer.start();
        jest.advanceTimersByTime(60000);

        expect(timer.timeRemaining).toEqual(timeBefore - 60)
      });

      test('should have the right time after 10 minutes', () => {
        timer = new Timer();
        const timeBefore = timer.timeRemaining;
        timer.start();
        jest.advanceTimersByTime(600000);

        expect(timer.timeRemaining).toEqual(timeBefore - 600)
      });
    });

    describe('switchMode', () => {
      test('should switch from work to break', () => {
        timer.reset();
        timer.switchMode();

        expect(timer.mode).toEqual(modes.BREAK);
      });

      test('should switch from break to work', () => {
        timer.reset();
        timer.mode = modes.BREAK;
        timer.switchMode();

        expect(timer.mode).toEqual(modes.WORK);
      });
    });
  });
});
