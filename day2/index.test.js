const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { processLogs } = require('./index');

test('Log Aggregator Pipeline', async (t) => {
    
    await t.test('Should correctly filter 404 errors and extract IPs (Success Case)', async () => {
        const inputPath = path.join(__dirname, 'test_success_input.log');
        const outputPath = path.join(__dirname, 'test_success_output.txt');
        
        // Mock log data with 200, 404, and 500 statuses
        const logData = `192.168.1.1 - - [10/Oct/2000:13:55:36 -0700] "GET /index.html HTTP/1.0" 200 2326
10.0.0.5 - - [10/Oct/2000:13:55:36 -0700] "GET /not-found HTTP/1.0" 404 2326
172.16.0.2 - - [10/Oct/2000:13:55:36 -0700] "GET /about HTTP/1.0" 500 2326
127.0.0.1 - - [10/Oct/2000:13:55:36 -0700] "GET /missing-image.png HTTP/1.0" 404 2326`;

        fs.writeFileSync(inputPath, logData);

        // Run the pipeline
        await processLogs(inputPath, outputPath);

        // Read and verify the output
        const result = fs.readFileSync(outputPath, 'utf8');
        assert.strictEqual(result, '10.0.0.5\n127.0.0.1\n', 'Extracted IPs should match 404 lines only');

        // Cleanup
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
    });

    await t.test('Should handle file not found error gracefully (Failure Case)', async () => {
        const inputPath = path.join(__dirname, 'non_existent_file.log');
        const outputPath = path.join(__dirname, 'test_fail_output.txt');

        try {
            await processLogs(inputPath, outputPath);
            assert.fail('Should have thrown an error due to missing file');
        } catch (err) {
            assert.strictEqual(err.code, 'ENOENT', 'Error code should be ENOENT');
        }

        // Cleanup if output was somehow created
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
    });
});