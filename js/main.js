// Three.js background animation
const createBackground = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('hero-background').appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x6d28d9, wireframe: true });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
        icosahedron.rotation.x += 0.005;
        icosahedron.rotation.y += 0.005;
        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .community-card').forEach(el => {
    observer.observe(el);
});

// Initialize background animation
if (document.getElementById('hero-background')) {
    createBackground();
}

// 404 page animation
if (document.body.classList.contains('error-page')) {
    const errorBackground = document.getElementById('error-background');
    const ctx = errorBackground.getContext('2d');
    errorBackground.width = window.innerWidth;
    errorBackground.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * errorBackground.width;
            this.y = Math.random() * errorBackground.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }
        draw() {
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let particlesArray = [];
    const numberOfParticles = 100;

    const createParticles = () => {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, errorBackground.width, errorBackground.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (particlesArray[i].size <= 0.2) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
        if (particlesArray.length < numberOfParticles) {
            createParticles();
        }
        requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        errorBackground.width = window.innerWidth;
        errorBackground.height = window.innerHeight;
    });
}
