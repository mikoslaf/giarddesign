$(function() {
    set_slider();
});
  
$(window).resize(function () {
    set_slider();
});
  
function set_slider()
{
    if($("body").width() > 622)
    {
        const height = $("#from_slider").outerHeight();
        $("#to_slider").css("height", height);
    }
    else
    {
        $("#to_slider").css("height", "auto");  
    }
}