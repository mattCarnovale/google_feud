'use strict';

var express = require('express');
var googleSuggest = require('suggestion');

var server = express();


// ajax
server.use('/', express.static(__dirname + '/'));
server.listen(process.env.PORT || 8080);

server.get('/phrase', function(request, response){
  var strUserPhraseToSearch = request.query.strUserRequest;
  console.log(strUserPhraseToSearch);
  var strSuggestionArray;
  googleSuggest(strUserPhraseToSearch, function(error, strSuggestionArray){
    if(error) throw error;
    console.log(strSuggestionArray);
    response.status(200);
    response.set({
      'Content-Type' : 'application/json'
    });
    response.send(JSON.stringify(strSuggestionArray));
  });

});
