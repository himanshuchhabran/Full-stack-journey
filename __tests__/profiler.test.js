const EventLoopProfiler = require('../profiler');
const simulateCpuLoad = require('../cpu-load');

describe('EventLoopProfiler', () => {
  let mockLogger;
  let profiler;

  beforeEach(() => {
    mockLogger = jest.fn();
    profiler = new EventLoopProfiler(mockLogger);
  });

  afterEach(() => {
    profiler.stop();
  });

  it('should start logging tick delays successfully', (done) => {
    profiler.start(10); // Monitor every 10ms
    
    expect(profiler.isRunning).toBe(true);
    expect(mockLogger).toHaveBeenCalledWith('Profiler started...');

    // Wait a bit to ensure the tick is recorded
    setTimeout(() => {
      // It should have logged some tick delays
      const tickLogs = mockLogger.mock.calls.filter(call => call[0].includes('[Tick Delay]'));
      expect(tickLogs.length).toBeGreaterThan(0);
      done();
    }, 50);
  });

  it('should stop successfully and clear timers', () => {
    profiler.start(10);
    profiler.stop();
    expect(profiler.isRunning).toBe(false);
    expect(mockLogger).toHaveBeenCalledWith('Profiler stopped.');
  });

  it('integration: heavy CPU load should cause high tick delay', async () => {
    profiler.start(5); // Fast interval
    
    // Run a small CPU load
    await simulateCpuLoad(5); 

    profiler.stop();

    // Wait for any pending setImmediate callbacks to flush
    await new Promise(resolve => setTimeout(resolve, 10));

    // Collect all tick delays logged
    const tickLogs = mockLogger.mock.calls
      .filter(call => call[0].includes('[Tick Delay]'))
      .map(call => {
        // extract the number from "[Tick Delay]: 15.34ms"
        const match = call[0].match(/\[Tick Delay\]: ([\d.]+)ms/);
        return match ? parseFloat(match[1]) : 0;
      });

    // At least one tick delay should be significantly larger than the 5ms interval
    // because pbkdf2Sync blocks the event loop.
    const maxDelay = Math.max(...tickLogs, 0);
    
    // We expect the max delay to be somewhat high due to the blocking code
    expect(maxDelay).toBeGreaterThan(10); 
  });
});
