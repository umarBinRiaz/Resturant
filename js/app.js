const navbar = document.querySelector("nav");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(0,0,0,.7)";

        navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,.4)";

    } else {

        navbar.style.background = "rgba(255,255,255,.05)";

        navbar.style.boxShadow = "none";

    }

});

const image = document.querySelector(".right img");

document.addEventListener("mousemove", function (e) {

    const x = (window.innerWidth / 2 - e.clientX) / 35;

    const y = (window.innerHeight / 2 - e.clientY) / 35;

    image.style.transform = "rotateY(" + x + "deg) rotateX(" + (-y) + "deg)";

});

// js/app.js

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.to(".tag", {

    opacity: 1,

    y: 0,

    duration: .7,

    ease: "power3.out"

})

    .to(".title", {

        opacity: 1,

        y: 0,

        duration: 1,

        ease: "power4.out"

    }, "-=.3")

    .to(".desc", {

        opacity: 1,

        y: 0,

        duration: .8,

        ease: "power3.out"

    }, "-=.5")

    .to(".buttons", {

        opacity: 1,

        y: 0,

        duration: .8,

        ease: "power3.out"

    }, "-=.5");

gsap.to(".hero", {

    backgroundPosition: "100% 50%",

    repeat: -1,

    duration: 30,

    ease: "none"

});

gsap.to("nav", {

    background: "rgba(10,10,10,.85)",

    backdropFilter: "blur(20px)",

    scrollTrigger: {

        trigger: "body",

        start: "80 top",

        toggleActions: "play none none reverse"

    }

});

gsap.to(".left", {

    x: 0,

    opacity: 1,

    duration: 1.2

});

gsap.to(".right", {

    opacity: 1,

    scale: 1,

    duration: 1.5,

    ease: "power4.out"

});

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        gsap.to(btn, {

            scale: 1.08,

            duration: .3

        });

    });

    btn.addEventListener("mouseleave", () => {

        gsap.to(btn, {

            scale: 1,

            duration: .3

        });

    });

});

window.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - .5) * 20;

    const y = (e.clientY / window.innerHeight - .5) * 20;

    gsap.to(".left", {

        x: x,

        y: y,

        duration: 1

    });

});
/* ===========================
   ADD TO app.js
   =========================== */

const cursor = document.createElement("div");

cursor.className = "cursor";

document.body.appendChild(cursor);

window.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

});

document.querySelectorAll("button,a").forEach(el => {

    el.addEventListener("mouseenter", () => {

        cursor.classList.add("big");

    });

    el.addEventListener("mouseleave", () => {

        cursor.classList.remove("big");

    });

});

const hero = document.querySelector(".right");

const ring = document.createElement("div");

ring.className = "light-ring";

hero.appendChild(ring);

function createSmoke() {

    const smoke = document.createElement("div");

    smoke.className = "smoke";

    smoke.style.left = (Math.random() * 120 + 180) + "px";

    smoke.style.bottom = "100px";

    smoke.style.opacity = Math.random();

    smoke.style.animationDuration = (4 + Math.random() * 3) + "s";

    hero.appendChild(smoke);

    setTimeout(() => {

        smoke.remove();

    }, 7000);

}

setInterval(createSmoke, 220);

gsap.to(".light-ring", {

    rotation: 360,

    duration: 40,

    repeat: -1,

    ease: "none"

});

gsap.to(".circle", {

    scale: 1.15,

    duration: 3,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - .5) * 25;

    const y = (e.clientY / window.innerHeight - .5) * 25;

    gsap.to(".circle", {

        x: x,

        y: y,

        duration: 1.5,

        ease: "power3.out"

    });

});
const filters = document.querySelectorAll(".filter button");

const cards = document.querySelectorAll(".card");

filters.forEach(btn => {

    btn.onclick = function () {

        filters.forEach(x => x.classList.remove("active"));

        this.classList.add("active");

        const value = this.dataset.filter;

        cards.forEach(card => {

            if (value === "all") {

                card.style.display = "block";

            } else {

                if (card.classList.contains(value)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            }

        });

    };

});

cards.forEach(card => {

    card.addEventListener("mousemove", function (e) {

        const x = e.offsetX;

        const y = e.offsetY;

        const rotateY = ((x / this.offsetWidth) - 0.5) * 20;

        const rotateX = ((y / this.offsetHeight) - 0.5) * -20;

        this.style.transform =

            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    card.addEventListener("mouseleave", function () {

        this.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";

    });

});

document.querySelectorAll(".card button").forEach(btn => {

    btn.onclick = function () {

        this.innerHTML = "✓ Added";

        this.style.background = "#4CAF50";

        setTimeout(() => {

            this.innerHTML = "Add To Cart";

            this.style.background = "#ffb300";

        }, 1500);

    };

});
/* ==========================
ADD TO app.js
========================== */

function counter(id, target) {

    let value = 0;

    const speed = Math.ceil(target / 100);

    const element = document.getElementById(id);

    const timer = setInterval(() => {

        value += speed;

        if (value >= target) {

            value = target;

            clearInterval(timer);

        }

        element.innerHTML = value + "+";

    }, 20);

}

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            counter("customerCounter", 25000);

            counter("dishCounter", 120);

            counter("chefCounter", 35);

            counter("awardCounter", 18);

            observer.disconnect();

        }

    });

});

