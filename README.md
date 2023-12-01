# Antariks_Tasks

SubTask 1 - Create a simple login page using bootstrap, support the authentication and session maintenance using Firebase for web js.

Things that can be done :
1. Create helpers file and import methods form their(tried but getting some error so didn't waste the time)
2. Hide Firebase App creds (like we don using .env but that requires node tried this as well but some import issue was coming )


SubTask 2 - Create a simple table in firebase realtime DB allow read, write, delete only for authenticated users.

Things that can be done :
1. Create helpers/constants file and import methods form their(tried but getting some error so didn't waste the time)
Because we added the oauth check the home.html page will be only accessible for authenticated users + added the below rules
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "antariks-default-rtdb": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}

SubTask 2 - Create a simple nodejs server which exposes two endpoints for GET and POST data

1. used `fetch` to make request as i don't want to install any other library like axios because fetch is availble directly in js
2. Can add a db support like sqlite
3. store all the helpers functions into separate helper file and import for all the tasks
4. can add a get button to show data by storing it in mysqlite or localStorage (webmethods) etc.
