import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import stars from './img/stars.jpg';
import sun from './img/sun.jpg'
import  mercury from './img/mercury.jpg';
import venus from './img/venus.jpg';
import earth from './img/earth.jpg';
import mars from './img/mars.jpg';
import saturn from './img/saturn.jpg';
import staurnring from './img/saturn ring.png';
import jupyter from './img/jupiter.jpg';
import uranus from './img/uranus.jpg';
import neptune from './img/neptune.jpg';
import uranusring from './img/uranus ring.png';
import s from './songs.mp3'
import { flattenJSON } from 'three/src/animation/AnimationUtils';



// creating dom element
const  renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


// creating scene
const scene=new THREE.Scene();
// creating camera
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight);
scene.add(camera);


// setting audio listente
const audio=new THREE.AudioListener();
camera.add(audio)
const sound=new THREE.Audio(audio);
const audioloader=new THREE.AudioLoader();
audioloader.load(s,function (buffer)
{
sound.setBuffer(buffer);
sound.setLoop(true);
sound.setVolume(0.3);



})

// adding cube texture loader
const cube=new THREE.CubeTextureLoader();
scene.background=cube.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars
])
const controls=new OrbitControls(camera,renderer.domElement);
controls.update()
camera.position.x=(-90,140,140);

const ambinet = new THREE.AmbientLight(0x545455);
scene.add(ambinet);
// texture loader
const texture =new THREE.TextureLoader();
//  creating sun

const light=new THREE.PointLight(0xffffff,200,300);
scene.add(light);
const sun1=new THREE.SphereGeometry(10,40,40);
const material=new THREE.MeshBasicMaterial({
  map:texture.load(sun)
})
const mesh=new THREE.Mesh(sun1,material);
scene.add(mesh);


function create_plant(size,textures,position,ring)
{
  const geometry=new THREE.SphereGeometry(size,30,30);
  const materials=new THREE.MeshStandardMaterial({
    map:texture.load(textures)
  })
  const plant=new THREE.Mesh(geometry,materials);
  const PlantObj=new THREE.Object3D();
  PlantObj.add(plant);
  scene.add(PlantObj);
  plant.position.x=position;
  if(ring)
  {
  const rings=new THREE.RingGeometry(ring.innerRadius,ring.outerRadius,30)
  const ringma=new THREE.MeshStandardMaterial({
    map:texture.load(ring.texturess),
    side: THREE.DoubleSide
  });
  const ringeometry=new THREE.Mesh(rings,ringma);
  PlantObj.add(ringeometry);
  ringeometry.position.x=position;
  ringeometry.rotation.x=-0.5*Math.PI;
  }
  return {plant,PlantObj}
}

const mercurys=new create_plant(4,mercury,20)
const venuss=new create_plant(5,venus,40);
const earths=new create_plant(6,earth,62);
const marss=new create_plant(7,mars,85)
const jupiters=new create_plant(9,jupyter,120);
const saturns=new create_plant(8,saturn,160,{
  innerRadius:10,
  outerRadius:20,
  texturess: staurnring
})
const uranuss=new create_plant(7,uranus,180,{
  innerRadius:10,
  outerRadius:20,
  texturess: uranusring
})
const neptunes=new create_plant(8,neptune,200)
function loop()
{
   
   mercurys.plant.rotateY(0.001);
   mercurys.PlantObj.rotateY(0.006);
   venuss.plant.rotateY(0.0012);
   venuss.PlantObj.rotateY(0.0015);
   earths.plant.rotateY(0.012);
   earths.PlantObj.rotateY(0.0012);
   marss.plant.rotateY(0.013);
   marss.PlantObj.rotateY(0.0019);
   jupiters.plant.rotateY(0.04);
   jupiters.PlantObj.rotateY(0.0023);
   saturns.plant.rotateY(0.01);
   saturns.PlantObj.rotateY(0.0021);
   uranuss.plant.rotateY(0.01);
   uranuss.PlantObj.rotateY(0.0015);
   neptunes.plant.rotateY(0.01);
   neptunes.PlantObj.rotateY(0.001);
  renderer.render(scene,camera)
}
renderer.setAnimationLoop(loop);

const soundco=document.querySelector('.soundc');
var a=1;
soundco.addEventListener("click",()=>{
if(a==1)
{
 sound.play()
 a--;
}
else
{
  sound.pause();
  a++;
}
})
