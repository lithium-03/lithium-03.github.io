var rtime = new Date(1, 1, 2000, 12, 00, 00),
            timeout = false,
            delta = 50;
var $contentwrapper;
$(document).ready(function () {
    loaded = true;
    window.clearTimeout(KGP_LAN_Condition);
    $contentwrapper = $('#contentwrapper');
    $(window).bind('orientationchange resize', function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            window.setTimeout(readyrespond, delta);
        }
    });
    respond(false);
    $contentwrapper.niceScroll();
    constantOffset = $contentwrapper.position().top - $('#contentblock').position().top - $('#topbar').outerHeight();
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                dist = target.position().top + $contentwrapper.scrollTop() + constantOffset
                if (target.length && dist) {
                    $contentwrapper.animate(
                        {
                            scrollTop: dist
                        }, 500);
                }
                if (target.length) {
                    return false;
                }
            }
        });
    });
    $('#gallery').mosaicflow();
    waypointInit(5);
});
function waypointInit(n,$target) 
{
    $target=$target==undefined?$('.contentpane-full,.contentpane-full-sub'):$target;
    $target.waypoint(
        {
            handler:
                function (direction) 
                {
                    if ($(this).hasClass('nohide'))
                        return;
                    if (direction === 'down')
                    {
                        $(this).animate({ 'opacity': '0' }, 500);
                    }
                    else 
                    {
                        $(this).animate({ 'opacity': '1' }, 500);
                    }
                },
            context: '#contentwrapper',
            offset: (($contentwrapper.outerHeight() * 0.9) - $(this).outerHeight()) + 'px'
        });
    $target.waypoint(
        {
            handler:
                function (direction)
                {
                    if ($(this).hasClass('nohide'))
                        return;
                        if (direction === 'down') {
                            $(this).animate({ 'opacity': '1' }, 500);
                        }

                        else {
                            $(this).animate({ 'opacity': '0' }, 500);
                        }
                    },
                context: '#contentwrapper',
                offset: '100%'
            });
    $target.waypoint(
            {
                handler:
                    function (direction) {
                        $('.active').removeClass('active');
                        if (direction === 'up') {
                            $('#ls' + ($(this).attr('id')[1] - 1)).addClass('active');
                        }

                        else {
                            $('#l' + $(this).attr('id')).addClass('active');
                        }
                    },
                context: '#contentwrapper',
                offset: '50%'
            });
}
function waypointDestroy(n,$target)
{
    $target = $target == undefined ? $('.contentpane-full,.contentpane-full-sub') : $target;
    $target.waypoint('destroy');
}
function respond(t) {
    $contentwrapper.css('height', ($('html').outerHeight() - $('#topbar').outerHeight()) + 'px');
    if (t)
    {
        waypointDestroy(5);
        waypointInit(5);
    }
}
function readyrespond() {
    if (new Date() - rtime < delta) {
        setTimeout(readyrespond, delta);
    }
    else {
        timeout = false;
        respond(false);
    }
}