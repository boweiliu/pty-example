

const socket = new WebSocket("ws://localhost:6060");
socket.onopen = () => {
    console.log('opened');
    init();
}
socket.onmessage = (event) => {
    term.write(event.data);

}

var term = new window.Terminal({
    cursorBlink: true
});
term.open(document.getElementById('terminal'));

function init() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    console.log('initializing');

    term.prompt = () => {
        runCommand('\n');
    };
    setTimeout(() => {
        term.prompt();
    }, 300);

    term.onKey(keyObj => {
        runCommand(keyObj.key);
    });
}

function runCommand(command) {
    socket.send(command);

}

// init();
