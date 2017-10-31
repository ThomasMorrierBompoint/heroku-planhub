const express = require('express');
const app = express();
const server = require('http').Server(app);
const SERVER_PORT = 5000;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/address-auto-complete', function (req, res) {
  res.sendFile(__dirname + '/public/components/address-auto-complete/address-auto-complete.html');
});

app.get('/scrolling-effect', function (req, res) {
  res.sendFile(__dirname + '/public/components/scrolling-effect/scrolling-effect.html');
});

server.listen(process.env.PORT || SERVER_PORT, () => {
  console.log('Express server listening on port %d in %s mode.', SERVER_PORT, app.get('env'));
});