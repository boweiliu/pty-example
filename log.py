#!/usr/bin/env python
# ARGH WIP, needs sudo, so need to install pyenv globally

import keyboard

def print_key(event):
    print(event.scan_code)

keyboard.on_press(print_key)

# Block the script until interrupted
keyboard.wait('esc')
