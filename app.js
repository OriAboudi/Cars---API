//require builtin 
const http = require('http');
const path = require('path');
const express = require('express');


// require modules
const app = express();
const { routesInit } = require('./routes/confingR');


// mongoConnect
require('./db/mongoConnect')

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


routesInit(app)

// create server
const port = process.env.PORT || 3002;
const server = http.createServer(app);
server.listen(port, () => {
    console.log('the server listening on port ' + port);
})