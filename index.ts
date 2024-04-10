import main , { ptyProc as ptyProcess } from './pty';
// https://github.com/EDDYMENS/interactive-terminal/blob/main/backend.js

const WebSocket = require('ws');
const express = require('express');
const path = require('path');


//main();

const WS_PORT = process.env.WS_PORT || 6060;
const wss = new WebSocket.Server({ port: WS_PORT  });
console.log('websocket up on ', WS_PORT);


wss.on('connection', (ws: WebSocket) => {
    console.log('new websocket connection');

    ws.on('message', (command: string) => {
        console.log('got ws message', JSON.stringify(command));
        ptyProcess.write(command);
    })

    ptyProcess.onData((rawOutput: string) => {
        ws.send(rawOutput);
        console.log('data', JSON.stringify(rawOutput));
    })

    ws.on('close', () => {
        console.log('ws closed');
    })
});

const app = express();
const PORT = process.env.PORT || 6080;
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log('express up on ', PORT);
})

