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
    expect(formatDisplay(30)).toBe('00:30');
  });

  test('should format a medium value correctly', () => {
    expect(formatDisplay(95)).toBe('01:35');
  });

  test('should format a large value correctly', () => {
    expect(formatDisplay(1500)).toBe('25:00');
  });
});

describe('Timer class', () => {
  let timer = new Timer();
  
  describe('Initial properties', () => {
    test('should exist', () => {
      expect(timer).toBeDefined();
    });

    test('should have a worktime length == 25:00', () => {
      expect(timer.worktimeLength).toBe(1500);
    });

    test('should have a breaktime length == 5:00', () => {
      expect(timer.breaktimeLength).toBe(300);
    });

    test('should have a mode of work', () => {
      expect(timer.mode).toBe(modes.WORK);
    });

    test('should have a time remaining == worktime', () => {
      expect(timer.timeRemaining).toBe(timer.worktimeLength);
    });
  });

  describe('Methods and operations', () => {
    test('should change the worktime', () => {
      timer.worktimeLength = 500;

      expect(timer.worktimeLength).toBe(500);
    });

    test('should change the breaktime', () => {
      timer.breaktimeLength = 500;

      expect(timer.breaktimeLength).toBe(500);
    });

    describe('reset', () => {
      test('should reset the time', () => {
        timer.timeRemaining = 3;
        timer.reset();
  
        expect(timer.timeRemaining).toBe(timer.worktimeLength);
      });
      
      test('should reset the mode', () => {
        timer.mode = modes.BREAK;
        timer.reset();

        expect(timer.mode).toBe(modes.WORK);
      });
    });

    describe('start', () => {
      test('should have the right time after one second', () => {
        timer = new Timer();
        const timeBefore = timer.timeRemaining;
        timer.start();
        jest.advanceTimersByTime(1000);

        expect(timer.timeRemaining).toBe(timeBefore - 1);
      });

      test('should have the right time after a minute', () => {
        timer = new Timer();
        const timeBefore = timer.timeRemaining;
        timer.start();
        jest.advanceTimersByTime(60000);

        expect(timer.timeRemaining).toBe(timeBefore - 60)
      });

      test('should have the right time after 10 minutes', () => {
        timer = new Timer();
        const timeBefore = timer.timeRemaining;
        timer.start();
        jest.advanceTimersByTime(600000);

        expect(timer.timeRemaining).toBe(timeBefore - 600)
      });

      test('should raise the timeUpdated event each tick', () => {
        timer = new Timer();
        const f = jest.fn();
        timer.timeUpdated = f;
        timer.start();
        jest.advanceTimersByTime(1000);

        expect(f).toHaveBeenCalled();
      });

      test('should NOT go past 0 time remaining', () => {
        timer = new Timer();
        timer.start();
        jest.advanceTimersByTime(1501000);

        expect(timer.timeRemaining).toBe(0);
      });

      test('should only start once', () => {
        timer = new Timer();
        timer.start();
        timer.start();
        jest.advanceTimersByTime(1000);

        expect(timer.timeRemaining).toBe(1499);
      });

      test('should update the message', () => {
        timer = new Timer();
        timer.start();

        expect(timer.message).toBe('Pause');
      });

      test('should raise the messageUpdated event', () => {
        let f = jest.fn();
        timer = new Timer();
        timer.messageUpdated = f;
        timer.start();

        expect(f).toHaveBeenCalled();
      });
    });

    describe('pause', () => {
      test('should prevent the time from decreasing', () => {
        timer = new Timer();
        timer.start();
        jest.advanceTimersByTime(1000);
        timer.pause();
        jest.advanceTimersByTime(1000);

        expect(timer.timeRemaining).toBe(1499);
      });

      test('should update the message', () => {
        timer = new Timer();
        timer.start();
        timer.pause();

        expect(timer.message).toBe('Start');
      });

      test('should raise the messageUpdated event', () => {
        let f = jest.fn();
        timer = new Timer();
        timer.start();
        timer.messageUpdated = f;
        timer.pause();

        expect(f).toHaveBeenCalled();
      });
    });

    describe('switchMode', () => {
      test('should switch from work to break', () => {
        timer.reset();
        timer.switchMode();

        expect(timer.mode).toBe(modes.BREAK);
      });

      test('should switch from break to work', () => {
        timer.reset();
        timer.mode = modes.BREAK;
        timer.switchMode();

        expect(timer.mode).toBe(modes.WORK);
      });
    });
  });
});
