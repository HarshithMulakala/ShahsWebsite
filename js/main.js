$(document).ready(function () {
    $(".headerContact").fadeOut(0);
    $(window).on("scroll", function (e) {
        if ($(window).scrollTop() >= $(".fade-scroll").height()) {
            $(".main-header").fadeOut(500);
            $(".headerText").fadeOut(500);
            $(".headerContact").fadeIn(500);
            var act = $('.main-nav').hasClass("main-nav-active");
            if (act) {
                $(".main-nav").toggleClass("main-nav-active");
                $('.menu').toggleClass("open");
            }
        }
        else {
            $(".main-header").fadeIn(500);
            $(".headerText").fadeIn(500);
            $(".headerContact").fadeOut(500);
        }
    });

    $('.menu').click(function () {
        $(".main-nav").toggleClass("main-nav-active", 500);
        $(this).toggleClass("open");
    });
});

