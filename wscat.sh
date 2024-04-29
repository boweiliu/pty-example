#!/bin/bash
# uses wscat to test whether the websocket server is working.

which wscat || sudo npm install -g wscat

wscat -c ws://localhost:6060
