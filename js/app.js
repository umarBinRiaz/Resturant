/* =========================================================
   VELORA — APP.JS
   Cleaned up: removed duplicate blocks, added mobile nav,
   respects prefers-reduced-motion, skips heavy effects on touch.
========================================================= */

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
const isMobile = window.innerWidth <= 768;

/* ---------------------------------------------------------
   NAVBAR — scroll shadow + mobile hamburger toggle
--------------------------------------------------------- */

const navbar = document.querySelector("nav");
const navLinks = document.querySelector(".nav-links");
const menuBtn = document.querySelector(".menu-btn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(10,10,10,.85)";
        navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,.4)";
    } else {
        navbar.style.background = "rgba(255,255,255,.05)";
        navbar.style.boxShadow = "none";
    }
});

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("open");
    });
});

/* ---------------------------------------------------------
   HERO — entrance timeline
--------------------------------------------------------- */

const heroTl = gsap.timeline();

heroTl
    .to(".tag", { opacity: 1, y: 0, duration: .7, ease: "power3.out" })
    .to(".title", { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=.3")
    .to(".desc", { opacity: 1, y: 0, duration: .8, ease: "power3.out" }, "-=.5")
    .to(".buttons", { opacity: 1, y: 0, duration: .8, ease: "power3.out" }, "-=.5");

/* Subtle parallax drift on the hero copy, desktop only */

if (!isTouch && !prefersReducedMotion) {
    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - .5) * 18;
        const y = (e.clientY / window.innerHeight - .5) * 18;

        gsap.to(".left", { x: x, y: y, duration: 1, ease: "power2.out" });
    });
}

/* Button hover pop */

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("mouseenter", () => gsap.to(btn, { scale: 1.06, duration: .3 }));
    btn.addEventListener("mouseleave", () => gsap.to(btn, { scale: 1, duration: .3 }));
});

/* ---------------------------------------------------------
   CUSTOM CURSOR + AMBIENT SMOKE + LIGHT RING
   Desktop-only: skipped entirely on touch devices for
   performance and because a cursor dot serves no purpose there.
--------------------------------------------------------- */

if (!isTouch && !prefersReducedMotion) {

    const cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.appendChild(cursor);

    window.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    document.querySelectorAll("button,a").forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("big"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
    });

    const heroRight = document.querySelector(".right");
    const ring = document.createElement("div");
    ring.className = "light-ring";
    heroRight.appendChild(ring);

    gsap.to(ring, { rotation: 360, duration: 40, repeat: -1, ease: "none" });

    function createSmoke() {
        const smoke = document.createElement("div");
        smoke.className = "smoke";
        smoke.style.left = (Math.random() * 120 + 180) + "px";
        smoke.style.bottom = "100px";
        smoke.style.opacity = Math.random();
        smoke.style.animationDuration = (4 + Math.random() * 3) + "s";
        heroRight.appendChild(smoke);

        setTimeout(() => smoke.remove(), 7000);
    }

    setInterval(createSmoke, 260);
}

/* ---------------------------------------------------------
   MENU — filters, tilt, add-to-cart feedback
--------------------------------------------------------- */

const filters = document.querySelectorAll(".filter button");
const cards = document.querySelectorAll(".card");

filters.forEach(btn => {
    btn.addEventListener("click", function () {
        filters.forEach(x => x.classList.remove("active"));
        this.classList.add("active");

        const value = this.dataset.filter;

        cards.forEach(card => {
            const show = value === "all" || card.classList.contains(value);

            gsap.to(card, {
                opacity: show ? 1 : 0,
                scale: show ? 1 : .9,
                duration: .3,
                onStart: () => { if (show) card.style.display = "block"; },
                onComplete: () => { card.style.display = show ? "block" : "none"; }
            });
        });
    });
});

if (!isTouch) {
    cards.forEach(card => {
        card.addEventListener("mousemove", function (e) {
            const rotateY = ((e.offsetX / this.offsetWidth) - 0.5) * 16;
            const rotateX = ((e.offsetY / this.offsetHeight) - 0.5) * -16;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
        });
    });
}

document.querySelectorAll(".card button").forEach(btn => {
    btn.addEventListener("click", function () {
        this.innerHTML = "✓ Added";
        this.style.background = "#4CAF50";

        setTimeout(() => {
            this.innerHTML = "Add To Cart";
            this.style.background = "#ffb300";
        }, 1500);
    });
});

/* ---------------------------------------------------------
   ABOUT — animated counters + scroll reveals
--------------------------------------------------------- */

