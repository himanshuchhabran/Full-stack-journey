const { runProfiler } = require('./profiler');

async function main() {
  console.log('--- Event Loop Profiler ---');
  
  try {
    console.log('\nRunning CPU Load Test...');
    const cpuDelay = await runProfiler('cpu');
    console.log(`Event loop tick delay (CPU load): ${cpuDelay.toFixed(3)} ms`);

    console.log('\nRunning I/O Load Test...');
    const ioDelay = await runProfiler('io');
    console.log(`Event loop tick delay (I/O load): ${ioDelay.toFixed(3)} ms`);
    
    console.log('\nDone!');
  } catch (err) {
    console.error('Error during profiling:', err.message);
  }
}

main();
