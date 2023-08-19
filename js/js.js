let imgs = [];
let active_img = 0;
const lazyload = target =>
{
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting)
      {
        const newclass = entry.target.classList[0] + "-in";
        $(entry.target).addClass(newclass);
        observer.disconnect();
      }
    });
  });
  io.observe(target);
}

$(function() {
    set_slider();
    set_space();

    const targets = [ 
        ...document.querySelectorAll(".fade-s"),
        ...document.querySelectorAll(".fade-e"),
        ...document.querySelectorAll(".fade-b"),
        ...document.querySelectorAll(".fade"),
    ];
    targets.forEach(lazyload);

    $('.grid').masonry({
        itemSelector: '.grid-item',
      });

    $("#Menu-Search").on("click", function() {
        $(".form-control").toggleClass("form-control-out");
    });

    $(".grid-item").on("click", function(e){
        $(".popup").css("display","block");
        const src = $(e.target).attr('src');
        find_img(src);
    });

    $("#exit").on("click", function(){
        $(".popup").css("display","none");
    });

    $("#popup-right").on("click", function(){
        set_img(1);
    });

    $("#popup-left").on("click", function(){
        set_img(-1);
    });
});
  
$(window).resize(function () {
    set_slider();
    set_space();
});
  
function set_img(change = 0)
{   
    if(active_img == 0 && change == -1) 
        change = imgs.length - 1;
    if(active_img == imgs.length - 1 && change == 1)
        active_img = 0
    else 
        active_img = active_img + change;
    const new_src = imgs[active_img];
    $("#popup-img").attr("src", new_src);
}

function find_img(src)
{
    if(imgs.length == 0)
    {
        $(".grid-item img").each(function(){
            const img_src = $(this).attr('src');
            imgs.push(img_src);
        });
    }

    for (let i = 0; i < imgs.length; i++) {
        if(src == imgs[i])
            active_img = i;
    }

    set_img();
}

function set_slider()
{
    if($("body").width() < 992)
    {
        let height = $(".from_slider").outerHeight() * 0.75;
        if(height == 0)
        height = $(".from_slider").eq(1).outerHeight() * 0.75;
        $(".space-slider").css("height", height);
    }
    else
    {
        $(".space-slider").css("height", "auto");  
    }
}

function set_space()
{
    const space = $("header").outerHeight();
    if(space < 100)
        $(".space").css("height", space + "px");
}