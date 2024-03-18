import { spawn } from 'node-pty';

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
  ptyProcess.write('l');
  await sleep(2000);
  ptyProcess.write('s');
  await sleep(2000);
  ptyProcess.write('\r');
  await sleep(2000);
  ptyProcess.write('exit\r');
  await sleep(2000);
}


main()
