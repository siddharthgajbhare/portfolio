// ===== EXTRA FEATURES =====
document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* 1. Scroll progress bar */
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.prepend(bar);

    window.addEventListener("scroll", () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    }, { passive: true });

    /* 2. Toast helper */
    const toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
    let toastTimer;

    window.showToast = (msg) => {
        toast.textContent = msg;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
    };

    const copyBtn = document.getElementById("copyEmail");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            const email = copyBtn.dataset.email;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email)
                    .then(() => showToast("Email copied to clipboard ✓"))
                    .catch(() => showToast("Could not copy email"));
            }
        });
    }

    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => showToast("Theme switched"));
    }

    /* 3. Animated stat counters (needs data-count on <h3>) */
    const counters = document.querySelectorAll("[data-count]");
    const runCounter = (el) => {
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        if (reduceMotion) { el.textContent = target + suffix; return; }
        const duration = 1500;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(p * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    counters.forEach(c => counterObserver.observe(c));

    /* 4. Project card 3D tilt */
    if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
        document.querySelectorAll(".project-card").forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform =
                    `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    /* 5. Cursor glow */
    if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
        const glow = document.createElement("div");
        glow.className = "cursor-glow";
        document.body.appendChild(glow);
        window.addEventListener("mousemove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
            glow.style.opacity = "1";
        });
    }

    /* 6. Keyboard shortcuts: press 1-5 to jump to a section */
    const sections = ["home", "about", "skills", "projects", "contact"];
    document.addEventListener("keydown", (e) => {
        const tag = document.activeElement.tagName;
        if (["INPUT", "TEXTAREA"].includes(tag) || e.ctrlKey || e.metaKey || e.altKey) return;
        const i = parseInt(e.key, 10);
        if (i >= 1 && i <= sections.length) {
            document.getElementById(sections[i - 1])
                ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        }
    });

    /* 7. Contact form: open the user's mail app with the message filled in */
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", () => {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();
            if (!name || !email || !subject || !message || !/^\S+@\S+\.\S+$/.test(email)) return;

            const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
            const to = copyBtn ? copyBtn.dataset.email : "siddharth@example.com";
            showToast("Opening your email app…");
            setTimeout(() => {
                window.location.href =
                    `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
            }, 800);
        });
    }
});
