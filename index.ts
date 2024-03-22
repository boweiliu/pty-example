import main from './pty';
// https://github.com/EDDYMENS/interactive-terminal/blob/main/backend.js

const WebSocket = require('ws');


//main();

const wss = new WebSocket.Server({ port: 6060  });
console.log('websocket up on 6060');


