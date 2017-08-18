'use strict';

var express = require('express');
var socket = require('socket.io');
var googleSuggest = require('suggestion');

var server = express();

server.use('/', express.static(__dirname + '/game_client.html'));

var io = socket(server.listen(process.env.PORT || 8080));

io.on('connection', function(objectSocket){
    console.log('connected!')

});

console.log('go ahead and open "http://localhost:8080/game_client.html"');
