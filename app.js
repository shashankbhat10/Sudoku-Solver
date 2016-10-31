$(document).ready(function(){

  $(".grid-cell").on('click', function(){
    $(this).addClass("clicked");
    $(".grid-cell").not(this).each(function(){
      $(this).removeClass("clicked");
      if($(this).html()==""){
        $(this).removeClass("used");
      }
    });
    if($(this).hasClass("used")){
      console.log("hello");
      $(this).removeClass("used");
      $(this).html("");
    }
    else{
      $(this).addClass("selected");
      $(this).addClass("used");
      var cell = this;
      $(document).keydown(function(event){
        var number = event.which - 48;
        if(number>=1 && number<=9)
          $(".selected").html(number);

          $(".selected").removeClass("selected");
      });
    }
  });
});
//var cell = $(".grid-cell");
