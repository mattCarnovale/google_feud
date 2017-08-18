

jQuery('document').ready(function(){
  jQuery('#search-bar')
    .keydown(function(event){
      if(event.which === 13){
        var strUserRequest = jQuery('#search-bar').val();
        console.log(strUserRequest);
      }
    }
  );
});
