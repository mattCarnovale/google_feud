var strAnswerArray = [];
var strUsedPhraseArray = [];
var intRoundNumber = 1;
var intValue = 0;
var intScore = 0;
var intCorrectCount = 0;
var intWrongCount = 0;


jQuery('document').ready(function(){
  // Removes the visibility attribute and calls the .hide routine to
  // hide the wrong answer elements. This was the best solution I
  // could piece together to prevent the Xs showing for a second
  // on load
  hideWrongAnswerElements();
  jQuery('input')
    .keydown(function(event){
      if(event.which === 13){
                                  // Handle Phrase submission
        if(jQuery(this).hasClass('user-search')){
          var strUserRequest = jQuery('.user-search').val();
          strUserRequest = strUserRequest.trim();
          console.log(strUserRequest);
          if(isRepeatedPhrase(strUserRequest)){
            handleRepeatedRequest();
          }else{
            getAnswers(strUserRequest);
            strUsedPhraseArray.push(strUserRequest)
            console.log(strUsedPhraseArray);
          }
        } else{                   //Handle User answers
          var objAnswerResult = checkUserAnswer();
          if(objAnswerResult.isCorrect){
            handleCorrectAnswer(objAnswerResult.index);
            if(intCorrectCount === 8){
              completeRound();
              ++intRoundNumber;
            }
          }else{
            handleWrongAnswer();
            if(intWrongCount === 3){
              gameOver();
              revealAllAnswers();
            }
          }
        }
      }
  })
  jQuery('button')
    .click(function(){
      if(jQuery(this).hasClass('btn-danger')){
      //If the user clicks restart, the page is reloaded.
      location.reload();
      }else{
        continueToNextRound();
      }
    });
});

/*DOM manipulation*/

var handleRepeatedRequest = function(){
  jQuery('.user-search')
    .attr('placeholder', 'nice try, pal! try another word or phrase...')
    .val('');
}

var handleTooFewResults = function(){
  jQuery('.user-search')
    .attr('placeholder', 'too few results! try another word or phrase...')
    .val('');
}

var switchSearchToAnswer = function(){
 jQuery('.user-search')
  .toggleClass( 'user-search user-answer')
  .attr('placeholder', 'how would google autocomplete your phrase?')
  .val('');
}

var switchAnswerToSearch = function(){
  jQuery('.user-answer')
   .toggleClass( 'user-answer user-search')
   .attr('placeholder', 'enter a word or partial phrase...')
   .prop('disabled', false)
   .css({'text-align': 'left'});
}

var clearAnswer = function(){
  jQuery('.user-answer').val('');
}

var revealAnswer = function(strCardAnswered){
    jQuery(strCardAnswered + ' > div')
      .toggleClass('num-background-oval answer-with-score')
      .empty()
      .append('<span class=\'answer\'>' + strAnswerArray[i] + '</span')
      .append('<span class=\'value\'>' + intValue +'</span');
}

var updateScore = function (){
  jQuery('#score')
    .empty()
    .text(intScore);
}

var hideWrongAnswerElements = function() {
  jQuery('.wrong-answer-popup-space')
    .hide()
    .css({'visibility': 'visible'})
    .each(function(){
      jQuery('.wrong-answer-popup-space > span')
        .hide()
        .css({'visibility': 'visible'});
    });
}

var popupWrongAnswerX = function(){
  jQuery('.wrong-answer-popup-space')
    .show();
  jQuery('.wrong-answer-popup-space > span:eq('+ intWrongCount +')')
    .show();
  jQuery('.wrong-answer-popup-space')
    .delay(600)
    .fadeOut(800, "swing");
}

var updateWrongGuesses = function(){
  jQuery('#wrong-number')
    .empty()
    .text(intWrongCount);
}

var gameOver = function(){
  jQuery('.user-answer')
    .prop('disabled', true)
    .attr('placeholder', 'game over!')
    .css({'text-align': 'center'});
}

