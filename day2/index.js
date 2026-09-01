const fs = require('fs');
const { Transform } = require('stream');

// Transform stream to split chunks into separate lines
class LineSplitter extends Transform {
    constructor(options) {
        super(options);
        this.buffer = '';
    }

    _transform(chunk, encoding, callback) {
        this.buffer += chunk.toString();
        const lines = this.buffer.split('\n');
        
        // Keep the last partial line in the buffer
        this.buffer = lines.pop(); 
        
        for (const line of lines) {
            this.push(line);
        }
        callback();
    }

    _flush(callback) {
        if (this.buffer) {
            this.push(this.buffer);
        }
        callback();
    }
}

// Transform stream to filter 404 errors and extract IP addresses
class Error404Filter extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(lineChunk, encoding, callback) {
        const line = lineChunk.toString();
        
        // Check if it's a 404 error
        if (line.includes(' 404 ')) {
            // Assume the IP address is the first part of the log line
            const ip = line.split(' ')[0];
            if (ip) {
                // Push IP to the next stream with a newline
                this.push(ip + '\n');
            }
        }
        callback();
    }
}

// Main function to run the pipeline
function processLogs(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(inputFile);
        const writeStream = fs.createWriteStream(outputFile);

        const lineSplitter = new LineSplitter();
        const errorFilter = new Error404Filter();

        readStream
            .pipe(lineSplitter)
            .pipe(errorFilter)
            .pipe(writeStream)
            .on('finish', () => {
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

// If run directly from terminal
if (require.main === module) {
    const input = process.argv[2] || 'access.log';
    const output = process.argv[3] || 'offending_ips.txt';
    console.log(`Processing logs from ${input} to ${output}...`);
    
    processLogs(input, output)
        .then(() => console.log('Done! Offending IPs extracted.'))
        .catch(err => console.error('Failed:', err));
}

module.exports = { processLogs, LineSplitter, Error404Filter };
