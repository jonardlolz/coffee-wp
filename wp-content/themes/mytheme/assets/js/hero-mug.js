import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const container = document.querySelector('.coffee-mug-scene');

if (container) {
	try {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
		camera.position.set(3.1, 2.2, 4.4);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.15;
		container.appendChild(renderer.domElement);

		scene.add(new THREE.AmbientLight(0xffe6c6, 2.2));

		const keyLight = new THREE.DirectionalLight(0xfff1dc, 4);
		keyLight.position.set(-3, 5, 4);
		scene.add(keyLight);

		const rimLight = new THREE.DirectionalLight(0xd99a62, 2.5);
		rimLight.position.set(4, 2, -3);
		scene.add(rimLight);

		const mug = new THREE.Group();
		scene.add(mug);

		const bodyProfile = [
			new THREE.Vector2(0, -0.8),
			new THREE.Vector2(0.52, -0.8),
			new THREE.Vector2(0.66, -0.67),
			new THREE.Vector2(0.8, 0.5),
			new THREE.Vector2(0.82, 0.63),
			new THREE.Vector2(0.7, 0.68),
			new THREE.Vector2(0.65, 0.56),
			new THREE.Vector2(0.59, -0.52),
			new THREE.Vector2(0, -0.52),
		];
		const body = new THREE.Mesh(
			new THREE.LatheGeometry(bodyProfile, 10),
			new THREE.MeshStandardMaterial({
				color: 0xe7cba5,
				flatShading: true,
				roughness: 0.42,
				metalness: 0.02,
				side: THREE.DoubleSide,
			})
		);
		mug.add(body);

		const handle = new THREE.Mesh(
			new THREE.TorusGeometry(0.4, 0.115, 6, 9),
			new THREE.MeshStandardMaterial({
				color: 0xbc855b,
				flatShading: true,
				roughness: 0.4,
			})
		);
		handle.position.set(0.88, 0.03, 0);
		mug.add(handle);

		const coffee = new THREE.Mesh(
			new THREE.CircleGeometry(0.59, 10),
			new THREE.MeshStandardMaterial({
				color: 0x4a2d20,
				roughness: 0.24,
				metalness: 0.04,
				side: THREE.DoubleSide,
			})
		);
		coffee.rotation.x = -Math.PI / 2;
		coffee.position.y = 0.51;
		mug.add(coffee);

		mug.rotation.y = -0.35;

		const resizeObserver = new ResizeObserver(() => {
			const { width, height } = container.getBoundingClientRect();
			if (!width || !height) {
				return;
			}

			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, false);
		});
		resizeObserver.observe(container);

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const clock = new THREE.Clock();

		function render() {
			if (reducedMotion.matches) {
				renderer.render(scene, camera);
				return;
			}

			const elapsed = clock.getElapsedTime();
			mug.rotation.y = -0.35 + elapsed * 0.22;
			mug.position.y = Math.sin(elapsed * 1.3) * 0.035;
			renderer.render(scene, camera);
			window.requestAnimationFrame(render);
		}

		render();
	} catch (error) {
		console.error('Unable to render the hero coffee mug:', error);
	}
}
