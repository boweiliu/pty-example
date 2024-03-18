import { spawn } from 'node-pty';

const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';

const ptyProcess = spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env
});

ptyProcess.onData(data => {
    console.log('data', data);
});

ptyProcess.write('ls\r');
