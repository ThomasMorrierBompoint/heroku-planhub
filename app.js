const express = require('express');
const app = express();
const server = require('http').Server(app);
const SERVER_PORT = 5000;

const cheerioTest = require('./test/cheerio-test');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public', { maxAge: 5 * 60 * 60 * 1000 }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/test-widget', function (req, res) {
  res.sendFile(__dirname + '/public/components/test/index.html');
});

app.get('/cache-test', function (req, res) {
  res.sendFile(__dirname + '/public/components/cache-test/index.html');
});

app.get('/test/:url', function (req, res) {
  cheerioTest.test(res, req.params.url);
});

app.get('/site-map/:url', function (req, res) {
  cheerioTest.getSiteMap(res, req.params.url);
});

app.get('/address-auto-complete', function (req, res) {
  res.sendFile(__dirname + '/public/components/address-auto-complete/address-auto-complete.html');
});

app.get('/scrolling-effect', function (req, res) {
  res.sendFile(__dirname + '/public/components/scrolling-effect/scrolling-effect.html');
});

app.get('/vue-modal', function (req, res) {
  res.sendFile(__dirname + '/public/components/vue-modal/vue-modal.html');
});

app.get('/widget/protegez-vous/modal-choose-phone', function (req, res) {
  res.sendFile(__dirname + '/public/components/widget/modal-choose-phone/protegez-vous/index.html');
});

server.listen(process.env.PORT || SERVER_PORT, () => {
  console.log('Express server listening on port %d in %s mode.', SERVER_PORT, app.get('env'));
});

module.exports.app = app;
