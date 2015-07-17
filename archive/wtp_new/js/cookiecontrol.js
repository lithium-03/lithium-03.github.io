var highScore,
    highBat,
    longestCombo;
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
function setStats()
{
    checkCookie();
    var statString = 'Highest Score:';
    statString = statString + String(highScore) + '<br/>';
    statString = statString + 'Most pies found in a single game:' + String(highBat) + '<br/>';
    statString = statString + 'Longest Combo Ever:' + String(longestCombo);
    $('#statsblock').html(statString);
}