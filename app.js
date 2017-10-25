const express = require('express');
const app = express();
const server = require('http').Server(app);
const SERVER_PORT = 5000;

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

server.listen(process.env.PORT || SERVER_PORT, () => {
  console.log('Express server listening on port %d in %s mode.', SERVER_PORT, app.get('env'));
});