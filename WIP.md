# blah



### migrating to vite
why: it has better typescript + rollup defaults

how:
- [x] set up vite + typescript (no react)
- [x] hook up vite to xterm (npm install, etc.)
- [x] hook up vite to express
- [x] copy over the express websocket code
- [x] test the backend websocket alone
- [x] hook up xterm client to websocket
- [x] Test pty with progress bar sh
- [x] Delete extraneous vite code
- [x] Test end2end with tmux/vim

- [x] investigate whether [esc] is being properly transmitted from xterm into pty
  - [x] install python3.12 in order to run pip keyboard logger
- [ ] look into https://xtermjs.org/docs/api/addons/attach/ ? 

Now should have parity with the other example.



- [ ] track sessions so that 2 windows don't share the same state
- [ ] add ability to resize windows (helps with fullscreen, and we'll need it too)
  - [ ] use a wsocket side channel to transmit sizing and other meta information that the server side pty needs to know about as well
