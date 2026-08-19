const crypto = require('crypto');

function simulateCpuLoad(iterations = 100) {
  return new Promise((resolve) => {
    console.log(`[CPU Load]: Starting ${iterations} iterations of pbkdf2Sync...`);
    const start = Date.now();
    for (let i = 0; i < iterations; i++) {
      // This is a synchronous block, it will delay the event loop
      crypto.pbkdf2Sync('secret-password', 'salt', 100000, 64, 'sha512');
    }
    const end = Date.now();
    console.log(`[CPU Load]: Completed in ${end - start}ms`);
    resolve();
  });
}

module.exports = simulateCpuLoad;
