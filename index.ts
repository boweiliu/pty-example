import main from './pty';
// https://github.com/EDDYMENS/interactive-terminal/blob/main/backend.js

const WebSocket = require('ws');
const express = require('express');
const path = require('path');


//main();

const wss = new WebSocket.Server({ port: 6060  });
console.log('websocket up on 6060');



const app = express();
const PORT = process.env.PORT || 6000;
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log('express up on 6000');
})

