# annafyBE

To run the web service locally:

    1. npm install
    2. node server.js
    3. Browse to localhost:8000

When deploying to Heroku:

    1. Remove oracledb folder from node_modules since ACCS does npm install as well
    2. Ensure Node & npm are all the way up to date
    3. Follow instructions here to install buildpacks: https://github.com/pupostd/heroku-buildpack-nodejs-oracledb
    4. Add a Procfile (not .txt or anything) that specifies your server/index.js
    5. Once you've created the Heroku App and deployed, ensure at least one instance of the app running: 
    	    heroku ps:scale web=1
    6. After deploy, put oracledb back in node_modules to run locally
