const crypto = require('crypto');

function simulateIoLoad(iterations = 100) {
  return new Promise((resolve) => {
    console.log(`[I/O Load]: Starting ${iterations} iterations of async pbkdf2...`);
    const start = Date.now();
    let completed = 0;

    for (let i = 0; i < iterations; i++) {
      // Async version delegates to thread pool, not blocking the event loop entirely
      crypto.pbkdf2('secret-password', 'salt', 100000, 64, 'sha512', (err) => {
        if (err) throw err;
        completed++;
        if (completed === iterations) {
          const end = Date.now();
          console.log(`[I/O Load]: Completed in ${end - start}ms`);
          resolve();
        }
      });
    }
  });
}

module.exports = simulateIoLoad;
