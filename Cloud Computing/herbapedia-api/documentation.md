# Starter Package Initiate
1. `npm init -y` : create package json
2. `npm i express bcrypt` : creating express server; `bcrypt` to allow us do cryptogtaphy and securing password hashes
3. `npm i --save-dev nodemon`: install nodemon to allow restart server automatically, `--save-dev` to only using it in developing
4.  `"devStart" : "nodemon server.js"` Add script in package.json to allow nodemon start automatically 
5.  Create file **server.js**

To run devStart
```
npm run devStart
```

Create a test file:
1. Create file `request.rest`
2. Add extenstion REST Client