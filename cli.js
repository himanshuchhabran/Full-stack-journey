#!/usr/bin/env node

const EventLoopProfiler = require('./profiler');
const simulateCpuLoad = require('./cpu-load');
const simulateIoLoad = require('./io-load');

const args = process.argv.slice(2);
const type = args[0] || 'cpu';

async function run() {
  console.log('--- Event Loop Profiler CLI ---');
  
  const profiler = new EventLoopProfiler();
  
  // Start profiler to monitor tick delay every 10ms
  profiler.start(10);
  
  try {
    if (type === 'cpu') {
      console.log('Mode: CPU Load');
      // Heavy CPU load will block the event loop, causing huge tick delays
      await simulateCpuLoad(50); 
    } else if (type === 'io') {
      console.log('Mode: I/O Load');
      // I/O load delegates to thread pool, tick delays should remain small
      await simulateIoLoad(50);
    } else {
      console.error('Unknown load type. Use "cpu" or "io".');
      process.exit(1);
    }
  } catch (err) {
    console.error('Error running simulation:', err);
  } finally {
    profiler.stop();
    console.log('--- Profiling Complete ---');
  }
}

run();