observer.observe(document.querySelector(".about"));

gsap.from(".about-left", {

    x: -150,

    opacity: 0,

    duration: 1.5,

    scrollTrigger: {

        trigger: ".about",

        start: "top 75%"

    }

});

gsap.from(".about-right", {

    x: 150,

    opacity: 0,

    duration: 1.5,

    scrollTrigger: {

        trigger: ".about",

        start: "top 75%"

    }

});

gsap.utils.toArray(".about-card").forEach(card => {

    gsap.from(card, {

        y: 80,

        opacity: 0,

        duration: 1,

        scrollTrigger: {

            trigger: card,

            start: "top 90%"

        }

    });

});
/* =========================
ADD TO app.js
========================= */

gsap.from(".section-head", {

    y: 100,

    opacity: 0,

    duration: 1.2,

    scrollTrigger: {
        trigger: ".chefs",
        start: "top 80%"
    }

});

gsap.utils.toArray(".chef-card").forEach((card, index) => {

    gsap.from(card, {

        y: 120,

        opacity: 0,

        duration: 1,

        delay: index * .15,

        scrollTrigger: {
            trigger: card,
            start: "top 90%"
        }

    });

});

const chefCards = document.querySelectorAll(".chef-card");

chefCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 15;

        const rotateX = ((y / rect.height) - 0.5) * -15;

        card.style.transform =
            `perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});
/* ==========================
PART 5 : APP.JS
========================== */

gsap.from(".section-title", {

    y: 80,

    opacity: 0,

    duration: 1.2,

    scrollTrigger: {

        trigger: ".chefs",

        start: "top 75%"

    }

});

gsap.from(".section-desc", {

    y: 50,

    opacity: 0,

    duration: 1,

    delay: .2,

    scrollTrigger: {

        trigger: ".chefs",

        start: "top 75%"

    }

});

gsap.utils.toArray(".chef-card").forEach((card, index) => {

    gsap.from(card, {

        y: 100,

        opacity: 0,

        duration: 1,

        delay: index * .15,

        scrollTrigger: {

            trigger: card,

            start: "top 85%"

        }

    });

});

document.querySelectorAll(".chef-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 18;

        const rotateX = ((y / rect.height) - 0.5) * -18;

        card.style.transform =

            `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";

    });

});
/* ==========================
PART 6 : app.js
========================== */

const galleryItems = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const closeLightbox = document.querySelector(".close-lightbox");

galleryItems.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.classList.add("active");

        lightboxImage.src = img.src;

        gsap.fromTo(

            lightboxImage,

            {

                scale: .7,

                opacity: 0

            },

            {

                scale: 1,

                opacity: 1,

                duration: .5,

                ease: "power3.out"

            }

        );

    });

});

closeLightbox.onclick = () => {

    lightbox.classList.remove("active");

};

lightbox.onclick = (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

};

gsap.utils.toArray(".gallery-item").forEach((item, index) => {

    gsap.from(item, {

        opacity: 0,

        y: 100,

        scale: .9,

        duration: .9,

        delay: index * .08,

        scrollTrigger: {

            trigger: item,

            start: "top 90%"

        }

    });

});

document.querySelectorAll(".gallery-item").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width - .5) * 12;

        const y = ((e.clientY - rect.top) / rect.height - .5) * -12;

        card.style.transform =

            `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";

    });

});
/* ==========================
PART 7 : APP.JS
========================== */

const bookingForm = document.getElementById("bookingForm");

const bookingModal = document.querySelector(".booking-success");

const closeBooking = document.getElementById("closeBooking");

bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    bookingModal.classList.add("active");

    gsap.from(".booking-box", {

        scale: .5,

        opacity: 0,

        duration: .5,

        ease: "back.out(1.7)"

    });

    bookingForm.reset();

});

closeBooking.onclick = function () {

    bookingModal.classList.remove("active");

};

bookingModal.addEventListener("click", function (e) {

    if (e.target === bookingModal) {

        bookingModal.classList.remove("active");

    }

});

gsap.from(".reservation-left", {

    x: -120,

    opacity: 0,

    duration: 1.2,

    scrollTrigger: {

        trigger: ".reservation",

        start: "top 75%"

    }

});

gsap.from(".reservation-right", {

    x: 120,

    opacity: 0,

    duration: 1.2,

    scrollTrigger: {

        trigger: ".reservation",

        start: "top 75%"

    }

});

document.querySelectorAll("#bookingForm input,#bookingForm textarea,#bookingForm select").forEach(field => {

    field.addEventListener("focus", () => {

        gsap.to(field, {

            scale: 1.02,

            duration: .2

        });

    });

    field.addEventListener("blur", () => {

        gsap.to(field, {

            scale: 1,

            duration: .2

        });

    });

});