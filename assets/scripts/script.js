$(document).ready(function() {
  $(".action").click(function() {
    //$('.rRect').animate({"width":"0%"},600,'easeOutCirc');
    $('.cont').animate({
      "opacity": "1"
    }, 900);
    $('.pen-label').fadeIn(1000);
    $('.rRect').animate({
      "width": "25%",
      "box-shadow": "0 0 20px gray"
    }, 1000, 'easeInOutCirc');
    $('.pen-label').animate({
      "color": "white"
    }, 1000);
  });

  starter();
  function starter(){
    //$('.rRect').animate({"width":"0%"},600,'easeOutCirc');
    $('.cont').animate({
      "opacity": "1"
    }, 900);
    $('.pen-label').fadeIn(1000);
    $('.rRect').animate({
      "width": "25%",
      "box-shadow": "0 0 20px gray"
    }, 1000, 'easeInOutCirc');
    $('.pen-label').animate({
      "color": "white"
    }, 1000);
  }

  $(".rev").click(function() {
    $('.pen-label').fadeIn(1000);
    //$('.rRect').animate({"width":"0%"},1000,'easeOutBounce');
    $('.rRect').animate({
      "width": "0%",
      "box-shadow": "0"
    }, 1000, 'easeInOutCirc');
    $('.pen-label').animate({
      "color": "gray"
    }, 1000);
    // $('.cont').animate({"opacity":"0"},400);
  });

  $('.trigger-an').click(function() {
    $('.rRect').animate({
      "-webkit-transform": "skew(200deg)"
    }, 500);
    $('.rRect').animate({
      "transform": "skew(200deg)"
    }, 500);
    $('.rRect').css({
      "transform": "skew(200deg)"
    });
  });
});
