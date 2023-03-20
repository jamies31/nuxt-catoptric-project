<template>
  <div ref="container" id="webgl"></div>
</template>

<script>
import * as THREE from 'three'

export default {
	name: 'MirrorFrontPage',
  mounted() {
    // Set up the Three.js scene
    const scene = new THREE.Scene()

    const width = this.$refs.container.clientWidth
    const height = this.$refs.container.clientHeight || 400

    const camera = new THREE.PerspectiveCamera(
      75, // field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    )
    camera.position.z = 25
		camera.position.y = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(0x111827)

    this.$refs.container.appendChild(renderer.domElement)

    const x = 0, y = 0;
		const mirrorShape = new THREE.Shape();
		mirrorShape.moveTo( x +10 , y );
		mirrorShape.bezierCurveTo( x + 10, y - 10, x + 5, y - 15, x, y - 15 );
		mirrorShape.bezierCurveTo( x - 5, y - 15, x - 10, y - 10, x - 10, y );
		mirrorShape.bezierCurveTo( x - 10, y + 10, x - 5, y + 15, x, y + 15 );
		mirrorShape.bezierCurveTo( x + 5, y + 15, x + 10, y + 10, x + 10, y );

    const extrudeSettings = {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 5,
      bevelSize: 1,
      bevelThickness: 1,
    }

    const geometry = new THREE.ExtrudeGeometry(mirrorShape, extrudeSettings)

    const material = new THREE.MeshBasicMaterial({ color: 0xa8b0b2 })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Add some lighting
    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 0, 5)
    scene.add(light)

    // Start the animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      mesh.rotation.y += 0.01

      // Render the scene
      renderer.render(scene, camera)
    }
    animate()
  },
}
</script>

<style>
  canvas {
    display: block;
		width: 100% !important;
		height: 100%;
  }
	#webgl {
		width: 100%;
		height: 100%;
	}
</style>
