#!/bin/bash
# uses wscat to test whether the websocket server is working.
# NOTE: wscat seems to be unable to send the EOL character "\r", so this can't be used to test pty

which wscat || sudo npm install -g wscat

wscat -c ws://localhost:6060/wscat/config

