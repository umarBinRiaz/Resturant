// js/threeScene.js

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.166/build/three.module.js";

const container = document.querySelector(".right");

const scene = new THREE.Scene();

scene.background = null;

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.set(0, 1, 7);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.shadowMap.enabled = true;

container.innerHTML = "";

container.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(
    0xffffff,
    1.8
);

scene.add(ambient);

const light = new THREE.DirectionalLight(
    0xffc107,
    5
);

light.position.set(6, 8, 6);

light.castShadow = true;

scene.add(light);

const fill = new THREE.PointLight(
    0xff8800,
    40,
    100
);

fill.position.set(-4, 3, 5);

scene.add(fill);

const rim = new THREE.PointLight(
    0xffffff,
    20,
    100
);

rim.position.set(4, 5, -5);

scene.add(rim);

const plate = new THREE.Mesh(

    new THREE.CylinderGeometry(
        2.8,
        2.8,
        0.25,
        64
    ),

    new THREE.MeshPhysicalMaterial({

        color: 0xffffff,

        roughness: .15,

        metalness: .15,

        clearcoat: 1

    })

);

plate.receiveShadow = true;

plate.position.y = -1.5;

scene.add(plate);

const burger = new THREE.Group();

scene.add(burger);

const bunMaterial = new THREE.MeshStandardMaterial({

    color: 0xd89a42

});

const meatMaterial = new THREE.MeshStandardMaterial({

    color: 0x5a2f16

});

const cheeseMaterial = new THREE.MeshStandardMaterial({

    color: 0xffd93d

});

const lettuceMaterial = new THREE.MeshStandardMaterial({

    color: 0x4caf50

});

const tomatoMaterial = new THREE.MeshStandardMaterial({

    color: 0xe53935

});

const topBun = new THREE.Mesh(

    new THREE.SphereGeometry(
        1.3,
        64,
        64
    ),

    bunMaterial

);

topBun.scale.y = .55;

topBun.position.y = .9;

topBun.castShadow = true;

burger.add(topBun);

const cheese = new THREE.Mesh(

    new THREE.CylinderGeometry(
        1.18,
        1.18,
        .12,
        40
    ),

    cheeseMaterial

);

cheese.position.y = .45;

burger.add(cheese);

const meat = new THREE.Mesh(

    new THREE.CylinderGeometry(
        1.1,
        1.1,
        .45,
        40
    ),

    meatMaterial

);

meat.position.y = .18;

burger.add(meat);

const tomato = new THREE.Mesh(

    new THREE.CylinderGeometry(
        1.05,
        1.05,
        .12,
        40
    ),

    tomatoMaterial

);

tomato.position.y = -.12;

burger.add(tomato);

const lettuce = new THREE.Mesh(

    new THREE.TorusGeometry(
        1.08,
        .08,
        20,
        100
    ),

    lettuceMaterial

);

lettuce.rotation.x = Math.PI / 2;

lettuce.position.y = -.25;

burger.add(lettuce);

const bottom = new THREE.Mesh(

    new THREE.CylinderGeometry(
        1.2,
        1.2,
        .55,
        40
    ),

    bunMaterial

);

bottom.position.y = -.65;

burger.add(bottom);

const sesameMaterial = new THREE.MeshStandardMaterial({

    color: 0xfff7d6

});

for (let i = 0; i < 120; i++) {

    const seed = new THREE.Mesh(

        new THREE.SphereGeometry(
            .03,
            8,
            8
        ),

        sesameMaterial

    );

    const theta = Math.random() * Math.PI * 2;

    const phi = Math.random() * 1.1;

    seed.position.set(

        Math.sin(phi) * Math.cos(theta) * 1.05,

        1.45 + Math.cos(phi) * .2,

        Math.sin(phi) * Math.sin(theta) * 1.05

    );

    burger.add(seed);

}

const particles = [];

for (let i = 0; i < 120; i++) {

    const p = new THREE.Mesh(

        new THREE.SphereGeometry(.02, 6, 6),

        new THREE.MeshBasicMaterial({

            color: 0xffb300

        })

    );

    p.position.set(

        (Math.random() - .5) * 8,

        Math.random() * 6 - 1,

        (Math.random() - .5) * 8

    );

    scene.add(p);

    particles.push(p);

}

const mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", e => {

    mouse.x = (e.clientX / window.innerWidth - .5) * 2;

    mouse.y = (e.clientY / window.innerHeight - .5) * 2;

});

window.addEventListener("resize", () => {

    camera.aspect = container.clientWidth / container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        container.clientWidth,

        container.clientHeight

    );

});

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    burger.rotation.y += 0.006;

    burger.position.y = Math.sin(t * 2) * .12;

    burger.rotation.x = mouse.y * .15;

    burger.rotation.z = mouse.x * .12;

    camera.position.x += ((mouse.x * 1.2) - camera.position.x) * .03;

    camera.position.y += (1 + (mouse.y * .5) - camera.position.y) * .03;

    camera.lookAt(0, 0, 0);

    particles.forEach((p, i) => {

        p.position.y += .01;

        if (p.position.y > 4) {

            p.position.y = -1;

        }

        p.rotation.x += .02;

        p.rotation.y += .03;

    });

    renderer.render(scene, camera);

}

animate();
const ingredientMaterial = new THREE.MeshStandardMaterial({

    color: 0x6dff52

});

const ingredients = [];

for (let i = 0; i < 18; i++) {

    const cube = new THREE.Mesh(

        new THREE.BoxGeometry(.15, .15, .15),

        ingredientMaterial

    );

    scene.add(cube);

    ingredients.push({

        mesh: cube,

        angle: (Math.PI * 2 / 18) * i,

        radius: 2.2 + Math.random() * .5,

        speed: .3 + Math.random()

    });

}

function animateIngredients(time) {

    ingredients.forEach(item => {

        item.angle += 0.004 * item.speed;

        item.mesh.position.x = Math.cos(item.angle) * item.radius;

        item.mesh.position.z = Math.sin(item.angle) * item.radius;

        item.mesh.position.y = Math.sin(time * 2 + item.angle) * .5 + .5;

        item.mesh.rotation.x += .02;

        item.mesh.rotation.y += .03;

    });

}