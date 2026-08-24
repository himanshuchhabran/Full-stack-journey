const { runProfiler, measureEventLoopDelay } = require('../profiler');

describe('Event Loop Profiler', () => {
  it('should measure CPU load delay', async () => {
    const delay = await runProfiler('cpu');
    expect(typeof delay).toBe('number');
    // CPU load blocks event loop, so delay should be greater than 0
    expect(delay).toBeGreaterThan(0);
  });

  it('should measure I/O load delay', async () => {
    const delay = await runProfiler('io');
    expect(typeof delay).toBe('number');
    expect(delay).toBeGreaterThanOrEqual(0);
  });

  it('should throw error for invalid load type (Failure case)', async () => {
    await expect(runProfiler('unknown')).rejects.toThrow('Invalid load type');
  });

  it('should have a working measureEventLoopDelay function', async () => {
    const delay = await measureEventLoopDelay();
    expect(typeof delay).toBe('number');
    expect(delay).toBeGreaterThanOrEqual(0);
  });
});
