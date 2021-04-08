$(function () {

    // ---------------- selection
    var $section = $("#container>section");
    var $page_btn = $(".pagination_btn>li");
    var $business = $("#business");
    var $ehsq = $("#ehsq");
    var $news = $("#news");
    var $ir = $("#ir");

    // section height
    var win_h = $(window).height();
    $section.height(win_h);

    // section threshold
    var business_threshold = $business.offset().top;
    var ehsq_threshold = $ehsq.offset().top;
    var news_threshold = $news.offset().top;
    var ir_threshold = $ir.offset().top;

    // scroll check
    var scrollY = 0;
    var moveTop = 0;
    var sectionTop = 0;
    // animation check
    var isAni_header;
    var isAni_html;

    // field num
    var num_field = 0;
    // pagination
    var num_pg = 0;
    // section num
    var num_section = 0;
    // list num
    var num_list = 0;

    // ---------- header ----------
    // scroll header
    function scrollHeader() {
        if (!isAni_header) {
            $("header").stop().animate({
                top: 0
            }, 500);
            $("header>.center").stop().animate({
                width: 100 + "%",
                height: 60,
                "border-radius": 0,
                "background-color": "rgba(255,255,255,.95)"
            }, 500);
            $(".logo").stop().animate({
                "margin-top": 12
            }, 500);

            $("#nav>li>a").stop().animate({
                height: 60,
                "line-height": 60,
                color: "#333"
            }, 500);
            $("#nav>li>a").mouseover(function () {
                $(this).stop().animate({
                    color: "#22e3d4"
                }, 150)
            });
            $("#nav>li>a").mouseout(function () {
                $(this).stop().animate({
                    color: "#333"
                }, 150)
            });

            $(".search").css("color", "#333");
            $(".searchbox").stop().animate({
                "margin-top": 10,
                "background-color": "rgba(200, 200, 200, 0.66)"
            }, 500);
            $(".searchbox a").stop().animate({
                color: "#333"
            }, 500);

            $(".lang").stop().animate({
                "margin-top": 15,
                border: "1px solid rgba(0,0,0,.6)"
            }, 500);

            $(".logo").addClass("scroll");
            $(".lang").addClass("scroll");
            $(".lang>li").addClass("scroll");
        }
    }

    // top fixed header
    function stickyHeader() {
        $("header").stop().animate({
            top: 40
        }, 500);
        $("header>.center").stop().animate({
            width: 83.333333 + "%",
            height: 80,
            "border-radius": 40,
            "background-color": "rgba(255,255,255,.1)"
        }, 500);
        $(".logo").stop().animate({
            "margin-top": 22
        }, 500);

        $("#nav>li>a").stop().animate({
            height: 80,
            "line-height": 80,
            color: "#eee"
        }, 500);
        $("#nav>li>a").mouseout(function () {
            $(this).stop().animate({
                color: "#eee"
            }, 150)
        });

        $(".search").css("color", "#eee");
        $(".searchbox").stop().animate({
            "margin-top": 20,
            "background-color": "rgba(255,255,255,.05)"
        }, 500);
        $(".searchbox a").stop().animate({
            color: "#eee"
        }, 500);

        $(".lang").stop().animate({
            marginTop: 25,
            border: "1px solid rgba(255,255,255,.6)"
        }, 500);

        $(".logo").removeClass("scroll");
        $(".lang").removeClass("scroll");
        $(".lang>li").removeClass("scroll");
    }

    $(window).scroll(function () {

        scrollY = $(this).scrollTop();

        // check animated :
        isAni_header = $("header").is(":animated");

        // header :
        if (scrollY > 0) {
            scrollHeader();
        } else if (scrollY == 0) {
            stickyHeader();
        }

        // business :
        if (scrollY == business_threshold) {
            $("#business .info_area>div").addClass("display");
            $("#business .text_center").addClass("display");
            $("#business .more").addClass("display");
        } else {
            $("#business .info_area>div").removeClass("display");
            $("#business .text_center").removeClass("display");
            $("#business .more").removeClass("display");
        }

        // ehsq :
        if (scrollY == ehsq_threshold) {
            $("#ehsq .text_center").addClass("display");
            $("#ehsq .text_center").stop().animate({
                top: 300
            }, 400);
            $("#ehsq .hashtag").addClass("display");
            $("#ehsq .banner_wrap").stop().animate({
                bottom: 120,
                opacity: 1
            }, 700)
        } else {
            $("#ehsq .text_center").removeClass("display");
            $("#ehsq .text_center").stop().animate({
                top: 200
            }, 400);
            $("#ehsq .hashtag").removeClass("display");
            $("#ehsq .banner_wrap").stop().animate({
                bottom: 0,
                opacity: 0
            }, 300)
        }

        // news :
        if (scrollY == news_threshold) {} else {}

        // ir :
        if (scrollY == ir_threshold) {} else {}
    })

    // nav sub
    $("#nav>li>a").on({
        mouseover: function () {
            $(this).stop().animate({
                color: "#22e3d4"
            }, 150)
        },
        mouseout: function () {
            $(this).stop().animate({
                color: "#eee"
            }, 150)
        }
    })

    // lang
    $(".lang>li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })

    // one page scroll
    function onePageScroll() {
        if (!isAni_html) {
            $("html, body").stop().animate({
                scrollTop: moveTop
            }, 1000);
        }
    }
    $section.each(function (index) {
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            isAni_html = $("html,body").is(":animated");
            var event = e.originalEvent;
            var delta = 0;
            console.log("현재 페이지 : " + index);

            // cross browsing : FireFox
            if (event.detail) {
                delta = event.detail * -40;
            }
            // cross browsing : etc.
            else {
                delta = event.wheelDelta;
            }

            // scroll down :
            if (delta < 0) {
                console.log("scroll down : " + index);
                if ($(this).next().length) {
                    moveTop = $(this).next().offset().top;
                }
                if (!isAni_html) {
                    $page_btn.eq(index + 1).addClass("active").siblings().removeClass("active");
                }

            }
            // scroll up :
            else {
                console.log("scroll up : " + index);
                if ($(this).prev().length) {
                    moveTop = $(this).prev().offset().top;
                }
                if (!isAni_html) {
                    $page_btn.eq(index - 1).addClass("active").siblings().removeClass("active");
                    if (index <= 0) {
                        index = 0;
                        $page_btn.eq(index).addClass("active").siblings().removeClass("active");
                    }
                }
            }
            onePageScroll();
        });
    })

    // pagination
    $page_btn.click(function () {
        num_pg = $(this).index();
        moveTop = $section.eq(num_pg).offset().top;
        onePageScroll();
        $(this).addClass("active").siblings().removeClass("active");
    })

    // field
    $(".field>div").on({
        mouseover: function () {
            num_field = $(this).index();
            console.log(num_field);
            $(".upper_f").eq(num_field).stop().fadeIn({
                queue: false,
                duration: 400
            });
            $(".upper_f").eq(num_field).stop().animate({
                top: "32%",
                opacity: 1
            }, 400);
            $(".lower_f").eq(num_field).stop().fadeIn({
                queue: false,
                duration: 400
            });
            $(".lower_f").eq(num_field).stop().animate({
                top: "48%",
                opacity: 1
            }, 400);

            $(".inner_text>.upper").stop().fadeOut(300);
            $(".inner_text>.lower").stop().fadeOut(300);
            $(".inner_text>span.after").stop().animate({
                top: "41%",
                width: 280,
                "background-color": "rgba(255,255,255,.6)"
            }, 400);

            $(".field_sub").eq(num_field).stop().fadeIn({
                queue: false,
                duration: 400
            });
            $(".field_sub").eq(num_field).stop().animate({
                top: "65%",
                opacity: 1
            }, 400);
        },
        mouseout: function () {
            $(".upper_f").eq(num_field).stop().fadeOut(300);
            $(".upper_f").eq(num_field).stop().animate({
                top: "28%",
                opacity: 0
            }, 400);
            $(".lower_f").eq(num_field).stop().fadeOut(300);
            $(".lower_f").eq(num_field).stop().animate({
                top: "52%",
                opacity: 0
            }, 300);

            $(".inner_text>.upper").stop().fadeIn(450);
            $(".inner_text>.lower").stop().fadeIn(450);
            $(".inner_text>span.after").stop().animate({
                top: "52%",
                width: 180,
                "background-color": "rgba(255,255,255,.3)"
            }, 400);

            $(".field_sub").eq(num_field).stop().fadeOut(400);
            $(".field_sub").eq(num_field).stop().animate({
                top: "68%",
                opacity: 0
            }, 400);
        }
    })

    // ehsq
    $(".list_wrap").on({
        mouseover: function () {

        },
        mouseout: function () {

        }
    })

    // swiper
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        }
    });

})