var completeRound = function(){
  jQuery('.user-answer')
    .prop('disabled', true)
    .attr('placeholder', 'great job! you won the round!')
    .css({'text-align': 'center'});
  jQuery('.btn-danger')
    .toggleClass('btn-danger btn-success')
    .empty()
    .text('Next Round');
}

var updateRound = function(){
  jQuery('#round-number')
    .empty()
    .text(intRoundNumber);
}

var resetSurveyBoard = function(){
  jQuery('.answer-with-score')
    .empty()
    .toggleClass('answer-with-score num-background-oval')
  for(i=0; i < 8; ++i){
    jQuery('.card-cover' + i + '> div')
      .text(i+1);
  }
}

var switchToResetButton = function(){
  jQuery('.btn-success')
    .toggleClass('btn-success btn-danger')
    .empty()
    .text('restart');
}


/*Ajax work*/

var getAnswers = function(strUserRequest){
  jQuery.ajax({
    'type': 'GET',
    'url': '/phrase?strUserRequest=' + encodeURIComponent(strUserRequest),
    'dataType': 'json',
    'success': function(strSuggestionArray){
      //9 because sometimes the first result is the word/phrase itself
      if(strSuggestionArray.length >= 9){
        formatAnswerArray(strSuggestionArray, strUserRequest);
        switchSearchToAnswer();
      }else{
        handleTooFewResults();
      }
    }
  });
}

/*Helper Functions*/

var revealAllAnswers = function(){
  for(i=0; i < 8; ++i){
    var strCardAnswered = '.card-cover'.concat(i);
    if(jQuery(strCardAnswered + '>div').hasClass('num-background-oval')){
      assignValue(i);
      revealAnswer(strCardAnswered);
    }
  }
}

var continueToNextRound = function(){
  strAnswerArray = [];
  intCorrectCount = 0;
  intWrongCount = 0;
  intValue = 0;
  updateRound();
  updateWrongGuesses();
  hideWrongAnswerElements();
  resetSurveyBoard();
  switchAnswerToSearch();
  switchToResetButton();
}

var handleCorrectAnswer = function (intIndex) {
  clearAnswer();
  var strCardAnswered = '.card-cover'.concat(intIndex);
  if(jQuery(strCardAnswered + '>div').hasClass('num-background-oval')){
    assignValue(intIndex);
    revealAnswer(strCardAnswered);
    intScore += intValue;
    ++intCorrectCount;
    updateScore();
  }
  intValue = 0;
}

var handleWrongAnswer = function() {
  clearAnswer();
  popupWrongAnswerX();
  ++intWrongCount;
  updateWrongGuesses();
}

//The value of the answers increases with each successful round
var assignValue = function (intIndex){
  switch (intIndex) {
    case 0:
      intValue = 100 * intRoundNumber;
      break;
    case 1:
      intValue = 80 * intRoundNumber;
      break;
    case 2:
      intValue = 60 * intRoundNumber;
      break;
    case 3:
      intValue = 50 * intRoundNumber;
      break;
    case 4:
      intValue = 40 * intRoundNumber;
      break;
    case 5:
      intValue = 30 * intRoundNumber;
      break;
    case 6:
      intValue = 20 * intRoundNumber;
      break;
    default:
      intValue = 10 * intRoundNumber;
  }
}

var checkUserAnswer = function () {
  var strUserAnswer = jQuery('.user-answer').val();
  strUserAnswer = strUserAnswer.trim().toLowerCase();
  console.log(strUserAnswer);
  for(i = 0; i < 8; ++i){
    if(strUserAnswer === strAnswerArray[i]){
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

var isRepeatedPhrase = function(strUserRequest){
  for(i = 0; i < strUsedPhraseArray.length; ++i){
    if(strUsedPhraseArray[i] === strUserRequest){
      return true;
    }
  }
  return false;
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
