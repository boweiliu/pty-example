import express from "express";
import ViteExpress from "vite-express";
import WebSocket from "ws";
import type {  IncomingMessage } from "http";
import main , { ptyProc as ptyProcess  } from './pty';

const WS_PORT = Number(process.env.WS_PORT || 6060);
const wss = new WebSocket.Server({ port: WS_PORT });
console.log('websocket up on ', WS_PORT);

// main();

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    console.log('connected: ', ws)
    // "/" -- just the demo i guess
    // "/<id>" -- a named session
    // "/<id>/config" -- out of band JSON control for the named sesh
    const wsConnectionType = getConnectionTypeFromUrl(req.url);
    console.log('connected to: ', ws?.url, req.url, wsConnectionType)

    if (wsConnectionType === 'demo' || wsConnectionType === 'session') {
        ws.on('message', (command: string) => {
            console.log('got ws message', JSON.stringify(command));
            ptyProcess.write(command);
        });

        ptyProcess.onData((rawOutput: string) => {
            ws.send(rawOutput);
            console.log('data', JSON.stringify(rawOutput))
        })
    }
    else if (wsConnectionType === 'config') {
        ws.on('message', (jsonData: string /* actually json */) => {
            const dataObject = jsonParseOrNull(jsonData);
            console.log('got ws config message', dataObject);
            // process it...
            const resizeCmd = dataObject as { rows: number, cols: number };
            ptyProcess.resize(resizeCmd.cols, resizeCmd.rows);
            console.log('resized to ' , resizeCmd);
        });
    }

    ws.on('close', () => {
        console.log('ws closed');
    });
})

function jsonParseOrNull(d: string): Object | undefined {
    try {
        return JSON.parse(d);
    } catch (e) {
        return undefined;
    }
}


// app.get("/hello", (_, res) => {
//   res.send("Hello Vite + TypeScript!");
// });

const app = express();
const PORT = Number(process.env.PORT || 6080);
ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port ", PORT)
);

    // "/" -- just the demo i guess. All demos share the same session
    // "/<id>" -- a named session
    // "/<id>/config" -- out of band JSON control for the named sesh
function getConnectionTypeFromUrl(url?: string): 'demo' | 'session' | 'config' {
    if (!url) {
        return 'demo';
    }
    if (url === '/') {
        return 'demo';
    }
    const parts = filterFalsy(url.split('/'));
    if (parts.length === 1) {
        return 'session';
    }
    if (parts.length === 2 && parts[1] === 'config') {
        return 'config';
    }

    return 'demo';
}

function filterFalsy<T>(arr: T[]): T[] {
    const result: T[] = [];
    for (let x of arr) {
        if (Boolean(x)) {
            result.push(x);
        }
    }
    return result;
}
