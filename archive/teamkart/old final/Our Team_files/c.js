// JavaScript source code
var clicks = 0,
    toaststring = "",
    c;
function showtoast()
{
    $('#toast').html(toaststring);
}
$(document).ready(function () {
    $('#toast').on('click',function(){$('#toast').slideUp();});
    $('#vishnu').on('click', function () {
        clicks++;
        if(c!==undefined)
        clearTimeout(c);
        if(clicks==1)
        return;
    $('#toast').slideDown();
        switch(clicks)
        {
            case 2:
            case 3:
            case 4:
                toaststring = String(5 - clicks) + " more clicks to go";
                break;
            case 5:
                toaststring = "Congratulations!! You are now an ATMEGA Developer :P";
                break;
            default:
                toaststring = "You are already a God!!";
        }
        showtoast();
        c=window.setTimeout(function () { $('#toast').slideUp(); }, 2000);
    });
});