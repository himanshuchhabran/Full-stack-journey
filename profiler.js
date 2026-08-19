const { performance } = require('perf_hooks');

class EventLoopProfiler {
  constructor(logger = console.log) {
    this.logger = logger;
    this.isRunning = false;
    this.timer = null;
  }

  start(intervalMs = 500) {
    this.isRunning = true;
    this.monitor(intervalMs);
    this.logger('Profiler started...');
  }

  stop() {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.logger('Profiler stopped.');
  }

  monitor(intervalMs) {
    if (!this.isRunning) return;

    const start = process.hrtime.bigint();
    setImmediate(() => {
      const end = process.hrtime.bigint();
      const delay = Number(end - start) / 1e6; // in ms
      this.logger(`[Tick Delay]: ${delay.toFixed(3)}ms`);
      
      if (this.isRunning) {
        this.timer = setTimeout(() => this.monitor(intervalMs), intervalMs);
      }
    });
  }
}

module.exports = EventLoopProfiler;
