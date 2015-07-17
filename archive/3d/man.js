var defaultCamHeight = 4000;
var altitude = 0,
    azimuth = 0,
    magnitude = defaultCamHeight,
    zoomRate = 10;
var $container = $('body');
//keyboard
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 81)//q
    {
        magnitude += zoomRate * 3;
    }
    else if (event.keyCode == 87)//w
        altitude += Math.PI / 60;
    else if (event.keyCode == 69)//e
    {
        magnitude -= zoomRate * 3;
    }
    else if (event.keyCode == 65)//a
        azimuth -= Math.PI / 60;
    else if (event.keyCode == 83)//s
        altitude -= Math.PI / 60;
    else if (event.keyCode == 68)//d
        azimuth += Math.PI / 60;
    getRender();
});
function getRender() {
    magnitude = Math.abs(magnitude);
    if (magnitude < 110)
        magnitude = 100;
    point = [magnitude * Math.cos(altitude) * Math.cos(azimuth), magnitude * Math.cos(altitude) * Math.sin(azimuth), magnitude * Math.sin(altitude)];
    camera.position.z = point[0];
    camera.position.x = point[1];
    camera.position.y = point[2];
    camera.rotation.y = azimuth;
    camera.rotation.x = -altitude;
    renderer.render(scene, camera);
}
//mouse control
var mouseDown = false,
mouseX = 0,
mouseY = 0;
document.addEventListener('mousemove', function (e) {
    onMouseMove(e);
}, false);
document.addEventListener('mousedown', function (e) {
    onMouseDown(e);
}, false);
document.addEventListener('mouseup', function (e) {
    onMouseUp(e);
}, false);
document.addEventListener('mousewheel', function (e) {
    magnitude -= zoomRate * e.wheelDelta / 30;
    getRender();
});
function onMouseMove(evt) {
    if (!mouseDown) {
        return;
    }
    evt.preventDefault();
    dX = evt.clientX - mouseX;
    dY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(dX, dY);
}
function onMouseDown(evt) {
    evt.preventDefault();
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}
function onMouseUp(evt) {
    evt.preventDefault();
    mouseDown = false;
}
function rotateScene(x, y) {
    altitude += magnitude * Math.atan(y / magnitude) / 100;
    azimuth -= magnitude * Math.atan(x / magnitude) * Math.cos(altitude) / 100;
    getRender();
}
// set the scene size
var WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight;
// set some camera attributes
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.01,
  FAR = 100000;
//WebGL renderer
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xdddddd, 1);
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
var scene = new THREE.Scene();
//camera
scene.add(camera);
camera.position.z = defaultCamHeight;
camera.rotation.order = 'YXZ';
// start the renderer
renderer.setSize(WIDTH, HEIGHT);
// attach the render-supplied DOM element
$container.append(renderer.domElement);
// set up the objects
var headMaterial = new THREE.MeshLambertMaterial(
  {
      color: 0xCC0000
  });
var segments = 16,
    rings = 16;
var head = new THREE.Mesh(
    new THREE.SphereGeometry(1000, segments, rings),
    new THREE.MeshLambertMaterial({ color: 0x11FF00 })
    );
scene.add(head);
var eyeball = [];
for (i = 0; i < 2; i++)
{
    eyeball[i] = new THREE.Mesh(
    new THREE.SphereGeometry(200, segments, rings),
    new THREE.MeshLambertMaterial({ color: 0xCCCC00 })
    );
    eyeball[i].position.x = Math.pow(-1, i) * 270;
    eyeball[i].position.y = 450;
    eyeball[i].position.z = 850;
    scene.add(eyeball[i])
}
var earlobes = [];
for (i = 0; i < 2; i++) {
    earlobes[i] = new THREE.Mesh(
    new THREE.SphereGeometry(500, segments, rings),
    new THREE.MeshLambertMaterial({ color: 0x445500 })
    );
    earlobes[i].position.x = Math.pow(-1, i) * 750;
    scene.add(earlobes[i])
}
var neck = new THREE.Mesh(
    new THREE.SphereGeometry(300, segments, rings),
    new THREE.MeshLambertMaterial({ color: 0x11FF00 })
    );
neck.position.y = -1100;
scene.add(neck);
var body = new THREE.Mesh(
    new THREE.SphereGeometry(2000, segments, rings),
    new THREE.MeshLambertMaterial({ color: 0x11FF00 })
    );
body.position.y = -3200;
scene.add(body);
//point light
var pointLight = [];
k = 20;
for (i = 0; i < k; i++)
{
    pointLight[i]=new THREE.PointLight(0xFFFFFF);
    pointLight[i].position.x = Math.cos(i * 2 * Math.PI / k);
    pointLight[i].position.z = Math.sin(i * 2 * Math.PI / k);
    pointLight[i].position.y = 5000;
    scene.add(pointLight[i]);
}
//render
renderer.render(scene, camera);
