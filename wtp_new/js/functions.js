var time,
    score = 0,
    chef=0,
    pie=0,
    pieprev,
    pathLength,
    optimum,
    counter,
    cons,
    comboMax,
    startTime,
    pageStatus = 'home';
function newGame()
{
    startTime = new Date();
    $(window).trigger('resize');
    initCounters('lg');
    pageStatus = 'game';
    $('#onscreenbuttons').show('slide', { direction: 'bottom' }, 1000);
    chef = Math.floor(Math.random() * 16);
    pieprev = pie = chef;
    while (chef == pie)
        pie = Math.floor(Math.random() * 16);
    score = 0;
    pathLength = 0;
    counter = 0;
    cons = 0;
    timeRate = 1000;
    comboMax = 0;
    setOptimum();
    putChef();
    putpie();
    $(window).bind('keydown', controller);
}
function endGame()
{
    pageStatus = 'home';
    startTime = undefined;
    //resetCounters();
    $('#onscreenbuttons').hide('slide', { direction: 'bottom' }, 1000);
    $(window).unbind('keydown', controller);
    $(window).unbind('gameOver', endGame);
}
function controller(event)
{
    if ((event.keyCode >= 37 && event.keyCode <= 40) || event.keyCode == 65 || event.keyCode == 87 || event.keyCode == 68 || event.keyCode == 83)
    {
        if (event.keyCode == 37 || event.keyCode == 65)
            move('left');
        else if (event.keyCode == 38 || event.keyCode == 87)
            move('up');
        else if (event.keyCode == 39 || event.keyCode == 68)
            move('right');
        else if (event.keyCode == 40 || event.keyCode == 83)
            move('down');
    checkCapture();
    }
}
function touchHandler(direction)
{
    highlight('#' + direction, 'rgba(222,255,245,0.4)', 300);
    var event = jQuery.Event("keydown");
    switch(direction)
    {
        case 'up':
            event.keyCode = 38;
            break;
        case 'left':
            event.keyCode = 37;
            break;
        case 'down':
            event.keyCode = 40;
            break;
        case 'right':
            event.keyCode = 39;
            break;
    }
    $(window).trigger(event);
}

function checkCapture()
{
    if (chef == pie) {
        counter++;
        awarded = 6 + optimum - pathLength;
        if (awarded < 0) awarded = 0;
        if (awarded == 6) {
            awarded += cons;
            if (cons > 0) changeCombo(cons);
        }
        score += awarded;
        if (counter % 3 == 0) {
            addTime();
            var s=0;
            if (counter % 15 == 0 && cons > 100)
            {
                s = Math.round(cons / 200);
                addTime(s);
            }
            changeTi(s + 1);
        }
        if (optimum == pathLength) {
            cons++;
            changePerfect(); 
        }
        else
        {
            if (cons > comboMax)
                comboMax = cons;
            cons = 0;
        }
        setnew();
        pathLength = 0;
        setOptimum();
        return s + 1;
    }
}
function move(direction)
{
    if (direction === 'left' && chef % 4)
        {
            chef--;
            pathLength++; 
        }
    else if (direction === 'up' && chef > 3)
    {
        chef -= 4;
        pathLength++; 
    }
    else if (direction === 'right' && chef % 4 != 3)
    {
        chef++;
        pathLength++; 
    }
    else if (direction === 'down' && chef < 12)
    {
        chef += 4;
        pathLength++; 
    }
    putChef();
}
function initCounters(a) {
    $('#time').flipcountdown({
        size: a,
        tick: function () {
            cur = new Date();
            time = cur - startTime;
            time = Math.floor(time / 1000) < 120 ? 120 - Math.floor(time / 1000) : 0;
            if (time == 0)
                $("#nil").trigger('click');
            return time;
        }
    });
    $('#scoreboard').flipcountdown({
        size: a,
        tick: function () {
            $(window).trigger('resize');
            return score;
        }
    });
    flipSize = a;
}
function resetCounters() {
    $('#time,#scoreboard').remove();
    $('#timelabel').after('<div id="time"></div>');
    $('#scorelabel').after('<div id="scoreboard"></div>');
}
function setOptimum() {
    return optimum = Math.abs((pie % 4) - (pieprev % 4)) + Math.abs(Math.floor(pie / 4) - Math.floor(pieprev / 4));
}
function setnew() {
    pieprev = pie;
    while (chef == pie) {
        pie = Math.floor(Math.random() * 16);
    }
    setOptimum();
    putpie();
}
function addTime(a)
{
    a = a == undefined ? 1 : a;
    startTime.setSeconds(startTime.getSeconds() + a);
}
