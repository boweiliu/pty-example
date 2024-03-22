import main from './pty';
// https://github.com/EDDYMENS/interactive-terminal/blob/main/backend.js

const WebSocket = require('ws');
const express = require('express');
const path = require('path');


//main();

const WS_PORT = process.env.WS_PORT || 6060;
const wss = new WebSocket.Server({ port: WS_PORT  });
console.log('websocket up on ', WS_PORT);



const app = express();
const PORT = process.env.PORT || 6080;
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log('express up on ', PORT);
})

