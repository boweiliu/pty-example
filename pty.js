"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ptyProc = void 0;
const node_pty_1 = require("node-pty");
// See:
// https://github.com/microsoft/node-pty/blob/main/typings/node-pty.d.ts
// https://www.eddymens.com/blog/creating-a-browser-based-interactive-terminal-using-xtermjs-and-nodejs
const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
const sleep = (ms) => new Promise((res, rej) => {
    setTimeout(res, ms);
});
const oldEnv = Object.assign({}, process.env);
const ptyProcess = (0, node_pty_1.spawn)(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: Object.assign(Object.assign({}, oldEnv), { NO_COLOR: '1', TERM: 'xterm-mono', LS_COLORS: undefined })
});
ptyProcess.onData(data => {
    // console.log('data', JSON.stringify(data));
    process.stdout.write(data);
});
ptyProcess.onExit((props) => {
    const { exitCode, signal } = props;
    console.log('EXITED: _ _ ', exitCode, signal);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sleep(2000);
        ptyProcess.write('clear\r');
        yield sleep(2000);
        ptyProcess.write('bash progress-bar.sh\r');
        yield sleep(2000);
        ptyProcess.write('l');
        yield sleep(2000);
        ptyProcess.write('s -l /etc');
        yield sleep(2000);
        ptyProcess.write('\re');
        yield sleep(2000);
        ptyProcess.write('xit\r');
        yield sleep(2000);
    });
}
// main()
exports.ptyProc = ptyProcess;
exports.default = main;
