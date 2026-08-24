const crypto = require('crypto');
const fs = require('fs');

/**
 * Measures the delay of the event loop.
 * @returns {Promise<number>} - Delay in milliseconds
 */
function measureEventLoopDelay() {
  return new Promise((resolve) => {
    const start = process.hrtime();
    setImmediate(() => {
      const diff = process.hrtime(start);
      // diff[0] is seconds, diff[1] is nanoseconds
      const delayMs = (diff[0] * 1000) + (diff[1] / 1000000);
      resolve(delayMs);
    });
  });
}

/**
 * Simulates heavy CPU load using a synchronous crypto function.
 */
function simulateCpuLoad() {
  crypto.pbkdf2Sync('secret_password', 'salt_value', 100000, 64, 'sha512');
}

/**
 * Simulates I/O load by writing, reading, and deleting a file.
 * @returns {Promise<void>}
 */
function simulateIoLoad() {
  return new Promise((resolve, reject) => {
    const filename = 'temp-io-test.txt';
    const data = 'testing event loop io load';
    
    fs.writeFile(filename, data, (writeErr) => {
      if (writeErr) return reject(writeErr);
      
      fs.readFile(filename, (readErr) => {
        if (readErr) return reject(readErr);
        
        fs.unlink(filename, (unlinkErr) => {
          if (unlinkErr) return reject(unlinkErr);
          resolve();
        });
      });
    });
  });
}

/**
 * Profiles the event loop under a specific load type.
 * @param {string} loadType - 'cpu' or 'io'
 * @returns {Promise<number>} - Delay in milliseconds
 */
async function runProfiler(loadType) {
  if (loadType === 'cpu') {
    const delayPromise = measureEventLoopDelay();
    simulateCpuLoad();
    return await delayPromise;
  } else if (loadType === 'io') {
    const delayPromise = measureEventLoopDelay();
    await simulateIoLoad();
    return await delayPromise;
  } else {
    throw new Error('Invalid load type. Use "cpu" or "io".');
  }
}

module.exports = {
  measureEventLoopDelay,
  simulateCpuLoad,
  simulateIoLoad,
  runProfiler
};
