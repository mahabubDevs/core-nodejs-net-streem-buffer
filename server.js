
const fs = require('fs'); 
const net = require('net'); 
const EventEmitter = require('events'); 


class FileEmitter extends EventEmitter {}
const fileEmitter = new FileEmitter();


const PORT = 3000;
const HOST = '127.0.0.1';


const server = net.createServer((clientSocket) => {
    console.log(' (Client connected)');

    const filePath = 'example.txt'; 
    
    
    const readStream = fs.createReadStream(filePath);
    

    readStream.on('data', (chunk) => {
        console.log(` ${chunk.length}  (Chunk size: ${chunk.length} bytes)`);
        fileEmitter.emit('chunkRead', chunk.length); 
    });

    readStream.on('end', () => {
        console.log(' (File transfer complete)');
        fileEmitter.emit('fileComplete'); 
        clientSocket.write('File transfer complete!'); 
        clientSocket.end(); 
    });

   
    
    
    readStream.pipe(clientSocket);
});


server.listen(PORT, HOST, () => {
    console.log(`${HOST}:${PORT} (Server is running at ${HOST}:${PORT})`);
});


fileEmitter.on('chunkRead', (chunkSize) => {
    console.log(`chunk: ${chunkSize}  (Chunk received: ${chunkSize} bytes)`);
});

fileEmitter.on('fileComplete', () => {
    console.log(' (File transfer complete)');
});