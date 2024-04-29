import express from "express";
import ViteExpress from "vite-express";
import WebSocket from "ws";
import main , { ptyProc as ptyProcess  } from './pty';

const WS_PORT = Number(process.env.WS_PORT || 6060);
const wss = new WebSocket.Server({ port: WS_PORT });
console.log('websocket up on ', WS_PORT);

// main();

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (command: string) => {
        console.log('got ws message', JSON.stringify(command));
        ptyProcess.write(command);
    });

    ptyProcess.onData((rawOutput: string) => {
        ws.send(rawOutput);
        console.log('data', JSON.stringify(rawOutput))
    })

    ws.on('close', () => {
        console.log('ws closed');
    });
})


// app.get("/hello", (_, res) => {
//   res.send("Hello Vite + TypeScript!");
// });

const app = express();
const PORT = Number(process.env.PORT || 6080);
ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port ", PORT)
);
