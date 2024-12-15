
const net = require('net'); 


const PORT = 3000;
const HOST = '127.0.0.1';


const client = net.createConnection({ host: HOST, port: PORT }, () => {
    console.log(' (Connected to the server)');
});


client.on('data', (data) => {
    console.log(`data is : ${data.toString()}`);
});


client.on('end', () => {
    console.log(' (Disconnected from the server)');
});



