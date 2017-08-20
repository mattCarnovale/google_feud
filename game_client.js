var strAnswerArray = [];

jQuery('document').ready(function(){
  jQuery('.user-search')
    .keydown(function(event){
      if(event.which === 13){
        getAnswers();
        switchSearchToAnswer();
      }
    }
  );
});

var getAnswers = () => {
  var strUserRequest = jQuery('.user-search').val();
  console.log(strUserRequest);
  jQuery.ajax({
    'type': 'GET',
    'url': '/phrase?strUserRequest=' + encodeURIComponent(strUserRequest),
    'dataType': 'json',
    'success': function(strSuggestionArray){
      formatAnswerArray(strSuggestionArray, strUserRequest);
    }
  });
}

var formatAnswerArray = (strSuggestionArray, strUserRequest) => {
  var regex = new RegExp(strUserRequest + ' ', 'i');
  var i,j;
  for(i = 0, j = 0; i < 8 ; ++i, ++j){
    //Sometimes the first suggestion is the phrase itself (boring)
    if(strSuggestionArray[i] === strUserRequest){
      ++j;
    }
   strAnswerArray[i] = strSuggestionArray[j];
   strAnswerArray[i] = strAnswerArray[i].replace(regex,'');
  }
  console.log(strAnswerArray);
}

var switchSearchToAnswer = () => {
 jQuery('.user-search')
  .toggleClass('user-answer')
  .attr('placeholder', 'how would google autocomplete your phrase?')
  .val('')
}
