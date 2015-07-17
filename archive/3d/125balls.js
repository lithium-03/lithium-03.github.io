var altitude = 0,
            azimuth = 0,
            magnitude = 2000,
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
  NEAR = 0.1,
  FAR = 10000;
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
camera.position.z = 2000;
camera.rotation.order = 'YXZ';
// start the renderer
renderer.setSize(WIDTH, HEIGHT);
// attach the render-supplied DOM element
$container.append(renderer.domElement);
// set up the sphere vars
var radius = 50,
    segments = 16,
    rings = 16;
var sphereMaterial = new THREE.MeshLambertMaterial(
  {
      color: 0xCC0000
  });
var lineMaterial = new THREE.LineBasicMaterial({
    color: 0x0000ff
});
var bodies = [];
for (i = 0; i < 125; i++) {
    bodies[i] = new THREE.Mesh(new THREE.SphereGeometry(
        radius,
        segments,
        rings),
        sphereMaterial);
    bodies[i].position.x = -600 + Math.floor(i % 5) * 300;
    bodies[i].position.y = -600 + Math.floor((i % 25) / 5) * 300;
    bodies[i].position.z = -600 + Math.floor(i / 25) * 300;
    scene.add(bodies[i]);
}
var lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 1000, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(1000, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 1000));
var line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);
//point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);
pointLight.position.x = pointLight.position.y = pointLight.position.z = 1000;
scene.add(pointLight);
//render
renderer.render(scene, camera);
