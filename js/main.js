/* ===================================================================
 * Imminent 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
    "use strict";

    const cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL:
            "https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc", // mailchimp url
    };
    const $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    const doc = document.documentElement;
    doc.setAttribute("data-useragent", navigator.userAgent);

    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function () {
        $("html").addClass("ss-preload");

        $WIN.on("load", function () {
            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation
            $("#loader").fadeOut("slow", function () {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            });

            // for hero content animations
            $("html").removeClass("ss-preload");
            $("html").addClass("ss-loaded");
        });
    };

    /* Button Click
     */
    $("#button").click(function () {
        $("#button").hide("slow");
        $(".input-section").show("slow");
    });

    async function submitForm() {
        var email = $(".email-input").val();
        if (email !== "") {
            let successPost = await createUser(email);
            if (successPost == true) {
                $(".email-input").val("");
                $(".email-submit")
                    .val("SUCCESS")
                    .css("background-color", "green");
                setTimeout(function () {
                    $(".email-submit")
                        .val("SUBMIT")
                        .css("background-color", "black");
                }, 2000);
            } else {
                $(".email-input").val("");
                $(".email-submit").val("ERROR").css("background-color", "red");
                setTimeout(function () {
                    $(".email-submit")
                        .val("SUBMIT")
                        .css("background-color", "black");
                }, 2000);
            }
        }
    }

    async function createUser(email) {
        const options = {
            method: "POST",
            headers: {
                Accept: "text/html",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                data: `{"token": "T3rbbZ","properties": {"$email":"${email}"}}`,
            }),
        };
        let res = await fetch("https://a.klaviyo.com/api/identify", options);
        return parseInt(res.status) == 200;
    }

    $(".email-form").submit(function () {
        submitForm();
        return false;
    });

    /* final countdown
     * ------------------------------------------------------ */
    const ssFinalCountdown = function () {
        const finalDate = "2022/04/07";

        $(".counter")
            .countdown(finalDate)
            .on("update.countdown finish.countdown", function (event) {
                const str =
                    '<div class="counter__time days">%D&nbsp;<span>D</span></div>' +
                    '<div class="counter__time hours">%H&nbsp;<span>H</span></div>' +
                    '<div class="counter__time minutes">%M&nbsp;<span>M</span></div>' +
                    '<div class="counter__time seconds">%S&nbsp;<span>S</span></div>';

                $(this).html(event.strftime(str));
            });
    };

    /* smooth scrolling
     * ------------------------------------------------------ */
    const ssSmoothScroll = function () {
        $(".smoothscroll").on("click", function (e) {
            const target = this.hash;
            const $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $target.offset().top,
                    },
                    cfg.scrollDuration,
                    "swing"
                )
                .promise()
                .done(function () {
                    window.location.hash = target;
                });
        });
    };

    /* back to top
     * ------------------------------------------------------ */
    const ssBackToTop = function () {
        const pxShow = 500;
        const $goTopButton = $(".ss-go-top");

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow)
            $goTopButton.addClass("link-is-visible");

        $(window).on("scroll", function () {
            if ($(window).scrollTop() >= pxShow) {
                if (!$goTopButton.hasClass("link-is-visible"))
                    $goTopButton.addClass("link-is-visible");
            } else {
                $goTopButton.removeClass("link-is-visible");
            }
        });
    };

    /* initialize
     * ------------------------------------------------------ */
    (function ssInit() {
        ssPreloader();
    })();
})(jQuery);
