$(window).on('keydown', function () {
    vy = 250;
});
$(document).on('click', function () {
    vy = 250;
});
var vy = 0,
    sy = 0,
    h = window.innerHeight;
var t = new Date();
window.setInterval(function ()
{
    Time = new Date();
    g = -1000;
    dt = (Time - t) / 1000;
    t = Time;
    if (sy < 0.001&&vy<0.001)
    {
        sy = 0;
        vy = 0;
        draw();
    }
    if (sy === 0 && vy === 0)
        return;
    ds = (vy * dt) + (0.5 * g * dt * dt);
    dvg = g * dt;
    sy += ds;
    draw();
    vy += dvg;
},5);
function draw() {
    $('#bird').css({ 'bottom': String(sy * h / 200) + 'px' });
}