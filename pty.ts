import { spawn } from 'node-pty';

// See:
// https://github.com/microsoft/node-pty/blob/main/typings/node-pty.d.ts
// https://www.eddymens.com/blog/creating-a-browser-based-interactive-terminal-using-xtermjs-and-nodejs

const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';

const sleep = (ms: number) => new Promise((res, rej) => {
    setTimeout(res, ms);
});

const oldEnv = { ...process.env }
const ptyProcess = spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: {...oldEnv, NO_COLOR: '1', TERM: 'xterm-mono', LS_COLORS: undefined }
});

ptyProcess.onData(data => {
    // console.log('data', JSON.stringify(data));
    process.stdout.write(data);
});
ptyProcess.onExit((props) => {
    const { exitCode, signal } = props;
    console.log('EXITED: _ _ ', exitCode, signal);
});

async function main() {
  await sleep(2000);
  ptyProcess.write('clear\r');
  await sleep(2000);
  ptyProcess.write('bash progress-bar.sh\r');
  await sleep(2000);
  ptyProcess.write('l');
  await sleep(2000);
  ptyProcess.write('s -l /etc');
  await sleep(2000);
  ptyProcess.write('\re');
  await sleep(2000);
  ptyProcess.write('xit\r');
  await sleep(2000);
}


// main()

export const ptyProc = ptyProcess;
export default main;