function animateCounter(id, target) {
    const element = document.getElementById(id);
    const speed = Math.max(1, Math.ceil(target / 100));
    let value = 0;

    const timer = setInterval(() => {
        value += speed;
        if (value >= target) {
            value = target;
            clearInterval(timer);
        }
        element.innerHTML = value + "+";
    }, 20);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter("customerCounter", 25000);
            animateCounter("dishCounter", 120);
            animateCounter("chefCounter", 35);
            animateCounter("awardCounter", 18);
            counterObserver.disconnect();
        }
    });
});

counterObserver.observe(document.querySelector(".about"));

gsap.from(".about-left", {
    x: -120, opacity: 0, duration: 1.2,
    scrollTrigger: { trigger: ".about", start: "top 75%" }
});

gsap.from(".about-right", {
    x: 120, opacity: 0, duration: 1.2,
    scrollTrigger: { trigger: ".about", start: "top 75%" }
});

gsap.utils.toArray(".about-card").forEach((card, i) => {
    gsap.from(card, {
        y: 60, opacity: 0, duration: .8, delay: i * .08,
        scrollTrigger: { trigger: card, start: "top 90%" }
    });
});

/* ---------------------------------------------------------
   CHEFS — reveal + tilt (tap-to-flip on touch)
--------------------------------------------------------- */

gsap.from(".section-tag, .section-title, .section-desc", {
    y: 60, opacity: 0, duration: 1, stagger: .15,
    scrollTrigger: { trigger: ".chefs", start: "top 78%" }
});

gsap.utils.toArray(".chef-card").forEach((card, i) => {
    gsap.from(card, {
        y: 90, opacity: 0, duration: .9, delay: i * .12,
        scrollTrigger: { trigger: card, start: "top 88%" }
    });
});

document.querySelectorAll(".chef-card").forEach(card => {
    if (isTouch) {
        card.addEventListener("click", () => card.classList.toggle("flipped"));
        return;
    }

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 16;
        const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -16;

        card.querySelector(".chef-inner").style.transform =
            card.classList.contains("flipped") || card.matches(":hover")
                ? `rotateY(180deg)`
                : `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

/* ---------------------------------------------------------
   GALLERY — lightbox + reveal + tilt
--------------------------------------------------------- */

const galleryImgs = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.querySelector(".close-lightbox");

galleryImgs.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImage.src = img.src;

        gsap.fromTo(lightboxImage,
            { scale: .7, opacity: 0 },
            { scale: 1, opacity: 1, duration: .5, ease: "power3.out" });
    });
});

closeLightbox.addEventListener("click", () => lightbox.classList.remove("active"));

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.classList.remove("active");
});

gsap.utils.toArray(".gallery-item").forEach((item, i) => {
    gsap.from(item, {
        opacity: 0, y: 80, scale: .92, duration: .8, delay: i * .06,
        scrollTrigger: { trigger: item, start: "top 92%" }
    });
});

if (!isTouch) {
    document.querySelectorAll(".gallery-item").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - .5) * 10;
            const y = ((e.clientY - rect.top) / rect.height - .5) * -10;

            card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
        });
    });
}

/* ---------------------------------------------------------
   RESERVATION — form submit + field focus + reveals
--------------------------------------------------------- */

const bookingForm = document.getElementById("bookingForm");
const bookingModal = document.querySelector(".booking-success");
const closeBooking = document.getElementById("closeBooking");

bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    bookingModal.classList.add("active");

    gsap.from(".booking-box", { scale: .5, opacity: 0, duration: .5, ease: "back.out(1.7)" });

    bookingForm.reset();
});

closeBooking.addEventListener("click", () => bookingModal.classList.remove("active"));

bookingModal.addEventListener("click", (e) => {
    if (e.target === bookingModal) bookingModal.classList.remove("active");
});

gsap.from(".reservation-left", {
    x: -100, opacity: 0, duration: 1,
    scrollTrigger: { trigger: ".reservation", start: "top 78%" }
});

gsap.from(".reservation-right", {
    x: 100, opacity: 0, duration: 1,
    scrollTrigger: { trigger: ".reservation", start: "top 78%" }
});

document.querySelectorAll("#bookingForm input, #bookingForm textarea, #bookingForm select").forEach(field => {
    field.addEventListener("focus", () => gsap.to(field, { scale: 1.02, duration: .2 }));
    field.addEventListener("blur", () => gsap.to(field, { scale: 1, duration: .2 }));
});

/* Keep isMobile referenced for future breakpoints without lint warnings */
void isMobile;
