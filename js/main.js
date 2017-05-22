const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000)
const controls = new THREE.VRControls(camera)
const effect = new THREE.VREffect(renderer)

effect.setSize(window.innerWidth, window.innerHeight)

const manager = new WebVRManager(renderer, effect)
const cursor = new Cursor(camera)
scene.add(camera)

// Create 3D objects.
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material = new THREE.MeshNormalMaterial()
const cube1 = new THREE.Mesh(geometry, material)
const cube2 = new THREE.Mesh(geometry, material)
const cube3 = new THREE.Mesh(geometry, material)

const cubes = [cube1, cube2, cube3]

cubes.forEach((cube, i) => {
  cube.onFusing = function () {
    console.warn('fusing')

    if (cube.position.z < -1) {
      cube.position.z = cube.position.z + 0.05
    }
  }

  cube.onFused = function () {
    console.warn('onfused')
  }

  cube.onFuseEnd = function (){
    console.warn('onfuseend')
  }

  cube.position.z = -6
  cube.position.x = i - 1

  cursor.addItem(cube)
  scene.add(cube)
})

// Request animation frame loop function
function animate () {
  cube1.rotation.y += 0.01
  cube2.rotation.z += 0.01
  cube3.rotation.x += 0.01

  controls.update()
  manager.render(scene, camera)
  cursor.update()

  requestAnimationFrame(animate)
}

animate()
