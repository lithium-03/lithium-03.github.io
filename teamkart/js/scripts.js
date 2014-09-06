$(document).ready(function ()
{
    $('#sidebarmenu ul li').mouseenter(function () { $(this).addClass('momenuitem'); });
    $('#sidebarmenu ul li').mouseleave(function () { $(this).removeClass('momenuitem'); });
    //slideshows
    var picShow = {
        $AutoPlay: true,
        $DragOrientation: 3,
        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$,
            $ChanceToShow: 1,
            $AutoCenter: 0,
            $Steps: 1
        },
        $ThumbnailNavigatorOptions: {
            $Class: $JssorThumbnailNavigator$,
            $ChanceToShow: 1,       
            $Loop: 1,
            $SpacingX: 10,
            $DisplayPieces: 4,                              
            $ParkingPosition: 204
        }
    };
    var slideshow = new $JssorSlider$("slideshow", picShow);
    var sponsorShow = {
        $FillMode:5,
        $AutoPlay: true,
        $AutoPlaySteps: 1,
        $AutoPlayInterval: 0,
        $PauseOnHover: 0,
        $ArrowKeyNavigation: false,
        $SlideEasing: $JssorEasing$.$EaseLinear,
        $SlideDuration: 6000,
        $SlideHeight: 160,
        $SlideSpacing: 10,
        $DisplayPieces: 5,
        $ParkingPosition: 0,
        $UISearchMode: 1,
        $PlayOrientation: 2,
        $DragOrientation: 0
    };
    var sponsor = new $JssorSlider$("sponsorsshow", sponsorShow);
    function ScaleSlider() {
        var parentWidth = slideshow.$Elmt.parentNode.clientWidth;
        if (parentWidth)
            slideshow.$SetScaleWidth(Math.min(parentWidth, 720));
        else
            window.setTimeout(ScaleSlider, 30);
    }
    ScaleSlider();
    if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/))
        $(window).bind('resize', ScaleSlider);
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/))
        $(window).bind("orientationchange", ScaleSlider);
    //scroll bar
    var scrollBar = $("html").niceScroll({
        bouncescroll: true,
        cursoropacitymin: 0.3,
    });
    //waypoints
    $('#s1').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls1').addClass('activemenuitem');
    });
    $('#se1').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls1').addClass('activemenuitem');
    });
    $('#s2').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls2').addClass('activemenuitem');
    });
    $('#se2').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls2').addClass('activemenuitem');
    });
    $('#s3').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls3').addClass('activemenuitem');
    });
    $('#se3').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls3').addClass('activemenuitem');
    });
    $('#s4').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls4').addClass('activemenuitem');
    });
    $('#se4').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls4').addClass('activemenuitem');
    });
    $('#s5').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls5').addClass('activemenuitem');
    });
    $('#se5').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls5').addClass('activemenuitem');
    });
    $('#s6').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls6').addClass('activemenuitem');
    });
    $('#se6').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls6').addClass('activemenuitem');
    });
    $('#s7').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls7').addClass('activemenuitem');
    });
    $('#se7').waypoint(function (direction) {
        $('.activemenuitem').removeClass('activemenuitem');
        $('#ls7').addClass('activemenuitem');
    });
    /*var $scrollingDiv = $("#sidebar");
    $(window).scroll(function ()
    {
        var pos = $(window).scrollTop();
        var d = pos > 50 ? String(pos) : '50';
        $scrollingDiv.stop().animate({ "marginTop": d + "px" },100);
    });*/
});
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});