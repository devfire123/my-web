# HackTheBox: CyberPunk

## Introduction
CyberPunk is a medium difficulty Linux machine that features a web application vulnerable to SQL injection, leading to remote code execution.

## Reconnaissance
We start with a standard Nmap scan:

\`\`\`bash
nmap -sC -sV -oA nmap/cyberpunk 10.10.10.x
\`\`\`

The scan reveals port 22 (SSH) and port 80 (HTTP).

## Web Enumeration
Visiting the website, we see a futuristic design. I ran `gobuster` to find hidden directories:

\`\`\`bash
gobuster dir -u http://10.10.10.x -w /usr/share/wordlists/dirb/common.txt
\`\`\`

We found a `/login` page.

## Exploitation
### SQL Injection
The login form is vulnerable to SQL injection. Using `admin' OR 1=1--`, we can bypass authentication.

### Remote Code Execution
Once logged in, there is a file upload feature. I uploaded a PHP reverse shell and executed it to get a shell as `www-data`.

## Privilege Escalation
Checking SUID binaries, I found a custom binary that was vulnerable to buffer overflow. Exploiting this gave me root access.

## Conclusion
This was a fun box that tested basic web exploitation and binary analysis skills.
