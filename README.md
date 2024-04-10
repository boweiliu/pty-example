# pty-example


random vimscript snippet:

```
" Define a function to log the current file name and line number
function! LogCurrentFileAndLine()
    " Get the current file name
    let l:filename = expand('%')
    
    " Get the current line number
    let l:line_number = line('.')
    
    " Open a file in append mode and write the current file name and line number
    call writefile([l:filename . ':' . l:line_number], '/path/to/logfile', 'a')
endfunction

" Define autocommands to trigger the logging function on various events
autocmd CursorMoved * call LogCurrentFileAndLine()
autocmd BufEnter * call LogCurrentFileAndLine()
autocmd BufLeave * call LogCurrentFileAndLine()
autocmd BufWinEnter * call LogCurrentFileAndLine()
autocmd BufWinLeave * call LogCurrentFileAndLine()
autocmd VimLeave * call LogCurrentFileAndLine()
```
