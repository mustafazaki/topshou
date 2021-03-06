(function (window, document, $, undefined) {

    var app = {
        WINDOW_HEIGHT: $(window).height(),
        WINDOW_WIDTH: $(window).width(),
        isMobile: false,
        isTouch: false,
        isTablet: false,
        resizeTimeoutID: null,
        $body: $("body"),
        masanoryCont: null,
        culture: "en",

        detectDevice: function () {
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                    app.isMobile = true;
                }
            })(navigator.userAgent || navigator.vendor || window.opera);
            if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
                ) {
                app.isTouch = true;
                app.$body.addClass("touch");
            }
            else {
                app.$body.addClass("no-touch");
            }

            app.isTablet = (!app.isMobile && app.isTouch);
        },
        detectCulture: function () {
            if (window.location.href.match("_ar") != null || (window.location.href.match("/ar") != null)) {
                app.culture = "ar"
            }
        },

        _windowResize: function () {
            app.WINDOW_HEIGHT = $(window).height();
            app.WINDOW_WIDTH = $(window).width();
            app.setCssOfElements();
        },

        resizeListner: function () {
            if (!app.isTouch) {
                $(window).resize(function () {
                    clearTimeout(app.resizeTimeoutID);
                    app.resizeTimeoutID = setTimeout(app._windowResize, 500);
                });
            }
            else {
                window.addEventListener('orientationchange', function () {

                });
            }
        },


        addEventListner: function () {
            $("header .sub-menu li").click(function () {
                var $this = $(this),
                    href = $this.find("a").attr("href");
                if (href != undefined) {
                    window.location = href;
                    return false;
                }
            });

            $(".overlay .close").click(function () {
                //app.closeOverlay()

                $(this).parents(".overlay").removeClass("active")
            });
            $(".back-to-top").click(function () {
                $("html,body").animate({scrollTop: 0})
            })


        },


        dropDownMenu: function () {
            $("header .logged-in-menu >ul> li").click(function (event) {

                var $this = $(this),
                    menu = $this.find(".sub-menu");


                if ($this.hasClass("active")) {
                    $this.removeClass("active");
                    menu.stop().slideUp();
                    return false;

                }


                $("header .logged-in-menu li .sub-menu").stop().slideUp();
                $("header .logged-in-menu >ul> li").removeClass("active");


                menu.slideUp();
                if (menu.length > 0) {
                    $this.addClass("active");
                    menu.stop().slideDown();


                }

                if (app.isMobile) {

                    menu.css({
                        "width": app.WINDOW_WIDTH + "px",
                        "left": "-" + $this.offset().left + "px"

                    });

                }

                event.stopImmediatePropagation()
            });

            $("header .logged-in-menu  .sub-menu").click(function (event) {
                event.stopImmediatePropagation()
            })


            $(document).on("click touchstart", function () {
                $("header .logged-in-menu li .sub-menu").slideUp(300);
                $("header .logged-in-menu >ul> li").removeClass("active");

            })


        },


        viewTrends: function () {
            //    var $this = null;

            $(".view-trends").click(function () {

                if ($(this).hasClass("active")) {
                    return;
                }

                // $this = $(this);

                $.getJSON('thumbs.json', function (json) {
                    $(".view-trends").addClass("active");
                    _renderMarkup(json);
                });

            });


            function _renderMarkup(json) {
                var markup = "";
                $(json).each(function () {
                    markup += "<div class='grid'>";
                    markup += "<div class='thumb'>";
                    markup += "<img src='" + this.Image_thumbnail + "' />";
                    markup += "</div>";
                    markup += "<div class='like-cmnt-cont'><ul class='list-unstyled'>";
                    markup += "<li class='comment'>" + this.comment + "</li>";
                    markup += "<li class='like'>" + this.like + "</li>";
                    markup += "</ul></div>";
                    markup += "</div>";

                });
                $(".grid-cont").append(markup);


                $(".grid-cont .thumb img").load(function () {
                    $(".grid-cont .grid").show();
                    app.masanoryCont.masonry("reloadItems");
                    app.masanoryCont.masonry("layout");
                    $(".view-trends").removeClass("active");
                });


                //1   app.masanoryCont.masonry();

                //  app.masanoryCont.appended(markup);


            }


        },


        setCssOfElements: function () {
        },


        msIeVersion: function () {
            var ua = window.navigator.userAgent,
                msie = ua.indexOf("MSIE ");
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                $("body").addClass("ie");
            }
            return false;
        },

        initMasanory: function () {

            $(".grid-cont .thumb img").load(function () {
                $(".grid-cont .grid,.view-trends").show();

                //  app.masanoryCont = $('.grid-cont');
                app.masanoryCont = $('.grid-cont').masonry({
//                    columnWidth: 80,
                    itemSelector: '.grid',
                    isOriginLeft: (app.culture === "en") ? true : false
                });
            });


        },

        mobileMenu: function () {
            //bt-menu-open
            if (app.isMobile) {
                $(".bt-menu-trigger").click(function () {

                    var $this = $(this),
                        ul = $("nav");
                    $this.toggleClass("bt-menu-open");
                    ul.slideToggle();


                });
            }

        },

        openOverlay: function (elemClass) {
            //  <span class="btn btn-purple btn-small close">X</span>
            elemClass.addClass("active");


        },
        closeOverlay: function (elemClass) {
            //  <span class="btn btn-purple btn-small close">X</span>
            elemClass.removeClass("active");


        },


        initBxSlider: function () {
            //bt-menu-open
            $(".profile-detail .post-slider").bxSlider({
                pager: false,
                nextText: ">",
                prevText: "<",
                adaptiveHeight: true
//               preloadImage:"all"
            })

            $(".banner .slider").bxSlider({

                controls: false,
                pager: true,
                adaptiveHeight: false,
                mode: "fade",
                auto: true,
                pause: 5000,
                autoHover: true
            });


            $(".post-shared .post-detail .post-slider").each(function () {

                    if (!($(this).find(".slide img").length <= 1)) {
                        $(this).bxSlider({
                            pager: false,
                            nextText: ">",
                            prevText: "<",
                            adaptiveHeight: true
                        })
                    }

                }
            )


            //

            // bannerSlider.startAuto(false)


            $(".items-slider ul").bxSlider({
                pager: false,
                nextText: ">",
                prevText: "<",
//                minSlides:6,
                minSlides: 2,
                maxSlides: 9,
                slideWidth: 100,
                infiniteLoop: false,
                hideControlOnEnd: true

            })


        },
        init: function () {
            app.detectCulture();
            app.detectDevice();
            app.setCssOfElements();
            app.resizeListner();
            app.addEventListner();
            app.msIeVersion();
            app.initMasanory();
            app.mobileMenu();
            app.initBxSlider();
            app.viewTrends();
            app.dropDownMenu();
        }
    };


    window.app = app;
})(window, document, jQuery);


$(document).ready(function () {
    app.init();

});

