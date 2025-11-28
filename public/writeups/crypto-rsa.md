# Crypto Challenge: RSA Madness

## Problem
We are given `n`, `e`, and `c`. `e` is very small (3).

## Solution
Since `e` is 3 and `m` is likely small, we can try a cube root attack.

\`\`\`python
from gmpy2 import iroot

m, exact = iroot(c, 3)
if exact:
    print(long_to_bytes(m))
\`\`\`

This successfully decrypts the message.

## Flag
`CTF{sm4ll_e_is_d4ng3r0us}`
