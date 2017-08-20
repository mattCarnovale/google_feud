var strAnswerArray = [];
var intRoundNumber = 1;
var value = 0;
var score = 0;


jQuery('document').ready(function(){
//Handle phrase submission
jQuery('input')
  .keydown(function(event){
    if(event.which === 13){
                                //Handle Phrase submission
      if(jQuery(this).hasClass('user-search')){
        getAnswers();
        switchSearchToAnswer();
      } else{                   //Handle User answers
        var objAnswerResult = checkUserAnswer();
        if(objAnswerResult.isCorrect){
          clearAnswer();
          revealAnswer(objAnswerResult.index);
        }
      }
    }
  })
});

//DOM manipulation
var switchSearchToAnswer = function(){
 jQuery('.user-search')
  .toggleClass( 'user-search user-answer')
  .attr('placeholder', 'how would google autocomplete your phrase?')
  .val('');
}

var clearAnswer = function(){
  jQuery('.user-answer').val('');
}

var revealAnswer = function(intIndex){
  var strCardAnswered = '.cardCover'.concat(intIndex)
  assignValue(intIndex);
  jQuery(strCardAnswered)
    .toggleClass('answered');
  jQuery(strCardAnswered + ' > div')
    .toggleClass('num-background-oval answer-with-score')
    .text('')
    .append('<span class=\'answer\'>' + strAnswerArray[i] + '</span')
    .append('<span class=\'value\'>' + value +'</span');

}


//Ajax work
var getAnswers = function(){
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

//Helper Functions

var assignValue = function (intIndex){
  switch (intIndex) {
    case 0:
      value = 100 * intRoundNumber;
      break;
    case 1:
      value = 80 * intRoundNumber;
      break;
    case 2:
      value = 60 * intRoundNumber;
      break;
    case 3:
      value = 50 * intRoundNumber;
      break;
    case 4:
      value = 40 * intRoundNumber;
      break;
    case 5:
      value = 30 * intRoundNumber;
      break;
    case 6:
      value = 20 * intRoundNumber;
      break;
    default:
      value = 10 * intRoundNumber;
  }
}

var checkUserAnswer = function () {
  var strUserAnswer = jQuery('.user-answer').val();
  console.log(strUserAnswer);
  for(i = 0; i < 8; ++i){
    if(strUserAnswer.toLowerCase() === strAnswerArray[i]){
      return {
        'isCorrect': true,
        'index': i
      };
    }
  }
  return{
    'isCorrect': false
  };
}

var formatAnswerArray = function(strSuggestionArray, strUserRequest){
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
