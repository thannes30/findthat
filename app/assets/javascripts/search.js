//Fade In/Out Loading GIF

$(document).ajaxStart(function(){
  $(".loading-throbber").fadeIn();
});

$(document).ajaxStop(function(){
  $(".loading-throbber").fadeOut();
});
