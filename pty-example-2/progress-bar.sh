#! test program to exercise progress bar logic

#!/bin/bash

# Function to draw a progress bar with color and animation
draw_progress_bar() {
    local width=50
    local progress=$(( $1 * $width / 100 ))
    local percent=$(( $1 * 100 / 100 ))

    # Define colors
    local color_start="\033["
    local color_end="\033[0m"
    local color_blue="34m"
    local color_green="32m"

    # Define animation characters
    local animation_chars="/-\|"

    printf "\r${color_start}${color_blue}["

    for ((i=0; i<$progress; i++)); do
        printf "#"
    done

    for ((i=$progress; i<$width; i++)); do
        printf " "
    done

    printf "]${color_end} ${color_start}${color_green}%3d%%${color_end} ${animation_chars:$2:1}" $percent
}

# Function to simulate a task taking 5 seconds
simulate_task() {
    for i in $(seq 1 5); do
        draw_progress_bar $i $(($i % 4))
        sleep 1
    done
    printf "\n"
}

# Main function
main() {
    echo "Running task..."
    simulate_task
    echo "Task completed!"
}

main

