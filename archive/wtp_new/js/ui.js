var rtime = new Date(1, 1, 2000, 12, 00, 00),
    timeout = false,
    delta = 150;
var width,
    height,
    tileWidth,
    flipSize,
    d;
$(document).ready(function ()
{
    $('#onscreenbuttons').hide()
    setStats();
    respond();
    d=window.setInterval(snap,1000);
    $(window).bind('orientationchange resize', function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            window.setTimeout(readyrespond, delta);
        }
    });
    $('body').animate({
        scrollLeft: 0
    }, 1);
    $('.touchbutton').attr('onclick', 'touchHandler(this.id);');
    $('body').mousedown(function (e) {
        if (e.button == 1)
            return false;
    });
    $('.gameitem').mouseenter(function () {
        $(this).addClass('menuhighlighted');
    });
    $('.gameitem').mouseleave(function () {
        $(this).removeClass('menuhighlighted');
    });
    $('.menuitem').mouseenter(function () {
        $(this).addClass('menuhighlighted');
    });
    $('.menuitem').mouseleave(function () {
        $(this).removeClass('menuhighlighted');
    });
    $("#contentblock").niceScroll();
    $("a.menuitem").niceScroll();
    $(window).on('gameOver', endGame);
    /*$(document).keyDownCombo({
        keys: [77, 79, 86, 69, 66, 73, 84, 67, 72],
        onComplete: function () { timeRate=100; }
    });*/
});
function snap()
{
    if(scrollX!=0&&pageStatus=='home'||scrollX!=width&&pageStatus=='game')
    {
    if (pageStatus == 'game')
    $('body,html').stop().animate({
        scrollLeft: $('#gamepage').offset().left
    },1);
    else
    $('body,html').stop().animate({
        scrollLeft: 0
    },1);
    }
    if(scrollY!=0)
    $('body,html').stop().animate({
        scrollTop: 0
    },1);
}
function readyrespond()
{
    if (new Date() - rtime < delta)
    {
        setTimeout(readyrespond, delta);
    }
    else
    {
        timeout = false;
        respond();
    }
}
function respond() {
    width = window.innerWidth;
    height = window.innerHeight;
    $('.page').css({
        'height': String(height) + 'px',
        'width': String(width) + 'px'
    });
    $('#gamepage').css({
        'left': String(width) + 'px'
    });
    titleheight = pxtonum($('#hometitle').css('height'));
    contentblockheight = height - titleheight;
    $('#contentblock').css({ 'max-height': String(contentblockheight - 60) + 'px' });
    if(width/5<140)
    {
        $('#menubar').css({ 'width': '140px' });
        $('#contentblock').css({ 'width': String(width-175) + 'px' });
    }
    else if (width / 5 > 250)
    {
        $('#menubar').css({ 'width': '250px' });
        $('#contentblock').css({ 'width': String(width - 285) + 'px' });
    }
    else
    {
        $('#menubar').css({ 'width': '20%' });
        $('#contentblock').css({ 'width': '75%' });
    }
    flippos=pxtonum($('#flipcontainer').css('top'));
    if (height/5 <= titleheight + 15)
    {
        $('#flipcontainer').css({ 'top': String(titleheight + 15)+'px' });
    }
    else
    {
        $('#flipcontainer').css({ 'top': '20%' });
    }
    flipwidth = pxtonum($('#flipcontainer').css('width'));
    tileWidth = Math.min(width - flipwidth, contentblockheight)/4-20;
    gameboard=pxtonum($('.gridcontainer').css('width'));
    $('.cell,#pie,#chef').css({
        'height': String(tileWidth) + 'px',
        'width': String(tileWidth) + 'px'
    });/*
    if (flipwidth / (gameboard+flipwidth) > 0.20 && flipSize == 'lg')
    {
        resetCounters();
        initCounters('md');
        respond();
    }
    if (flipwidth / (gameboard + flipwidth) < 0.19 && flipSize == 'md') {
        resetCounters();
        initCounters('lg');
        respond();
    }*/
    putChef('no');
    putpie('no');
}
function putChef(mode)
{
    mode = mode == undefined ? 'animate' : 'noanimate';
    k = $('#' + String(Math.floor(chef / 4) + 1) + String(Math.floor(chef % 4) + 1)).offset().top;
    j = $('#' + String(Math.floor(chef / 4) + 1) + String(Math.floor(chef % 4) + 1)).offset().left - width;
    if (mode === 'animate')
        $('#chef').animate({ 'top': String(k) + 'px', 'left': String(j) + 'px' }, 100);
    else
        $('#chef').css({ 'top': String(k) + 'px', 'left': String(j) + 'px' });
}
function putpie(mode)
{
    mode = mode == undefined ? 'animate' : 'noanimate';
    k = $('#' + String(Math.floor(pie / 4) + 1) + String(Math.floor(pie % 4) + 1)).offset().top;
    j = $('#' + String(Math.floor(pie / 4) + 1) + String(Math.floor(pie % 4) + 1)).offset().left - width;
    if (mode === 'animate')
        $('#pie').css({ 'top': String(k) + 'px', 'left': String(j) + 'px' }).hide().show('scale', { percent: 100 });
    else
        $('#pie').css({ 'top': String(k) + 'px', 'left': String(j) + 'px' });
}
function pxtonum(a)
{
    return Number(a.substring(0, a.length - 2));
}
function highlight(a,c,d)
{
    c = typeof c !== 'undefined' ? c : '#DEFFF5';
    d = typeof d !== 'undefined' ? d : 500;
    $(a).stop().animate({
        backgroundColor: '#DEDE35'
    }, d).animate({
            backgroundColor: c
        },d);
}
function changeCombo() {
    $('.combo').text('Combo ' + String(cons)).css({ 'bottom': '0', 'opacity': '1', 'visibility': 'visible' }).animate({ bottom: '60px', opacity: '0' }, 800);
}
function changeTi(x) {
    $('.bonus').text('Time+' + String(x)).css({ 'bottom': '0', 'opacity': '1', 'visibility': 'visible' }).animate({ bottom: '60px', opacity: '0' }, 1200);
}
function changePerfect() {
    $('.perfect').text('Perfect!').css({ 'bottom': '0', 'opacity': '1', 'visibility': 'visible' }).animate({ bottom: '60px', opacity: '0' }, 600);
}
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            id=$(target).attr('id')
            if (id === 'homepage' || id === 'gamepage') {
                if (target.length) {
                    clearInterval(d);
                    window.setTimeout(function () {
                        d = window.setInterval(snap, 1000);
                    }, 1000);
                    $('html,body').animate({
                        scrollLeft: target.offset().left
                    }, 500);
                    return false;
                }
            }
            else if(id==='statsblock'||id==='instructions'){
                if (target.length) {
                    $('#contentblock').animate({
                        scrollTop: target.offset().top
                    }, 500);
                    return false;
                }
            }
        }
    });
});
(function ($) {
    $.fn.nodoubletapzoom = function () {
        $(this).bind('touchstart', function preventZoom(e) {
            var t2 = e.timeStamp
              , t1 = $(this).data('lastTouch') || t2
              , dt = t2 - t1
              , fingers = e.originalEvent.touches.length;
            $(this).data('lastTouch', t2);
            if (!dt || dt > 300 || fingers > 1) return;
            e.preventDefault(); 
            $(this).trigger('click').trigger('click');
        });
    };
})(jQuery);
