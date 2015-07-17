var yellow,
    yellowprev,
    sec,
    score,
    red,
    redprev,
    pathLength,
    optimum,
    counter,
    timeRate,
    cons,
    comboMax,
    highScore,
    highBat,
    longestCombo;
function showIns() {
    $('#dialog').slideUp(0).css('visibility', 'visible').slideDown(500);

}
function hideIns() {
    $('#dialog').slideUp(500);
}
function checkCookie() {
    var scorest = getCookie("scorest");
    if (scorest != "") {
        var arr = scorest.split('|');
        highScore = Number(arr[0]);
        highBat = Number(arr[1]);
        longestCombo = Number(arr[2]);
    }
    else {
        highScore = 0;
        highBat = 0;
        longestCombo = 0;
        scorest = "0|0|0";
        setCookie("scorest", scorest, 100);
    }
}
function setCookie(cname, cvalue, ex) {
    var d = new Date();
    d.setTime(d.getTime() + (ex * 365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function loadStat() {
    checkCookie();
    var statString = 'Highest Score:';
    statString = statString + String(highScore) + '<br/>';
    statString = statString + 'Most pies found in a single game:' + String(highBat) + '<br/>';
    statString = statString + 'Longest Combo Ever:' + String(longestCombo);
    document.getElementById('txtarea').innerHTML = statString;
}
function showStat() {
    $('#dialogstat').slideUp(0).css('visibility', 'visible').slideDown(500);
}
function hideStat() {
    $('#dialogstat').slideUp(500);
}
function checkCookie() {
    var scorest = getCookie("scorest");
    if (scorest != "") {
        var arr = scorest.split('|');
        highScore = Number(arr[0]);
        highBat = Number(arr[1]);
        longestCombo = Number(arr[2]);
    }
    else {
        highScore = 0;
        highBat = 0;
        longestCombo = 0;
        scorest = "0|0|0";
        setCookie("scorest", scorest, 100);
    }
}
function setCookie(cname, cvalue, ex) {
    var d = new Date();
    d.setTime(d.getTime() + (ex * 365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function init() {
    yellowprev = yellow = Math.floor(Math.random() * 16);
    while (yellow == yellowprev) {
        yellow = Math.floor(Math.random() * 16);
    }
    redprev = red = yellow
    while (yellow == red) {
        red = Math.floor(Math.random() * 16);
    }
    sec = 120;
    score = 0;
    pathLength = 0;
    counter = 0;
    cons = 0;
    timeRate = 1000;
    comboMax = 0;
    setOptimum();
    update();
}
init();
function cmnt() {
    if (score < 2000) return 'D';
    if (score < 5000) return 'C';
    if (score < 8000) return 'B';
    if (score < 10000) return 'A';
    if (score < 15000) return 'S';
    if (score < 20000) return 'SS';
    return 'SSS';
}
function setOptimum() {
    return optimum = Math.abs((red % 4) - (redprev % 4)) + Math.abs(Math.floor(red / 4) - Math.floor(redprev / 4));
}
function drawsc() {
    document.getElementById('d1').src = "img/" + String(score % 10) + ".png";
    document.getElementById('d2').src = "img/" + String((Math.floor(score / 10)) % 10) + ".png";
    document.getElementById('d3').src = "img/" + String((Math.floor(score / 100)) % 10) + ".png";
    document.getElementById('d4').src = "img/" + String((Math.floor(score / 1000)) % 10) + ".png";
    document.getElementById('d5').src = "img/" + String((Math.floor(score / 10000)) % 10) + ".png";
}
function drawtime() {
    document.getElementById('td3').src = "img/" + String((Math.floor(sec / 100)) % 10) + ".png";
    document.getElementById('td2').src = "img/" + String((Math.floor(sec / 10)) % 10) + ".png";
    document.getElementById('td1').src = "img/" + String(sec % 10) + ".png";
}
function update() {
    document.getElementById(String(yellowprev)).src = "img/gray.png";
    document.getElementById(String(yellow)).src = "img/yellow.png";
    if (yellow != red)
        document.getElementById(String(red)).src = "img/red.png";
}
function setnew() {
    redprev = red;
    while (yellow == red) {
        red = Math.floor(Math.random() * 16);
    }
    setOptimum();
    update();
}
function changeCombo(combo) {
    $('#combo').text('Combo ' + String(combo)).css({ 'bottom': '0', 'opacity': '1', 'visibility': 'visible' }).animate({ bottom: '60px', opacity: '0' }, 600);
}
function changeTi(x) {
    $('#ti').text('Time+' + String(x)).css({ 'bottom': '0', 'opacity': '1', 'visibility': 'visible' }).animate({ bottom: '60px', opacity: '0' }, 1200);
}
function changePerfect() {
    $('#perfect').css({ 'bottom': '0', 'opacity': '1', 'visibility': 'visible' }).animate({ bottom: '60px', opacity: '0' }, 300);
}
function moveLeft() { yellow--; pathLength++; }
function moveUp() { yellow -= 4; pathLength++; }
function moveRight() { yellow++; pathLength++; }
function moveDown() { yellow += 4; pathLength++; }
jQuery(document).ready(function () {
    $('#homepage').css({ 'height': String(window.screen.height) });
    var secTimer = window.setInterval(function () {
        sec--;
        drawtime();
        if (sec == 0) die();
    }, timeRate);
    function die() {
        clearInterval(secTimer);
        document.removeEventListener('keydown', key);
        window.setTimeout(function () {
            checkCookie();
            alert('Time up!! You found ' + String(counter) + ' pies, and scored ' + String(score) + 'points\n Rating:' + cmnt());
            if (score > highScore || counter > highBat || comboMax > longestCombo) {
                var scorest;
                if (score > highScore)
                    alert("New personal best!!: " + String(score));
                scorest = String(Math.max(score, highScore)) + "|" + String(Math.max(counter, highBat)) + "|" + String(Math.max(comboMax, longestCombo));
                setCookie("scorest", scorest, 100);
            }
            window.location.assign("index.html");
        }, 100);
    }
    var vis = (function () {
        var stateKey,
            eventKey,
            keys = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
            };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }
        return function (c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        }
    })();
    var notIE = (document.documentMode === undefined),
        isChromium = window.chrome;
    if (notIE && !isChromium) {
        $(window).on("focusin", function () {
            $('#status').css("visibility", 'hidden');
            secTimer = window.setInterval(function () {
                sec--;
                drawtime();
                if (sec == 0) die();
            }, timeRate);
        }).on("focusout", function () {
            $('#status').css("visibility", 'visible');
            clearInterval(secTimer);
        });
    }
    else {
        if (window.addEventListener) {
            window.addEventListener("focus", function (event) {
                $('#status').css("visibility", 'hidden');
                secTimer = window.setInterval(function () {
                    sec--;
                    drawtime();
                    if (sec == 0) die();
                }, timeRate);
            }, false);
            window.addEventListener("blur", function (event) {
                $('#status').css("visibility", 'visible');
                clearInterval(secTimer);
            }, false);
        }
        else {
            window.attachEvent("focus", function (event) {
                $('#status').css("visibility", 'hidden');
                secTimer = window.setInterval(function () {
                    sec--;
                    drawtime();
                    if (sec == 0) die();
                }, timeRate);
            });
            window.attachEvent("blur", function (event) {
                $('#status').css("visibility", 'visible');
                clearInterval(secTimer);
            });
        }
    }
    var str = '';
    function key(event) {
        if ((event.keyCode >= 37 && event.keyCode <= 40) || event.keyCode == 65 || event.keyCode == 87 || event.keyCode == 68 || event.keyCode == 83) {
            yellowprev = yellow;
            if ((event.keyCode == 37 || event.keyCode == 65) && yellow % 4) moveLeft();
            else if ((event.keyCode == 38 || event.keyCode == 87) && yellow > 3) moveUp();
            else if ((event.keyCode == 39 || event.keyCode == 68) && yellow % 4 != 3) moveRight();
            else if ((event.keyCode == 40 || event.keyCode == 83) && yellow < 12) moveDown();
            update();
            if (yellow == red && yellowprev != yellow) {
                counter++;
                var awarded = 6 + optimum - pathLength;
                if (awarded < 0) awarded = 0;
                if (awarded == 6) {
                    awarded += cons;
                    if (cons > 0) changeCombo(cons);
                }
                score += awarded;
                if (counter % 3 == 0) {
                    sec++;
                    var s = Math.round(cons / 200);
                    if (counter % 15 == 0 && cons > 100)
                        sec += s;
                    changeTi(s + 1);
                    drawtime();
                }
                if (optimum == pathLength) { cons++; changePerfect(); }
                else { if (cons > comboMax) comboMax = cons; cons = 0; }
                drawsc();
                setnew();
                pathLength = 0;
                setOptimum();
            }
        }
        else if (event.keyCode >= 65 && event.keyCode <= 90) {
            str = str + String.fromCharCode(event.keyCode);
            if (str.substring(str.length - 9, str.length) === 'MOVEBITCH') {
                timeRate = 5;
                str = '';
                clearInterval(secTimer);
                secTimer = window.setInterval(function () {
                    sec--;
                    drawtime();
                    if (sec == 0) die();
                }, timeRate);
            }
            else if (str.substring(str.length - 9, str.length) === 'POINTME') {
                timeRate = 50;
                str = '';
                clearInterval(secTimer);
                secTimer = window.setInterval(function () {
                    sec--;
                    drawtime();
                    if (sec == 0) die();
                }, timeRate);
            }
        }
    }
    document.addEventListener('keydown', key);
});