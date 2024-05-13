import "./style.css";

import { setupCounter } from "./counter";
import typescriptLogo from "./typescript.svg";
import { Terminal  } from '@xterm/xterm';


document.querySelector<HTMLDivElement>("#app")!.style.display = 'none';

/*
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
*/

const term = new Terminal({
    cursorBlink: true,
    cols: 80,
    rows: 24,
});
term.open(document.getElementById('terminal')!);
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

const resizeTerminal = (props: { desiredHeightPx: number, desiredLengthPx: number }) => {
    const { desiredHeightPx, desiredLengthPx } = props;

    const newNumRows = Math.floor(desiredHeightPx / 17);
    const newNumCols = Math.floor(desiredLengthPx / 9);

    term.resize(newNumCols, newNumRows);
}

setTimeout(() => resizeTerminal({ desiredHeightPx: window.innerHeight, desiredLengthPx: window.innerWidth }), 3000);


const runCommand = (cmd: string) => {
    socket.send(cmd);
    
};
const runPromptCommand = () => {
    runCommand('\n');
};

let isInitialized = false;
const init = () => {
    if (isInitialized) {
        return;
    }
    isInitialized = true;
    console.log('initializing');

    setTimeout(() => {
        runPromptCommand();
    }, 300);

    term.onKey(keyObj => {
        runCommand(keyObj.key);
    });
};

const socket = new WebSocket("ws://localhost:6060");
socket.onopen = () => {
    console.log('opened ws');
    init();
}

socket.onmessage = (event) => {
    term.write(event.data);
}


