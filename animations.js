// Register GSAP plugins (Safe Check)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// --- DEFENSIVE INITIALIZATION ENGINE ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Global Persistent Theme Engine (Pill UI) ---
    (function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const root = document.documentElement;
        const ripple = document.querySelector('.theme-ripple');
        
        if (!themeToggle || !ripple) return;

        let isDark = root.getAttribute('data-theme') === 'dark';
        let isAnimatingTheme = false;

        themeToggle.addEventListener('click', (e) => {
            if (isAnimatingTheme) return;
            isAnimatingTheme = true;

            const rect = themeToggle.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '2px';
            ripple.style.height = '2px';
            
            const targetTheme = isDark ? 'light' : 'dark';
            ripple.style.background = targetTheme === 'light' ? '#F9F9F9' : '#0B0B0B';

            const maxDimension = Math.max(window.innerWidth, window.innerHeight);
            const scale = maxDimension * 2.5;

            gsap.to(ripple, {
                scale: scale,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    isDark = !isDark;
                    localStorage.setItem('phix-theme', isDark ? 'dark' : 'light');
                    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
                    gsap.set(ripple, { scale: 0 });
                    isAnimatingTheme = false;
                }
            });
        });
    })();

    // --- 2. Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn, .theme-toggle-pill');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
        });
    });

    // --- 3. Staggered Text & Headings ---
    const staggeredHeadings = gsap.utils.toArray('.staggered-heading');
    staggeredHeadings.forEach(heading => {
        const words = heading.querySelectorAll('span, p');
        if (words.length > 0) {
            ScrollTrigger.create({
                trigger: heading,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(words, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", overwrite: "auto" });
                }
            });
        }
    });

    const staggeredTexts = gsap.utils.toArray('.staggered-text');
    staggeredTexts.forEach(textEl => {
        ScrollTrigger.create({
            trigger: textEl,
            start: "top 90%",
            onEnter: () => {
                gsap.to(textEl, { y: 0, opacity: 1, duration: 1, ease: "power2.out", overwrite: "auto", delay: 0.2 });
            }
        });
    });

    // --- 5. Cinematic Zoom Parallax (Sovereign Pin Architecture) ---
    const zoomSection = document.querySelector('.zoom-parallax-section');
    if (zoomSection) {
        const items = gsap.utils.toArray('.parallax-item');
        const scales = [3.5, 4.2, 5.5, 4.2, 5.5, 7.5, 8.5]; // Amplified for High-Immersion expansion

        const zoomTl = gsap.timeline({
            scrollTrigger: {
                trigger: zoomSection,
                start: "top top",
                end: "+=250%", // Stay pinned for 2.5 viewports of scroll
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        items.forEach((item, i) => {
            const targetScale = scales[i % scales.length];
            zoomTl.to(item, {
                scale: targetScale,
                ease: "none"
            }, 0);
        });

        // Fade Titles out as zoom deepens
        zoomTl.to(".mosaic-center-content", {
            opacity: 0,
            scale: 0.8,
            ease: "power1.inOut"
        }, 0.2); // Start fading slightly after zoom begins
    }
    
    // --- 6. Home-Page Guards ---
    const spiralContainer = document.querySelector('.spiral-container');
    if (spiralContainer) {
        gsap.to(".spiral-path", {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: spiralContainer,
                start: "top 90%",
                end: "top 30%", // Complete DRAW quickly while scrolling
                scrub: 1
            }
        });
    }

    const mIcons = document.querySelectorAll('.m-icon');
    if (mIcons.length > 0) {
        mIcons.forEach(icon => {
            const wrapper = icon.parentElement;
            wrapper.addEventListener('mousemove', (e) => {
                const rect = icon.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(icon, { rotationY: x * 0.6, rotationX: -y * 0.6, z: 20, ease: "power1.out", duration: 0.3 });
            });
            wrapper.addEventListener('mouseleave', () => {
                gsap.to(icon, { rotationY: 0, rotationX: 0, z: 0, ease: "power3.out", duration: 0.6 });
            });
        });
    }

    const fragments = gsap.utils.toArray('.fragment');
    if (fragments.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            fragments.forEach((frag, i) => {
                const depth = (i + 1) * 20;
                gsap.to(frag, { x: x * depth, y: y * depth, rotation: x * (depth / 3), duration: 1.5, ease: "power2.out", overwrite: "auto" });
            });
        });
    }

    // --- 5. Digital Ecosystem 3D Cloud ---
    const ecoCanvas = document.getElementById('ecosystem-canvas');
    if (ecoCanvas && typeof TagCanvas !== 'undefined') {
        const initEcosystemCloud = () => {
            try {
                TagCanvas.Start('ecosystem-canvas', 'ecosystem-list', {
                    textColour: "#D4AF37", reverse: true, depth: 0.85, maxSpeed: 0.04, minSpeed: 0.012, wheelZoom: false,
                    initial: [0.1, -0.1], imageMode: 'image', imageScale: 1.0, fadeIn: 2500, padding: 25, maxBlur: 1.2,
                    minBrightness: 0.2, outlineColour: 'transparent', clickToFront: 600, imageAlign: 'middle', imageVAlign: 'middle',
                    noSelect: true, activeCursor: 'pointer'
                });
            } catch(e) { console.warn("TagCanvas module fails on this page."); }
        };
        setTimeout(initEcosystemCloud, 800);
    }

    // --- 7. Sovereign Service Carousel Logic ---
    (async function initFeatureCarousel() {
        const track = document.getElementById('selector-track');
        const stack = document.getElementById('card-stack');
        if (!track || !stack) return;

        try {
            const res = await fetch('services.json');
            if(res.ok) {
                const services = await res.json();
                if(services.length > 0) {
                    track.innerHTML = '';
                    stack.innerHTML = '';
                    services.forEach((s, idx) => {
                        track.innerHTML += `
                            <button class="feature-chip btn-premium-cta ${idx===0 ? 'active':''}" data-index="${idx}">
                                <span class="btn-text">${s.btnText || s.title}</span>
                                <div class="btn-icon-circle">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </div>
                            </button>
                        `;
                        const ptsHTML = s.points ? s.points.map(p => `<li><strong>${p}</strong></li>`).join('') : '';
                        stack.innerHTML += `
                            <div class="content-card ${idx===0 ? 'active':'hidden'}" data-index="${idx}">
                                <h4 class="accent">${s.title}</h4>
                                <p class="card-description">${s.description || ''}</p>
                                <ul class="card-points">${ptsHTML}</ul>
                            </div>
                        `;
                    });
                }
            }
        } catch(e) { console.warn("Could not fetch dynamic services:", e); }

        const chips = document.querySelectorAll('.feature-chip');
        const cards = document.querySelectorAll('.content-card');
        if (!chips.length || !cards.length) return;

        let currentIndex = 0;
        let isPaused = false;
        
        function updateCarousel(index) {
            currentIndex = (index + chips.length) % chips.length;

            chips.forEach((chip, i) => {
                if (i === currentIndex) {
                    chip.classList.add('active');
                    gsap.to(chip, { scale: 1, opacity: 1, duration: 0.5 });
                } else {
                    chip.classList.remove('active');
                    gsap.to(chip, { scale: 1, opacity: 0.6, duration: 0.5 });
                }
            });

            cards.forEach((card, i) => {
                const diff = i - currentIndex;
                const len = cards.length;
                let normDiff = diff;
                if (diff > len / 2) normDiff -= len;
                if (diff < -len / 2) normDiff += len;

                const isMobile = window.innerWidth <= 1024;
                
                let tx = 0;
                if (!isMobile) {
                    if (normDiff === 0) tx = 0;
                    else if (normDiff === 1) tx = 730;
                    else if (normDiff === -1) tx = -730;
                    else if (normDiff === 2) tx = 1380;
                    else if (normDiff === -2) tx = -1380;
                }

                const isCenter = normDiff === 0;
                const isAdjacent = Math.abs(normDiff) === 1;

                card.className = 'content-card';
                if (isCenter) card.classList.add('active');
                else if (normDiff === -1) card.classList.add('prev');
                else if (normDiff === 1) card.classList.add('next');
                else card.classList.add('hidden');

                gsap.to(card, {
                    x: tx,
                    scale: isMobile ? (isCenter ? 1 : 0.95) : (isCenter ? 1 : 0.8),
                    opacity: isCenter ? 1 : (isMobile ? 0 : (isAdjacent ? 0.5 : 0.1)),
                    duration: 0.8,
                    ease: "power3.out",
                    zIndex: isCenter ? 20 : (isAdjacent ? 10 : 5)
                });
            });
        }

        chips.forEach((chip, i) => {
            chip.addEventListener('click', () => {
                updateCarousel(i);
                isPaused = true;
                setTimeout(() => { isPaused = false; }, 5000);
            });
            chip.addEventListener('mouseenter', () => isPaused = true);
            chip.addEventListener('mouseleave', () => isPaused = false);
        });

        // Initial Layout
        updateCarousel(0);
    })();

    // --- 8. Background Atmos Purified per request ---
});

// --- GLOBAL MOBILE NAVIGATION CONTROLLER ---
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileOverlay');
    if (!overlay) return;
    
    if (overlay.classList.contains('active')) {
        gsap.to(overlay, { 
            opacity: 0, 
            y: -50, 
            duration: 0.5, 
            ease: "power3.in",
            onComplete: () => {
                overlay.classList.remove('active');
                gsap.set(overlay, { y: 0 });
            }
        });
    } else {
        overlay.classList.add('active');
        gsap.fromTo(overlay, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
        
        // Stagger links
        const links = overlay.querySelectorAll('.mobile-link');
        gsap.fromTo(links, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, delay: 0.2, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }
        );
    }
}
