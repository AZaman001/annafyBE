const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const oracledb = require('oracledb');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./server/config/routes.js')(app);

app.listen(port, function(){
	console.log(`listening on port ${port}`)
})